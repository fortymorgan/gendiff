import genDiff from '../src';
import { filesPath, resultFiles } from './pathsAndResults';

test('Correct diff for flat config', () => {
  expect(genDiff(filesPath.flatJsonConfig1, filesPath.flatJsonConfig2, 'plain'))
    .toBe(resultFiles.plainFlat);

  expect(genDiff(filesPath.flatYamlConfig1, filesPath.flatYamlConfig2, 'plain'))
    .toBe(resultFiles.plainFlat);

  expect(genDiff(filesPath.flatIniConfig1, filesPath.flatIniConfig2, 'plain'))
    .toBe(resultFiles.plainFlat);
});

test('Correct diff for recursive config', () => {
  expect(genDiff(filesPath.recursiveJsonConfig1, filesPath.recursiveJsonConfig2, 'plain'))
    .toBe(resultFiles.plainRecursive);

  expect(genDiff(filesPath.recursiveYamlConfig1, filesPath.recursiveYamlConfig2, 'plain'))
    .toBe(resultFiles.plainRecursive);

  expect(genDiff(filesPath.recursiveIniConfig1, filesPath.recursiveIniConfig2, 'plain'))
    .toBe(resultFiles.plainRecursive);
});

test('Correct diff for different types of flat config', () => {
  expect(genDiff(filesPath.flatJsonConfig1, filesPath.flatYamlConfig2, 'plain'))
    .toBe(resultFiles.plainFlat);

  expect(genDiff(filesPath.flatYamlConfig1, filesPath.flatIniConfig2, 'plain'))
    .toBe(resultFiles.plainFlat);

  expect(genDiff(filesPath.flatIniConfig1, filesPath.flatJsonConfig2, 'plain'))
    .toBe(resultFiles.plainFlat);
});

test('Correct diff for different types of recursive config', () => {
  expect(genDiff(filesPath.recursiveJsonConfig1, filesPath.recursiveYamlConfig2, 'plain'))
    .toBe(resultFiles.plainRecursive);

  expect(genDiff(filesPath.recursiveYamlConfig1, filesPath.recursiveIniConfig2, 'plain'))
    .toBe(resultFiles.plainRecursive);

  expect(genDiff(filesPath.recursiveIniConfig1, filesPath.recursiveJsonConfig2, 'plain'))
    .toBe(resultFiles.plainRecursive);
});
