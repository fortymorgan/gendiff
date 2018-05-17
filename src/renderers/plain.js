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
      'not changed': () => 'Not changed',
      changed: value => `${generateBeginOfString([...acc, diffElem.key])}updated. From ${chooseValueString(value.oldValue, 'simple')} to ${chooseValueString(value.newValue, 'simple')}`,
      deleted: () => `${generateBeginOfString([...acc, diffElem.key])}removed`,
      inserted: value => `${generateBeginOfString([...acc, diffElem.key])}added with ${chooseValueString(value, 'withWord')}`,
    };
    return diffElem.type === 'nested' ? plainRender(diffElem.children, [...acc, diffElem.key]) : diffString[diffElem.type](diffElem.value);
  };

  const diffStringArray = diff
    .map(diffElem => diffToString(diffElem))
    .filter(item => item !== 'Not changed');
  return diffStringArray.join('\n');
};

export default plainRender;
