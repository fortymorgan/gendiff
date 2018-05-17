import _ from 'lodash';

const visualParams = {
  innerObjSpace: 4,
  outerObjSpace: 2,
  spaceCount: 2,
};

const stringify = (value, spaceCount) => {
  if (_.isObject(value)) {
    const keys = _.keys(value);
    const stringArray = keys.map(key => `${' '.repeat(spaceCount + visualParams.innerObjSpace)}  ${key}: ${value[key]}`);
    return `{\n${stringArray.join('\n')}\n${' '.repeat(spaceCount + visualParams.outerObjSpace)}}`;
  }
  return value;
};

const standartRender = (diff, spaceCount = visualParams.spaceCount) => {
  const diffToString = (diffElem) => {
    const formDiffString = (value, diffSign) => `${' '.repeat(spaceCount)}${diffSign} ${diffElem.key}: ${stringify(value, spaceCount)}`;

    const diffString = {
      nested: children => formDiffString(standartRender(children, spaceCount + visualParams.innerObjSpace), ' '),
      'not changed': value => formDiffString(value, ' '),
      changed: value => [formDiffString(value.oldValue, '-'), formDiffString(value.newValue, '+')],
      deleted: value => formDiffString(value, '-'),
      inserted: value => formDiffString(value, '+'),
    };

    return diffElem.type === 'nested' ? diffString.nested(diffElem.children) : diffString[diffElem.type](diffElem.value);
  };

  const diffStringArray = diff.map(diffElem => diffToString(diffElem));
  const diffFlatArr = _.flatten(diffStringArray);
  return `{\n${diffFlatArr.join('\n')}\n${' '.repeat(spaceCount - visualParams.outerObjSpace)}}`;
};

export default standartRender;
