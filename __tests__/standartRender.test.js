import genDiff from '../src';
import { filesPath, resultFiles } from './pathsAndResults';

test('Correct diff for flat config', () => {
  expect(genDiff(filesPath.flatJsonConfig1, filesPath.flatJsonConfig2))
    .toBe(resultFiles.standartFlat);

  expect(genDiff(filesPath.flatYamlConfig1, filesPath.flatYamlConfig2))
    .toBe(resultFiles.standartFlat);

  expect(genDiff(filesPath.flatIniConfig1, filesPath.flatIniConfig2))
    .toBe(resultFiles.standartFlat);
});

test('Correct diff for recursive config', () => {
  expect(genDiff(filesPath.recursiveJsonConfig1, filesPath.recursiveJsonConfig2))
    .toBe(resultFiles.standartRecursive);

  expect(genDiff(filesPath.recursiveYamlConfig1, filesPath.recursiveYamlConfig2))
    .toBe(resultFiles.standartRecursive);

  expect(genDiff(filesPath.recursiveIniConfig1, filesPath.recursiveIniConfig2))
    .toBe(resultFiles.standartRecursive);
});

test('Correct diff for different types of flat config', () => {
  expect(genDiff(filesPath.flatJsonConfig1, filesPath.flatYamlConfig2))
    .toBe(resultFiles.standartFlat);

  expect(genDiff(filesPath.flatYamlConfig1, filesPath.flatIniConfig2))
    .toBe(resultFiles.standartFlat);

  expect(genDiff(filesPath.flatIniConfig1, filesPath.flatJsonConfig2))
    .toBe(resultFiles.standartFlat);
});

test('Correct diff for different types of recursive config', () => {
  expect(genDiff(filesPath.recursiveJsonConfig1, filesPath.recursiveYamlConfig2))
    .toBe(resultFiles.standartRecursive);

  expect(genDiff(filesPath.recursiveYamlConfig1, filesPath.recursiveIniConfig2))
    .toBe(resultFiles.standartRecursive);

  expect(genDiff(filesPath.recursiveIniConfig1, filesPath.recursiveJsonConfig2))
    .toBe(resultFiles.standartRecursive);
});
