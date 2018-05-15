import fs from 'fs';
import genDiff from '../src';

test('Correct diff for flat config', () => {
  const flatResultFile = '__tests__/__fixtures__/flat/testResult';
  const expectedFlatResult = fs.readFileSync(flatResultFile, 'utf8');

  const flatJsonConfig1 = '__tests__/__fixtures__/flat/before.json';
  const flatJsonConfig2 = '__tests__/__fixtures__/flat/after.json';

  const flatYamlConfig1 = '__tests__/__fixtures__/flat/before.yml';
  const flatYamlConfig2 = '__tests__/__fixtures__/flat/after.yml';

  const flatIniConfig1 = '__tests__/__fixtures__/flat/before.ini';
  const flatIniConfig2 = '__tests__/__fixtures__/flat/after.ini';

  expect(genDiff(flatJsonConfig1, flatJsonConfig2))
    .toBe(expectedFlatResult);

  expect(genDiff(flatYamlConfig1, flatYamlConfig2))
    .toBe(expectedFlatResult);

  expect(genDiff(flatIniConfig1, flatIniConfig2))
    .toBe(expectedFlatResult);
});

test('Correct diff for recursive config', () => {
  const recursiveResultFile = '__tests__/__fixtures__/recursive/testResult';
  const expectedRecursiveResult = fs.readFileSync(recursiveResultFile, 'utf8');

  const recursiveJsonConfig1 = '__tests__/__fixtures__/recursive/before.json';
  const recursiveJsonConfig2 = '__tests__/__fixtures__/recursive/after.json';

  const recursiveYamlConfig1 = '__tests__/__fixtures__/recursive/before.yml';
  const recursiveYamlConfig2 = '__tests__/__fixtures__/recursive/after.yml';

  const recursiveIniConfig1 = '__tests__/__fixtures__/recursive/before.ini';
  const recursiveIniConfig2 = '__tests__/__fixtures__/recursive/after.ini';

  expect(genDiff(recursiveJsonConfig1, recursiveJsonConfig2))
    .toBe(expectedRecursiveResult);

  expect(genDiff(recursiveYamlConfig1, recursiveYamlConfig2))
    .toBe(expectedRecursiveResult);

  expect(genDiff(recursiveIniConfig1, recursiveIniConfig2))
    .toBe(expectedRecursiveResult);
});

test('Correct diff for different types of flat config', () => {
  const flatResultFile = '__tests__/__fixtures__/flat/testResult';
  const expectedFlatResult = fs.readFileSync(flatResultFile, 'utf8');

  const flatJsonConfig1 = '__tests__/__fixtures__/flat/before.json';
  const flatJsonConfig2 = '__tests__/__fixtures__/flat/after.json';

  const flatYamlConfig1 = '__tests__/__fixtures__/flat/before.yml';
  const flatYamlConfig2 = '__tests__/__fixtures__/flat/after.yml';

  const flatIniConfig1 = '__tests__/__fixtures__/flat/before.ini';
  const flatIniConfig2 = '__tests__/__fixtures__/flat/after.ini';

  expect(genDiff(flatJsonConfig1, flatYamlConfig2))
    .toBe(expectedFlatResult);

  expect(genDiff(flatYamlConfig1, flatIniConfig2))
    .toBe(expectedFlatResult);

  expect(genDiff(flatIniConfig1, flatJsonConfig2))
    .toBe(expectedFlatResult);
});

test('Correct diff for different types of recursive config', () => {
  const recursiveResultFile = '__tests__/__fixtures__/recursive/testResult';
  const expectedRecursiveResult = fs.readFileSync(recursiveResultFile, 'utf8');

  const recursiveJsonConfig1 = '__tests__/__fixtures__/recursive/before.json';
  const recursiveJsonConfig2 = '__tests__/__fixtures__/recursive/after.json';

  const recursiveYamlConfig1 = '__tests__/__fixtures__/recursive/before.yml';
  const recursiveYamlConfig2 = '__tests__/__fixtures__/recursive/after.yml';

  const recursiveIniConfig1 = '__tests__/__fixtures__/recursive/before.ini';
  const recursiveIniConfig2 = '__tests__/__fixtures__/recursive/after.ini';

  expect(genDiff(recursiveJsonConfig1, recursiveYamlConfig2))
    .toBe(expectedRecursiveResult);

  expect(genDiff(recursiveYamlConfig1, recursiveIniConfig2))
    .toBe(expectedRecursiveResult);

  expect(genDiff(recursiveIniConfig1, recursiveJsonConfig2))
    .toBe(expectedRecursiveResult);
});
