const fs = require('fs');
const { createClient } = require('@sanity/client');

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
  const [key, ...values] = line.split('=');
  if (key) acc[key.trim()] = values.join('=').trim();
  return acc;
}, {});

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: env.SANITY_API_WRITE_TOKEN
});

async function fetchDocs() {
  const pageInfo = await client.fetch('*[_type == "pageInfo"][0]');
  const projects = await client.fetch('*[_type == "project"]{_id, title, summary, linkToBuild, linkToGithub, "hasImage": defined(image.asset)}');
  console.log(JSON.stringify({pageInfo, projects}, null, 2));
}

fetchDocs().catch(console.error);
