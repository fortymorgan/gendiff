import _ from 'lodash';

const generateBeginOfString = key => `Property '${key}' was `;

const chooseValueString = (value, sample) => {
  const samples = {
    simple: `'${value}'`,
    withWord: `value: '${value}'`,
  };
  return _.isObject(value) ? 'complex value' : samples[sample];
};

const render = (diff, acc = []) => {
  const diffToString = (diffElem) => {
    const keyAcc = [...acc, diffElem.key];
    const keyString = keyAcc.join('.');
    const diffString = {
      nested: diffNode => render(diffNode.children, keyAcc),
      changed: (diffNode) => {
        const beginOfString = generateBeginOfString(keyString);
        const oldValueString = chooseValueString(diffNode.oldValue, 'simple');
        const newValueString = chooseValueString(diffNode.newValue, 'simple');
        return `${beginOfString}updated. From ${oldValueString} to ${newValueString}`;
      },
      deleted: () => {
        const beginOfString = generateBeginOfString(keyString);
        return `${beginOfString}removed`;
      },
      inserted: (diffNode) => {
        const beginOfString = generateBeginOfString(keyString);
        const valueString = chooseValueString(diffNode.value, 'withWord');
        return `${beginOfString}added with ${valueString}`;
      },
    };
    return diffString[diffElem.type](diffElem);
  };

  const diffStringArray = diff
    .filter(diffElem => diffElem.type !== 'not changed')
    .map(diffElem => diffToString(diffElem));
  return diffStringArray.join('\n');
};

export default render;
