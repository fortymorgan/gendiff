import fs from 'fs';
import _ from 'lodash';
import getParser from './parsers';
import renderers from './renderers';

const diffTypes = [
  {
    type: 'nested',
    check: (first, second, key) => _.isObject(first[key]) && _.isObject(second[key]),
    process: (first, second, func) => func(first, second),
  },
  {
    type: 'not changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    process: _.identity,
  },
  {
    type: 'changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    process: (first, second) => ({ oldValue: first, newValue: second }),
  },
  {
    type: 'deleted',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    process: _.identity,
  },
  {
    type: 'inserted',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    process: (first, second) => second,
  },
];

const getDiff = (firstConfig = {}, secondConfig = {}) => {
  const bothKeys = _.union(_.keys(firstConfig), _.keys(secondConfig));
  return bothKeys.map((key) => {
    const { type, process } = _.find(diffTypes, item => item.check(firstConfig, secondConfig, key));
    const value = process(firstConfig[key], secondConfig[key], getDiff);
    return { key, type, value };
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
