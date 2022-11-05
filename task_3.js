function createIterable(valFrom, valTo) {

  if (valFrom === undefined || valTo === undefined) {
    throw new Error();
  }

  if (typeof valFrom !== 'number' || typeof valTo !== 'number' || !Number.isFinite(valFrom) || !Number.isFinite(valTo)) {
    throw new Error();
  }

  if (valTo <= valFrom) {
    throw new Error();
  }


  
  const ARRAY = [];

  for (let i = valFrom; i <= valTo; i += 1) {
    ARRAY.push(i);
  }

  return ARRAY;
}