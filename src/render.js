import _ from 'lodash';

const standartRender = (diff) => {
  const visualParams = {
    innerObjSpace: 4,
    outerObjSpace: 2,
    spaceCount: 2,
  };

  const objToString = (obj, repeater) => {
    const keys = Object.keys(obj);
    const stringArray = keys.map(key => `${' '.repeat(repeater + visualParams.innerObjSpace)}  ${key}: ${obj[key]}`);
    return `{\n${stringArray.join('\n')}\n${' '.repeat(repeater + visualParams.outerObjSpace)}}`;
  };

  const formDiffString = (key, value, diffSign, repeater) => `${' '.repeat(repeater)}${diffSign} ${key}: ${(value instanceof Object) ? objToString(value, repeater) : value}`;

  const iter = (diffObj, repeater) => {
    const diffStringArr = diffObj.map((elem) => {
      if (elem.diff instanceof Array) {
        return `${' '.repeat(repeater)}  ${elem.key}: {\n${iter(elem.diff, repeater + visualParams.innerObjSpace)}\n${' '.repeat(repeater + visualParams.outerObjSpace)}}`;
      }

      const diffString = {
        'not-changed': formDiffString(elem.key, elem.prevValue, ' ', repeater),
        added: formDiffString(elem.key, elem.actValue, '+', repeater),
        removed: formDiffString(elem.key, elem.prevValue, '-', repeater),
        changed: `${formDiffString(elem.key, elem.prevValue, '-', repeater)}\n${formDiffString(elem.key, elem.actValue, '+', repeater)}`,
      };

      return diffString[elem.diff];
    });
    return diffStringArr.join('\n');
  };
  return `{\n${iter(diff, visualParams.spaceCount)}\n}`;
};

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

const renderers = {
  standart: standartRender,
  plain: plainRender,
};

export default renderers;
