/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['cdn.sanity.io'],
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
