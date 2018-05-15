import fs from 'fs';
import genDiff from '../src';

const flatResultFile = '__tests__/__fixtures__/flat/testResult';
const expectedFlatResult = fs.readFileSync(flatResultFile, 'utf8');

const recursiveResultFile = '__tests__/__fixtures__/recursive/testResult';
const expectedRecursiveResult = fs.readFileSync(recursiveResultFile, 'utf8');

const flatJsonConfig1 = '__tests__/__fixtures__/flat/before.json';
const flatJsonConfig2 = '__tests__/__fixtures__/flat/after.json';

const flatYamlConfig1 = '__tests__/__fixtures__/flat/before.yml';
const flatYamlConfig2 = '__tests__/__fixtures__/flat/after.yml';

const flatIniConfig1 = '__tests__/__fixtures__/flat/before.ini';
const flatIniConfig2 = '__tests__/__fixtures__/flat/after.ini';

const recursiveJsonConfig1 = '__tests__/__fixtures__/recursive/before.json';
const recursiveJsonConfig2 = '__tests__/__fixtures__/recursive/after.json';

const recursiveYamlConfig1 = '__tests__/__fixtures__/recursive/before.yml';
const recursiveYamlConfig2 = '__tests__/__fixtures__/recursive/after.yml';

test('Correct diff for flat config', () => {
  expect(genDiff(flatJsonConfig1, flatJsonConfig2))
    .toBe(expectedFlatResult);

  expect(genDiff(flatYamlConfig1, flatYamlConfig2))
    .toBe(expectedFlatResult);

  expect(genDiff(flatIniConfig1, flatIniConfig2))
    .toBe(expectedFlatResult);
});

test('Correct diff for recursive config', () => {
  expect(genDiff(recursiveJsonConfig1, recursiveJsonConfig2))
    .toBe(expectedRecursiveResult);

  expect(genDiff(recursiveYamlConfig1, recursiveYamlConfig2))
    .toBe(expectedRecursiveResult);
});
