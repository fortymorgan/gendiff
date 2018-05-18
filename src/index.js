import fs from 'fs';
import _ from 'lodash';
import getParser from './parsers';
import renderers from './renderers';

const diffTypes = [
  {
    type: 'nested',
    check: (firstConfig, secondConfig, key) =>
      _.isObject(firstConfig[key]) && _.isObject(secondConfig[key]),
    process: (firstConfig, secondConfig, func) => ({ children: func(firstConfig, secondConfig) }),
  },
  {
    type: 'not changed',
    check: (firstConfig, secondConfig, key) => (_.has(firstConfig, key) && _.has(secondConfig, key)
      && (firstConfig[key] === secondConfig[key])),
    process: firstConfig => ({ value: firstConfig }),
  },
  {
    type: 'changed',
    check: (firstConfig, secondConfig, key) => (_.has(firstConfig, key) && _.has(secondConfig, key)
      && (firstConfig[key] !== secondConfig[key])),
    process: (firstConfig, secondConfig) =>
      ({ oldValue: firstConfig, newValue: secondConfig }),
  },
  {
    type: 'deleted',
    check: (firstConfig, secondConfig, key) =>
      (_.has(firstConfig, key) && !_.has(secondConfig, key)),
    process: firstConfig => ({ value: firstConfig }),
  },
  {
    type: 'inserted',
    check: (firstConfig, secondConfig, key) =>
      (!_.has(firstConfig, key) && _.has(secondConfig, key)),
    process: (firstConfig, secondConfig) => ({ value: secondConfig }),
  },
];

const getDiff = (firstConfig = {}, secondConfig = {}) => {
  const bothKeys = _.union(_.keys(firstConfig), _.keys(secondConfig));
  return bothKeys.map((key) => {
    const { type, process } = _.find(diffTypes, item => item.check(firstConfig, secondConfig, key));
    return { key, type, ...process(firstConfig[key], secondConfig[key], getDiff) };
  });
};

export default (pathToFile1, pathToFile2, renderType = 'standart') => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');

  const config1 = getParser(pathToFile1)(file1);
  const config2 = getParser(pathToFile2)(file2);

  const diff = getDiff(config1, config2);
  const diffString = renderers[renderType](diff);

  return diffString;
};
