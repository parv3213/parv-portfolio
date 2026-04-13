/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['cdn.sanity.io', 'cdn.simpleicons.org'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'components'],
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
}
