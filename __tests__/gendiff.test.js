import fs from 'fs';
import genDiff from '../src';

test('Correct config json diff', () => {
  expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json'))
    .toBe(fs.readFileSync('__tests__/__fixtures__/firstTestResult', 'utf8'));
});

test('Correct config yaml diff', () => {
  expect(genDiff('__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml'))
    .toBe(fs.readFileSync('__tests__/__fixtures__/firstTestResult', 'utf8'));
});
