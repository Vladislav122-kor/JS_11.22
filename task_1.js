function concatStrings(value = undefined, separator = undefined) {
  if (value === null || value === undefined || typeof value !== 'string') {
    return;
  } 

  let result = value;
  const SEPARATOR = separator !== undefined && separator && typeof separator === 'string' ? separator : '';

  return inner = (a = undefined) => {
    if (a !== null && a !== undefined && typeof a === 'string') {
      result += SEPARATOR + a;
      return (b) => inner(b);
    } else {
      return result;
    }
  };
}