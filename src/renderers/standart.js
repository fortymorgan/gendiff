import _ from 'lodash';

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = _.keys(value);
  const stringArray = keys
    .map(key => `${' '.repeat(depth * 4)}${key}: ${value[key]}`);
  return `{\n${stringArray.join('\n')}\n${' '.repeat((depth * 4) - 4)}}`;
};

const render = (diff, parentName = '', depth = 1) => {
  const diffToString = (diffElem) => {
    const prettifyDiffString = (value, diffSign) => {
      const valueString = stringify(value, depth + 1);
      return `${' '.repeat((depth * 4) - 2)}${diffSign} ${diffElem.key}: ${valueString}`;
    };

    const diffString = {
      nested: (diffNode) => {
        const newParentName = `${' '.repeat((depth * 4) - 2)}  ${diffNode.key}: `;
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
  return `${parentName}{\n${diffFlatArr.join('\n')}\n${' '.repeat((depth * 4) - 4)}}`;
};

export default render;
