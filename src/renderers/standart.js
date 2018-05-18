import _ from 'lodash';

const visualParams = {
  innerObjSpace: 4,
  outerObjSpace: 2,
  spaceCount: 2,
};

const stringify = (value, spaceCount) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = _.keys(value);
  const stringArray = keys.map(key => `${' '.repeat(spaceCount + visualParams.innerObjSpace)}  ${key}: ${value[key]}`);
  return `{\n${stringArray.join('\n')}\n${' '.repeat(spaceCount + visualParams.outerObjSpace)}}`;
};

const standartRender = (diff, parentName = '', spaceCount = visualParams.spaceCount) => {
  const diffToString = (diffElem) => {
    const formDiffString = (value, diffSign) => {
      const valueString = stringify(value, spaceCount);
      return `${' '.repeat(spaceCount)}${diffSign} ${diffElem.key}: ${valueString}`;
    };

    const diffString = {
      nested: (diffNode) => {
        const newParentName = `${' '.repeat(spaceCount)}  ${diffNode.key}: `;
        const newSpaceCount = spaceCount + visualParams.innerObjSpace;
        return standartRender(diffNode.children, newParentName, newSpaceCount);
      },
      'not changed': diffNode => formDiffString(diffNode.value, ' '),
      changed: diffNode => [formDiffString(diffNode.value.oldValue, '-'),
        formDiffString(diffNode.value.newValue, '+')],
      deleted: diffNode => formDiffString(diffNode.value, '-'),
      inserted: diffNode => formDiffString(diffNode.value, '+'),
    };

    return diffString[diffElem.type](diffElem);
  };

  const diffStringArray = diff.map(diffElem => diffToString(diffElem));
  const diffFlatArr = _.flatten(diffStringArray);
  return `${parentName}{\n${diffFlatArr.join('\n')}\n${' '.repeat(spaceCount - visualParams.outerObjSpace)}}`;
};

export default standartRender;
