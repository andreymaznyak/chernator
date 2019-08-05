const { optimize } = require('./optimizeSvg');
const fs = require('fs');
const util = require('util');
const readfile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
const writefile = util.promisify(fs.writeFile);

const replaceConfigs = [
  { reg: / fill="(.*?)"/m, post: '' },
  { reg: /(\s*)<\/defs[\s\S]*<\/g>/m, post: '' },
  { reg: /(\s*)<defs>/m, post: '' },
  { reg: / id="(.*?)"/m, post: '' },
  { reg: /xmlns:xlink="(.*?)"/m, post: '' },
  { reg: /(\s*)<g[\s\S]*?>/m, post: '' },
  { reg: /(\s*)<\/g>/m, post: '' },
  { reg: /<svg/m, post: '<svg fill="#000"' },
  { reg: / transform="(.*?)"/m, post: '' },
  { reg: / fill-rule="(.*?)"/m, post: '' }
];

async function searchReplaceFile(fileName, configs = replaceConfigs) {
  let fileChanged = false;
  const originalString = await readfile(fileName, { encoding: 'utf8' });
  const optimizedString = await optimize(originalString);

  const replacedString = await optimize(configs.reduce(
    (prev, config) => prev.replace(config.reg, config.post),
    optimizedString,
  ));

  if (originalString !== replacedString) {
    await writefile(fileName, replacedString);
    fileChanged = true;
  }
  return fileChanged;
};

async function readFilesInFolder(path) {
  return await readdir(path);
}

module.exports = {
  searchReplaceFile,
  readFilesInFolder,
  replaceConfigs,
};
