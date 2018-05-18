import _ from 'lodash';

const generateBeginOfString = key => `Property '${key.join('.')}' was `;

const chooseValueString = (value, sample) => {
  const samples = {
    simple: `'${value}'`,
    withWord: `value: '${value}'`,
  };
  return _.isObject(value) ? 'complex value' : samples[sample];
};

const plainRender = (diff, acc = []) => {
  const diffToString = (diffElem) => {
    const diffString = {
      nested: diffNode => plainRender(diffNode.children, [...acc, diffNode.key]),
      'not changed': () => 'Not changed',
      changed: diffNode => `${generateBeginOfString([...acc, diffNode.key])}updated. From ${chooseValueString(diffNode.value.oldValue, 'simple')} to ${chooseValueString(diffNode.value.newValue, 'simple')}`,
      deleted: diffNode => `${generateBeginOfString([...acc, diffNode.key])}removed`,
      inserted: diffNode => `${generateBeginOfString([...acc, diffNode.key])}added with ${chooseValueString(diffNode.value, 'withWord')}`,
    };
    return diffString[diffElem.type](diffElem);
  };

  const diffStringArray = diff
    .map(diffElem => diffToString(diffElem))
    .filter(item => item !== 'Not changed');
  return diffStringArray.join('\n');
};

export default plainRender;
