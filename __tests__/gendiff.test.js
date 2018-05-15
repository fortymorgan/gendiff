import fs from 'fs';
import genDiff from '../src';

const resultFile = '__tests__/__fixtures__/firstTestResult';
const expectedResult = fs.readFileSync(resultFile, 'utf8');

const jsonConfig1 = '__tests__/__fixtures__/before.json';
const jsonConfig2 = '__tests__/__fixtures__/after.json';

const yamlConfig1 = '__tests__/__fixtures__/before.yml';
const yamlConfig2 = '__tests__/__fixtures__/after.yml';

const iniConfig1 = '__tests__/__fixtures__/before.ini';
const iniConfig2 = '__tests__/__fixtures__/after.ini';

test('Correct config json diff', () => {
  expect(genDiff(jsonConfig1, jsonConfig2))
    .toBe(expectedResult);
});

test('Correct config yaml diff', () => {
  expect(genDiff(yamlConfig1, yamlConfig2))
    .toBe(expectedResult);
});

test('Correct config ini diff', () => {
  expect(genDiff(iniConfig1, iniConfig2))
    .toBe(expectedResult);
});
