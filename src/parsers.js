import yaml from 'js-yaml';
import path from 'path';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
};

export default pathToFile => parsers[path.extname(pathToFile)];
