function createIterable(valFrom, valTo) {
  if(valFrom === undefined || valTo === undefined) {
    throw new Error();
  }
  if(typeof valFrom !== 'number' || typeof valTo !== 'number' || !Number.isFinite(valFrom) || !Number.isFinite(valTo)) {
    throw new Error();
  }
  if(valTo <= valFrom) {
    throw new Error();
  }
  const objIterable = {
    [Symbol.iterator]() {
      let current = valFrom;
      let last = valTo;
      return {
        next() {
          if (current <= last) {
            return {
              done: false,
              value: current++
            }
          } else {
            return {
              done: true
            }
          }
        }
      }
    }
  }
  return objIterable;
}
