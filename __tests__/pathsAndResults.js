import fs from 'fs';

const formFilePath = (folder, fileName) => `__tests__/__fixtures__/${folder}/${fileName}`;

const getFile = (folder, fileName) => {
  const resultFile = formFilePath(folder, fileName);
  return fs.readFileSync(resultFile, 'utf8');
};

export const filesPath = {
  flatJsonConfig1: formFilePath('flat', 'before.json'),
  flatJsonConfig2: formFilePath('flat', 'after.json'),
  flatYamlConfig1: formFilePath('flat', 'before.yml'),
  flatYamlConfig2: formFilePath('flat', 'after.yml'),
  flatIniConfig1: formFilePath('flat', 'before.ini'),
  flatIniConfig2: formFilePath('flat', 'after.ini'),
  recursiveJsonConfig1: formFilePath('recursive', 'before.json'),
  recursiveJsonConfig2: formFilePath('recursive', 'after.json'),
  recursiveYamlConfig1: formFilePath('recursive', 'before.yml'),
  recursiveYamlConfig2: formFilePath('recursive', 'after.yml'),
  recursiveIniConfig1: formFilePath('recursive', 'before.ini'),
  recursiveIniConfig2: formFilePath('recursive', 'after.ini'),
};

export const resultFiles = {
  standartFlat: getFile('flat', 'standartRenderTestResult'),
  standartRecursive: getFile('recursive', 'standartRenderTestResult'),
  plainFlat: getFile('flat', 'plainRenderTestResult'),
  plainRecursive: getFile('recursive', 'plainRenderTestResult'),
};
