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
        changed: [formDiffString(elem.key, elem.prevValue, '-', repeater), formDiffString(elem.key, elem.actValue, '+', repeater)],
      };

      return diffString[elem.diff];
    });
    return _.flatten(diffStringArr).join('\n');
  };
  return `{\n${iter(diff, visualParams.spaceCount)}\n}`;
};

export default standartRender;
