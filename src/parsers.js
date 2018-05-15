import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (pathToFile) => {
  const format = path.extname(pathToFile);
  const parser = parsers[format];

  if (!parser) {
    throw new Error(`unkown format: ${format}`);
  }
  return parser;
};
