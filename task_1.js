function makeDeepCopy(obj) {
  let copy;
  function copyArray(array, path) {
    for(let [index, elem] of array.entries()) {
      if(Array.isArray(elem)) {
        path[index] = [];
        copyArray(elem, path[index]);
      } else if(typeof elem === 'object' && elem !== null) {
        path[index] = {};
        copyObject(elem, path[index]);
      } else {
        path.push(elem);
      }
    }
  }

  function copyObject(object, path) {
    for(let elem in object) {
      if(Array.isArray(object[elem])) {
        path[elem] = [];
        copyArray(object[elem], path[elem]);
      } else if(typeof object[elem] === 'object' && object[elem] !== null) {
        path[elem] = {};
        copyObject(object[elem], path[elem]);
      } else {
        path[elem] = object[elem];
      }
    }
  }

  if(Array.isArray(obj)) {
    copy = [];
    copyArray(obj, copy);
  } else if(typeof obj === 'object' && obj !== null) {
    copy = {};
    copyObject(obj, copy);
  } else {
    throw new Error();
  }

  return copy;
}