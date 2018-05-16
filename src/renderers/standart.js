import _ from 'lodash';

const standartRender = (diff) => {
  const visualParams = {
    innerObjSpace: 4,
    outerObjSpace: 2,
    spaceCount: 2,
  };

  const stringify = (diffObject, spaceCount) => {
    if (diffObject.diff instanceof Array) {
      const innerDiffArr = diffObject.diff.map(elem =>
        stringify(elem, spaceCount + visualParams.innerObjSpace));

      const innerDiffFlat = _.flatten(innerDiffArr);

      return `${' '.repeat(spaceCount)}  ${diffObject.key}: {\n${innerDiffFlat.join('\n')}\n${' '.repeat(spaceCount + visualParams.outerObjSpace)}}`;
    }

    const objToString = (object) => {
      const keys = Object.keys(object);
      const stringArray = keys.map(key => `${' '.repeat(spaceCount + visualParams.innerObjSpace)}  ${key}: ${object[key]}`);
      return `{\n${stringArray.join('\n')}\n${' '.repeat(spaceCount + visualParams.outerObjSpace)}}`;
    };

    const formDiffString = (value, diffSign) => `${' '.repeat(spaceCount)}${diffSign} ${diffObject.key}: ${(value instanceof Object) ? objToString(value) : value}`;

    const diffString = {
      'not-changed': formDiffString(diffObject.prevValue, ' '),
      added: formDiffString(diffObject.actValue, '+'),
      removed: formDiffString(diffObject.prevValue, '-'),
      changed: [formDiffString(diffObject.prevValue, '-'), formDiffString(diffObject.actValue, '+')],
    };
    return diffString[diffObject.diff];
  };

  const diffStringArr = diff.map(elem => stringify(elem, visualParams.spaceCount));
  const diffFlatArr = _.flatten(diffStringArr);
  return `{\n${diffFlatArr.join('\n')}\n}`;
};

export default standartRender;
