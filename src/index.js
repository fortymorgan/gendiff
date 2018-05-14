import fs from 'fs';
import _ from 'lodash';
import yaml from 'js-yaml';
import path from 'path';

const showDiff = (conf1, conf2) => {
  const diffArray = [];
  Object.keys(conf1).forEach((key) => {
    if (_.has(conf2, key)) {
      if (conf1[key] === conf2[key]) {
        diffArray.push(`    ${key}: ${conf2[key]}`);
      } else {
        diffArray.push(`  + ${key}: ${conf2[key]}`);
        diffArray.push(`  - ${key}: ${conf1[key]}`);
      }
    } else {
      diffArray.push(`  - ${key}: ${conf1[key]}`);
    }
  });

  Object.keys(conf2).forEach((key) => {
    if (!_.has(conf1, key)) {
      diffArray.push(`  + ${key}: ${conf2[key]}`);
    }
  });

  return diffArray.join('\n');
};

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
};

const genDiff = (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');

  const config1 = parsers[path.extname(pathToFile1)](file1);
  const config2 = parsers[path.extname(pathToFile2)](file2);

  const diff = `{\n${showDiff(config1, config2)}\n}`;

  return diff;
};

export default genDiff;
