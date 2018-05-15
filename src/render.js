const innerObjSpace = 4;
const outerObjSpace = 2;

const objToString = (obj, repeater) => {
  const keys = Object.keys(obj);
  const stringArray = keys.map(key => `${' '.repeat(repeater + innerObjSpace)}  ${key}: ${obj[key]}`);
  return `{\n${stringArray.join('\n')}\n${' '.repeat(repeater + outerObjSpace)}}`;
};

const diffRender = (diff, spaceCount) => {
  const iter = (diffObj, repeater) => {
    const diffStringArr = diffObj.map((elem) => {
      if (elem.diff instanceof Array) {
        return `${' '.repeat(repeater)}  ${elem.key}: {\n${iter(elem.diff, repeater + innerObjSpace)}\n${' '.repeat(repeater + outerObjSpace)}}`;
      }

      switch (elem.diff) {
        case 'no':
          return `${' '.repeat(repeater)}  ${elem.key}: ${(elem.prevValue instanceof Object) ? objToString(elem.prevValue, repeater) : elem.prevValue}`;
        case 'add':
          return `${' '.repeat(repeater)}+ ${elem.key}: ${(elem.actValue instanceof Object) ? objToString(elem.actValue, repeater) : elem.actValue}`;
        case 'rmv':
          return `${' '.repeat(repeater)}- ${elem.key}: ${(elem.prevValue instanceof Object) ? objToString(elem.prevValue, repeater) : elem.prevValue}`;
        case 'chng':
          return `${' '.repeat(repeater)}- ${elem.key}: ${(elem.prevValue instanceof Object) ? objToString(elem.prevValue, repeater) : elem.prevValue}\n${' '.repeat(repeater)}+ ${elem.key}: ${(elem.actValue instanceof Object) ? objToString(elem.actValue, repeater) : elem.actValue}`;
        default:
          return 'lol';
      }
    });
    return diffStringArr.join('\n');
  };
  return `{\n${iter(diff, spaceCount)}\n}`;
};

export default diffRender;
