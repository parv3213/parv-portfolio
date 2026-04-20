#!/usr/bin/env node
/**
 * Populate Sanity `project` docs from /Users/parv3213/Documents/parv_complete_profile/profile/projects/<slug>.md.
 *
 * Usage:
 *   yarn sanity:populate -- \
 *     --slug bikers-pride --screenshot bikers-pride=/abs/path/to.png --rank bikers-pride=50 \
 *     --slug tinywins-habit-tracker --screenshot tinywins-habit-tracker=/abs/path/to.png --rank tinywins-habit-tracker=60
 *
 * Env (sourced from .env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION,
 *   SANITY_API_WRITE_TOKEN
 *
 * Idempotent: uses `_id = "project-<slug>"` with createOrReplace.
 */
import { createClient } from '@sanity/client'
import { readFile } from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import yamlPkg from 'yaml'
const parseYaml = yamlPkg.parse
import path from 'node:path'
import crypto from 'node:crypto'

const PROFILE_REPO = '/Users/parv3213/Documents/parv_complete_profile'
const PROJECTS_DIR = path.join(PROFILE_REPO, 'profile/projects')

const LINK_LIVE = new Set(['app', 'live', 'demo', 'website', 'site'])
const LINK_REPO = new Set(['repo', 'github', 'source', 'code'])

function parseArgs(argv) {
  const out = { slugs: [], screenshot: {}, rank: {} }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--slug') out.slugs.push(argv[++i])
    else if (a === '--screenshot') {
      const [k, v] = argv[++i].split('=')
      out.screenshot[k] = v
    } else if (a === '--rank') {
      const [k, v] = argv[++i].split('=')
      out.rank[k] = Number(v)
    }
  }
  return out
}

function splitFrontmatter(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
  if (!m) throw new Error('missing YAML frontmatter')
  return { fm: parseYaml(m[1]) || {}, body: m[2] }
}

function bodySections(body) {
  const sections = {}
  let current = null
  let buf = []
  for (const line of body.split('\n')) {
    const m = line.match(/^##\s+(.+)$/)
    if (m) {
      if (current !== null) sections[current] = buf.join('\n').trim()
      current = m[1].trim()
      buf = []
    } else if (current !== null) buf.push(line)
  }
  if (current !== null) sections[current] = buf.join('\n').trim()
  return sections
}

const key = (i) => crypto.createHash('md5').update(String(i)).digest('hex').slice(0, 12)

function mdToPortableText(md) {
  const blocks = []
  let n = 0
  const chunks = md.trim().split(/\n\s*\n/)
  for (const chunk of chunks) {
    const trimmed = chunk.trimEnd()
    if (!trimmed) continue
    const lines = trimmed.split('\n')
    const isList = lines.every((ln) => /^\s*[-*]\s+/.test(ln))
    if (isList) {
      for (const ln of lines) {
        const text = ln.replace(/^\s*[-*]\s+/, '')
        const bk = key(++n)
        blocks.push({
          _type: 'block',
          _key: bk,
          style: 'normal',
          listItem: 'bullet',
          level: 1,
          children: [{ _type: 'span', _key: bk + 's', text, marks: [] }],
          markDefs: [],
        })
      }
    } else {
      const bk = key(++n)
      blocks.push({
        _type: 'block',
        _key: bk,
        style: 'normal',
        children: [{ _type: 'span', _key: bk + 's', text: lines.join(' '), marks: [] }],
        markDefs: [],
      })
    }
  }
  return blocks
}

function pickLink(links, labels) {
  for (const l of links || []) {
    if (labels.has(String(l.label || '').toLowerCase())) return l.url
  }
  return null
}

async function parseProfile(slug) {
  const p = path.join(PROJECTS_DIR, `${slug}.md`)
  const text = await readFile(p, 'utf8')
  const { fm, body } = splitFrontmatter(text)
  const sections = bodySections(body)
  const ctx = sections.Context || ''
  const summary = ctx.split('\n\n')[0].trim().slice(0, 500)
  const arch = [sections.Context, sections.Responsibilities].filter(Boolean).join('\n\n')
  return {
    slug,
    title: fm.title,
    summary,
    architecture: mdToPortableText(arch),
    challenges: mdToPortableText(sections.Challenges || ''),
    linkBuild: pickLink(fm.links, LINK_LIVE),
    linkGithub: pickLink(fm.links, LINK_REPO),
    tags: (fm.tags || []).map((t) => String(t).toLowerCase()),
  }
}

async function loadSkillsMap(client) {
  const docs = await client.fetch('*[_type == "skill"]{_id, title}')
  const map = new Map()
  for (const d of docs) if (d.title) map.set(d.title.trim().toLowerCase(), d._id)
  return map
}

function technologiesFromTags(tags, skillsMap) {
  const refs = []
  const missing = []
  const seen = new Set()
  for (const t of tags) {
    const id = skillsMap.get(t)
    if (id && !seen.has(id)) {
      seen.add(id)
      refs.push({ _type: 'reference', _ref: id, _key: key(`ref-${id}`) })
    } else if (!id) missing.push(t)
  }
  return { refs, missing }
}

async function uploadScreenshot(client, filePath) {
  const stream = createReadStream(filePath)
  const asset = await client.assets.upload('image', stream, {
    filename: path.basename(filePath),
  })
  return asset._id
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!args.slugs.length) {
    console.error('error: pass --slug at least once')
    process.exit(1)
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!projectId || !dataset || !token) {
    console.error('error: missing env (NEXT_PUBLIC_SANITY_PROJECT_ID / DATASET / SANITY_API_WRITE_TOKEN)')
    process.exit(1)
  }

  const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })
  const skillsMap = await loadSkillsMap(client)
  console.log(`[skills] cached ${skillsMap.size} skill docs`)

  for (const slug of args.slugs) {
    const p = await parseProfile(slug)
    const { refs, missing } = technologiesFromTags(p.tags, skillsMap)
    if (missing.length) console.log(`[warn] ${slug}: dropped unknown tags: ${missing.join(', ')}`)

    let imageField = undefined
    const shotPath = args.screenshot[slug]
    if (shotPath) {
      const assetId = await uploadScreenshot(client, shotPath)
      imageField = { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
      console.log(`[upload] ${slug}: asset ${assetId}`)
    }

    const doc = {
      _id: `project-${slug}`,
      _type: 'project',
      title: p.title,
      summary: p.summary,
      technologies: refs,
      architectureDetails: p.architecture,
      challengesAndTradeoffs: p.challenges,
      ...(p.linkBuild ? { linkToBuild: p.linkBuild } : {}),
      ...(p.linkGithub ? { linkToGithub: p.linkGithub } : {}),
      ...(imageField ? { image: imageField } : {}),
      ...(args.rank[slug] != null ? { impactRank: args.rank[slug] } : {}),
    }

    const res = await client.createOrReplace(doc)
    console.log(`[sync] ${slug}: _id=${res._id} rev=${res._rev}`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
