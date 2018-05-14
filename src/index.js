import fs from 'fs';
import _ from 'lodash';
import getParser from './parsers';

const formDiff = (conf1, conf2) => {
  const bothKeys = _.union(Object.keys(conf1), Object.keys(conf2));
  const diffArray = bothKeys.map((key) => {
    if (_.has(conf2, key)) {
      if (_.has(conf1, key)) {
        if (conf1[key] === conf2[key]) {
          return `    ${key}: ${conf2[key]}`;
        }
        return [`  + ${key}: ${conf2[key]}`, `  - ${key}: ${conf1[key]}`];
      }
      return `  + ${key}: ${conf2[key]}`;
    }
    return `  - ${key}: ${conf1[key]}`;
  });

  return _.flatten(diffArray).join('\n');
};


export default (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');

  const config1 = getParser(pathToFile1)(file1);
  const config2 = getParser(pathToFile2)(file2);

  const diff = `{\n${formDiff(config1, config2)}\n}`;

  return diff;
};
