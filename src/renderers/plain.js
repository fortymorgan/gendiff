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
  const stringify = (diffElem) => {
    const diffString = {
      nested: value => plainRender(value, [...acc, diffElem.key]),
      'not changed': () => 'Not changed',
      changed: value => `${generateBeginOfString([...acc, diffElem.key])}updated. From ${chooseValueString(value.old, 'simple')} to ${chooseValueString(value.new, 'simple')}`,
      deleted: () => `${generateBeginOfString([...acc, diffElem.key])}removed`,
      inserted: value => `${generateBeginOfString([...acc, diffElem.key])}added with ${chooseValueString(value, 'withWord')}`,
    };
    return diffString[diffElem.type](diffElem.value);
  };

  const diffStringArray = diff
    .map(diffElem => stringify(diffElem))
    .filter(item => item !== 'Not changed');
  return diffStringArray.join('\n');
};

export default plainRender;
