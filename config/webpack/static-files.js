
function transformManifestVersion(content) {
  const manifest = JSON.parse(content.toString());
  manifest.version = process.env.npm_package_version;
  return Buffer.from(JSON.stringify(manifest));
}

const copyPatterns = [
  {
    from: 'src/manifest.json',
    to: '.',
    transform: transformManifestVersion,
  },
  { from: 'src/img', to: 'img' },
  {
    from: 'src/lib',
    to: 'lib/',
  },
  {
    from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js',
    to: 'lib/js/',
  },
  // { from: 'node_modules/pdfjs-dist/build/pdf.worker.min.js', to: 'lib/' },
  {
    from: 'src/fonts/*/*',
    to: 'fonts/googlefonts/[name].[ext]',
  },
  /* {
    from:
      'node_modules/material-design-icons/iconfont/*.{eot,ttf,woff,woff2,css}',
    to: 'fonts/material-icons/[name].[ext]',
    toType: 'template',
  }, */
];

const htmlAssets = [
  'fonts/googlefonts/roboto-mono.css',
  'lib/browser-polyfill.js',
];

module.exports = {
  copyPatterns,
  htmlAssets
};