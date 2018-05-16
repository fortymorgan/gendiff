import _ from 'lodash';

const plainRender = (diff) => {
  const stringify = (diffObj, acc) => {
    const diffStringArr = diffObj.map((elem) => {
      if (elem.diff instanceof Array) {
        return stringify(elem.diff, [...acc, elem.key]);
      }

      const chooseValueString = (value, sample) => {
        const samples = {
          simple: `'${value}'`,
          withWord: `value: '${value}'`,
        };
        return (value instanceof Object) ? 'complex value' : samples[sample];
      };

      const generateBeginOfString = key => `Property '${[...acc, key].join('.')}' was `;

      const diffString = {
        'not-changed': 'Not changed',
        added: `${generateBeginOfString(elem.key)}added with ${chooseValueString(elem.actValue, 'withWord')}`,
        removed: `${generateBeginOfString(elem.key)}removed`,
        changed: `${generateBeginOfString(elem.key)}updated. From ${chooseValueString(elem.prevValue, 'simple')} to ${chooseValueString(elem.actValue, 'simple')}`,
      };
      return diffString[elem.diff];
    });
    return diffStringArr.filter(item => item !== 'Not changed');
  };
  const result = stringify(diff, []);
  return _.flattenDeep(result).join('\n');
};

export default plainRender;
