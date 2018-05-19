import _ from 'lodash';

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = _.keys(value);
  const valueSpaceCount = (depth * 4) + 4;
  const closeObjectSpaceCount = depth * 4;
  const stringArray = keys
    .map(key => `${' '.repeat(valueSpaceCount)}${key}: ${value[key]}`);
  return `{\n${stringArray.join('\n')}\n${' '.repeat(closeObjectSpaceCount)}}`;
};

const render = (diff, parentName = '', depth = 0) => {
  const diffToString = (diffElem) => {
    const prettifyDiffString = (value, diffSign) => {
      const diffSpaceCount = (depth * 4) + 2;
      const valueString = stringify(value, depth + 1);
      return `${' '.repeat(diffSpaceCount)}${diffSign} ${diffElem.key}: ${valueString}`;
    };

    const diffString = {
      nested: (diffNode) => {
        const valueSpaceCount = (depth * 4) + 4;
        const newParentName = `${' '.repeat(valueSpaceCount)}${diffNode.key}: `;
        return render(diffNode.children, newParentName, depth + 1);
      },
      'not changed': diffNode => prettifyDiffString(diffNode.value, ' '),
      changed: (diffNode) => {
        const diffDeleted = prettifyDiffString(diffNode.oldValue, '-');
        const diffInserted = prettifyDiffString(diffNode.newValue, '+');
        return [diffDeleted, diffInserted];
      },
      deleted: diffNode => prettifyDiffString(diffNode.value, '-'),
      inserted: diffNode => prettifyDiffString(diffNode.value, '+'),
    };

    return diffString[diffElem.type](diffElem);
  };

  const diffStringArray = diff.map(diffElem => diffToString(diffElem));
  const diffFlatArr = _.flatten(diffStringArray);
  const closeObjectSpaceCount = depth * 4;
  return `${parentName}{\n${diffFlatArr.join('\n')}\n${' '.repeat(closeObjectSpaceCount)}}`;
};

export default render;
