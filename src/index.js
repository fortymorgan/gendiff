import fs from 'fs';
import _ from 'lodash';

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

const genDiff = (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');

  const config1 = JSON.parse(file1);
  const config2 = JSON.parse(file2);

  const diff = `{\n${showDiff(config1, config2)}\n}`;

  return diff;
};

export default genDiff;
