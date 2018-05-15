import fs from 'fs';
import genDiff from '../src';
import formFilePath from '../src/formFilePath';

test('Correct diff for flat config', () => {
  const flatResultFile = formFilePath('flat', 'plainRenderTestResult');
  const expectedFlatResult = fs.readFileSync(flatResultFile, 'utf8');

  const flatJsonConfig1 = formFilePath('flat', 'before.json');
  const flatJsonConfig2 = formFilePath('flat', 'after.json');

  const flatYamlConfig1 = formFilePath('flat', 'before.yml');
  const flatYamlConfig2 = formFilePath('flat', 'after.yml');

  const flatIniConfig1 = formFilePath('flat', 'before.ini');
  const flatIniConfig2 = formFilePath('flat', 'after.ini');

  expect(genDiff(flatJsonConfig1, flatJsonConfig2, 'plain'))
    .toBe(expectedFlatResult);

  expect(genDiff(flatYamlConfig1, flatYamlConfig2, 'plain'))
    .toBe(expectedFlatResult);

  expect(genDiff(flatIniConfig1, flatIniConfig2, 'plain'))
    .toBe(expectedFlatResult);
});

test('Correct diff for recursive config', () => {
  const recursiveResultFile = formFilePath('recursive', 'plainRenderTestResult');
  const expectedRecursiveResult = fs.readFileSync(recursiveResultFile, 'utf8');

  const recursiveJsonConfig1 = formFilePath('recursive', 'before.json');
  const recursiveJsonConfig2 = formFilePath('recursive', 'after.json');

  const recursiveYamlConfig1 = formFilePath('recursive', 'before.yml');
  const recursiveYamlConfig2 = formFilePath('recursive', 'after.yml');

  const recursiveIniConfig1 = formFilePath('recursive', 'before.ini');
  const recursiveIniConfig2 = formFilePath('recursive', 'after.ini');

  expect(genDiff(recursiveJsonConfig1, recursiveJsonConfig2, 'plain'))
    .toBe(expectedRecursiveResult);

  expect(genDiff(recursiveYamlConfig1, recursiveYamlConfig2, 'plain'))
    .toBe(expectedRecursiveResult);

  expect(genDiff(recursiveIniConfig1, recursiveIniConfig2, 'plain'))
    .toBe(expectedRecursiveResult);
});

test('Correct diff for different types of flat config', () => {
  const flatResultFile = formFilePath('flat', 'plainRenderTestResult');
  const expectedFlatResult = fs.readFileSync(flatResultFile, 'utf8');

  const flatJsonConfig1 = formFilePath('flat', 'before.json');
  const flatJsonConfig2 = formFilePath('flat', 'after.json');

  const flatYamlConfig1 = formFilePath('flat', 'before.yml');
  const flatYamlConfig2 = formFilePath('flat', 'after.yml');

  const flatIniConfig1 = formFilePath('flat', 'before.ini');
  const flatIniConfig2 = formFilePath('flat', 'after.ini');

  expect(genDiff(flatJsonConfig1, flatYamlConfig2, 'plain'))
    .toBe(expectedFlatResult);

  expect(genDiff(flatYamlConfig1, flatIniConfig2, 'plain'))
    .toBe(expectedFlatResult);

  expect(genDiff(flatIniConfig1, flatJsonConfig2, 'plain'))
    .toBe(expectedFlatResult);
});

test('Correct diff for different types of recursive config', () => {
  const recursiveResultFile = formFilePath('recursive', 'plainRenderTestResult');
  const expectedRecursiveResult = fs.readFileSync(recursiveResultFile, 'utf8');

  const recursiveJsonConfig1 = formFilePath('recursive', 'before.json');
  const recursiveJsonConfig2 = formFilePath('recursive', 'after.json');

  const recursiveYamlConfig1 = formFilePath('recursive', 'before.yml');
  const recursiveYamlConfig2 = formFilePath('recursive', 'after.yml');

  const recursiveIniConfig1 = formFilePath('recursive', 'before.ini');
  const recursiveIniConfig2 = formFilePath('recursive', 'after.ini');

  expect(genDiff(recursiveJsonConfig1, recursiveYamlConfig2, 'plain'))
    .toBe(expectedRecursiveResult);

  expect(genDiff(recursiveYamlConfig1, recursiveIniConfig2, 'plain'))
    .toBe(expectedRecursiveResult);

  expect(genDiff(recursiveIniConfig1, recursiveJsonConfig2, 'plain'))
    .toBe(expectedRecursiveResult);
});
