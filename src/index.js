import fs from 'fs';
import _ from 'lodash';
import getParser from './parsers';
import renderers from './render';

const formDiff = (conf1, conf2) => {
  const formDiffObj = (key, diff) => ({
    key,
    diff,
    prevValue: conf1[key],
    actValue: conf2[key],
  });

  const bothKeys = _.union(Object.keys(conf1), Object.keys(conf2));
  return bothKeys.map((key) => {
    if ((conf1[key] instanceof Object) && (conf2[key] instanceof Object)) {
      return formDiffObj(key, formDiff(conf1[key], conf2[key]));
    }

    if (_.has(conf2, key)) {
      if (_.has(conf1, key)) {
        if (conf1[key] === conf2[key]) {
          return formDiffObj(key, 'not-changed');
        }
        return formDiffObj(key, 'changed');
      }
      return formDiffObj(key, 'added');
    }
    return formDiffObj(key, 'removed');
  });
};

export default (pathToFile1, pathToFile2, renderType = 'standart') => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');

  const config1 = getParser(pathToFile1)(file1);
  const config2 = getParser(pathToFile2)(file2);

  const diff = formDiff(config1, config2);
  const diffString = renderers[renderType](diff, 2);

  return diffString;
};
