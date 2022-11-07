function selectFromInterval(arr, val_1, val_2) {
  if(!Array.isArray(arr)) {
    throw new Error();
  }
  arr.forEach((item) => {
    if(typeof item !== 'number' || !Number.isFinite(item)) {
      throw new Error();
    }
  })
  return val_1 <= val_2 ? arr.filter((item) => item >= val_1 && item <= val_2) : arr.filter((item) => item <= val_1 && item >= val_2);
}