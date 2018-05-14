import fs from 'fs';
import genDiff from '../src';

const expectedResult = '__tests__/__fixtures__/firstTestResult';

const jsonConfig1 = '__tests__/__fixtures__/before.json';
const jsonConfig2 = '__tests__/__fixtures__/after.json';

const yamlConfig1 = '__tests__/__fixtures__/before.yml';
const yamlConfig2 = '__tests__/__fixtures__/after.yml';

test('Correct config json diff', () => {
  expect(genDiff(jsonConfig1, jsonConfig2))
    .toBe(fs.readFileSync(expectedResult, 'utf8'));
});

test('Correct config yaml diff', () => {
  expect(genDiff(yamlConfig1, yamlConfig2))
    .toBe(fs.readFileSync(expectedResult, 'utf8'));
});
