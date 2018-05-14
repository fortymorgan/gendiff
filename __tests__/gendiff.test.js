import fs from 'fs';
import genDiff from '../src';

test('Correct config diff', () => {
  expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json'))
    .toBe(fs.readFileSync('__tests__/__fixtures__/firstTestResult', 'utf8'));
});
