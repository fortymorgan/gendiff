import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default pathToFile => parsers[path.extname(pathToFile)];
