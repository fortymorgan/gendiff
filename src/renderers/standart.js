import _ from 'lodash';

const visualParams = {
  innerObjSpace: 4,
  outerObjSpace: 2,
  spaceCount: 2,
};

const objToString = (object, spaceCount) => {
  const keys = Object.keys(object);
  const stringArray = keys.map(key => `${' '.repeat(spaceCount + visualParams.innerObjSpace)}  ${key}: ${object[key]}`);
  return `{\n${stringArray.join('\n')}\n${' '.repeat(spaceCount + visualParams.outerObjSpace)}}`;
};

const standartRender = (diff, spaceCount = visualParams.spaceCount) => {
  const diffToString = (diffElem) => {
    const formDiffString = (value, diffSign) => `${' '.repeat(spaceCount)}${diffSign} ${diffElem.key}: ${_.isObject(value) ? objToString(value, spaceCount) : value}`;

    const diffString = {
      nested: value => formDiffString(standartRender(value, spaceCount + visualParams.innerObjSpace), ' '),
      'not changed': value => formDiffString(value, ' '),
      changed: value => [formDiffString(value.old, '-'), formDiffString(value.new, '+')],
      deleted: value => formDiffString(value, '-'),
      inserted: value => formDiffString(value, '+'),
    };

    return diffString[diffElem.type](diffElem.value);
  };

  const diffStringArray = diff.map(diffElem => diffToString(diffElem));
  const diffFlatArr = _.flatten(diffStringArray);
  return `{\n${diffFlatArr.join('\n')}\n${' '.repeat(spaceCount - visualParams.outerObjSpace)}}`;
};

export default standartRender;
