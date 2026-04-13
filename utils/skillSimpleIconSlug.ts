/**
 * Maps skill titles (and common variants) to Simple Icons slugs for
 * `https://cdn.simpleicons.org/{slug}` (SVG, brand-colored).
 *
 * Only includes slugs verified against the CDN; unknown tools fall back to
 * Sanity-hosted images or generated initials in `Skill.tsx`.
 *
 * @see https://simpleicons.org/
 */

function normalizeTitleKey(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s*\([^)]*\)/g, " ")
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Collapsed key for fuzzy matching (no spaces). */
function collapsedKey(title: string): string {
  return normalizeTitleKey(title).replace(/\s+/g, "");
}

/**
 * Title variants → Simple Icons slug. Keys are collapsed (no spaces, no dots).
 * Keep in sync with skills you use in Sanity.
 */
const COLLAPSED_TO_SLUG: Record<string, string> = {
  // Languages & runtimes
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  go: "go",
  golang: "go",
  sql: "mysql",
  solidity: "solidity",

  // Frontend
  react: "react",
  reactjs: "react",
  reactquery: "reactquery",
  nextjs: "nextdotjs",
  nextdotjs: "nextdotjs",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",

  // Backend & APIs
  node: "nodedotjs",
  nodejs: "nodedotjs",
  nodedotjs: "nodedotjs",
  graphql: "graphql",
  rest: "openapiinitiative",

  // Data
  postgresql: "postgresql",
  postgres: "postgresql",
  postgress: "postgresql",
  mongodb: "mongodb",
  mongo: "mongodb",
  redis: "redis",

  // Web3
  ethereum: "ethereum",
  openzeppelin: "openzeppelin",
  chainlink: "chainlink",
  thegraph: "thegraph",
  arbitrum: "arbitrum",
  optimism: "optimism",
  ethersjs: "ethers",
  etherjs: "ethers",
  ethersdotjs: "ethers",

  // CMS
  sanity: "sanity",

  // Tooling & cloud
  docker: "docker",
  cicd: "githubactions",
  githubactions: "githubactions",
  gitlab: "gitlab",
  circleci: "circleci",
  amazonaws: "amazonaws",
  aws: "amazonaws",
  azureblob: "microsoftazure",
  microsoftazure: "microsoftazure",
  sentry: "sentry",
  git: "git",
  mocha: "mocha",
  jwt: "jsonwebtokens",
  jsonwebtokens: "jsonwebtokens",
};

export function getSimpleIconSlug(title: string): string | null {
  if (!title?.trim()) return null;
  const c = collapsedKey(title);
  if (!c) return null;

  if (COLLAPSED_TO_SLUG[c]) return COLLAPSED_TO_SLUG[c];

  const spaced = normalizeTitleKey(title).replace(/\s+/g, "");
  if (COLLAPSED_TO_SLUG[spaced]) return COLLAPSED_TO_SLUG[spaced];

  return null;
}

export function simpleIconCdnUrl(slug: string): string {
  return `https://cdn.simpleicons.org/${slug}`;
}
