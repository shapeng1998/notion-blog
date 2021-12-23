/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['gravatar.com'],
  },
  eslint: {
    dirs: ['components', 'lib', 'pages'],
  },
};
