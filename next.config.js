const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: isProd ? '/nextjs-threejs-portfolio' : '',
  assetPrefix: isProd ? '/nextjs-threejs-portfolio/' : '',
  trailingSlash: true,
};
