
const basePath = 'example/icons'; // Путь откуда брать исходники иконок

const { readFilesInFolder, searchReplaceFile } = require('./icon-font-generator/replaceFile');
const { generateIcons } = require('./icon-font-generator/webfonts-generator');

async function main() {
  const files = await readFilesInFolder(basePath);
  const relatedPaths = files.filter(filename => filename.indexOf('.svg') >= 0).map(filename => `${basePath}/${filename}`);
  const fileChangedResults = await Promise.all(relatedPaths.map(path => searchReplaceFile(path)));
  await generateIcons({
    files: relatedPaths,
  });
  const countChangedFiles = fileChangedResults.reduce((count, isFileChanged) => isFileChanged ? count + 1 : count, 0)
  console.info(`Done! Incon font is generated, svg optimized count: ${countChangedFiles}`)
}

main();
