import _ from 'lodash';

const plainRender = (diff) => {
  const iter = (diffObj, acc) => {
    const diffStringArr = diffObj.map((elem) => {
      if (elem.diff instanceof Array) {
        return iter(elem.diff, [...acc, elem.key]);
      }

      switch (elem.diff) {
        case 'not-changed':
          return 'Not changed';
        case 'added':
          return `Property '${[...acc, elem.key].join('.')}' was added with ${(elem.actValue instanceof Object) ? 'complex value' : `value: '${elem.actValue}'`}`;
        case 'removed':
          return `Property '${[...acc, elem.key].join('.')}' was removed`;
        case 'changed':
          return `Property '${[...acc, elem.key].join('.')}' was updated. From ${(elem.prevValue instanceof Object) ? 'complex value' : `'${elem.prevValue}'`} to ${(elem.actValue instanceof Object) ? 'complex value' : `'${elem.actValue}'`}`;
        default:
          return 'lol';
      }
    });
    return diffStringArr.filter(item => item !== 'Not changed');
  };
  const result = iter(diff, []);
  return _.flattenDeep(result).join('\n');
};

export default plainRender;
