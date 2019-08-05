const webfontsGenerator = require('simple-webfonts-generator');
const path = require('path');

/**
 * @link https://www.npmjs.com/package/webfonts-generator
 */
const defaultConfig = {
  dest: 'dist/fonts',
  html: true,
  order: ['svg', 'eot', 'woff2', 'woff', 'ttf'],
  templateOptions: {
    classPrefix: 'custom-',
    baseSelector: 'custom-icons'
  },
  cssDest: 'dist/icons.css',
  htmlDest: 'dist/index.html',
  normalize: true,
  fontHeight: 1000,
  htmlTemplate: 'example/templates/index.html.hbs',
  cssTemplate: 'example/icons.css.hbs',
};

async function generateIcons(config) {
  return new Promise( (res, rej) => webfontsGenerator({...defaultConfig, ...config}, err => !err ? res() : rej(err) ));
}

module.exports = {
  generateIcons,
};
