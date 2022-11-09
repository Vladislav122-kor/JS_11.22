Array.prototype.customFilter = function(callback, obj = null) {
  if (typeof callback !== 'function') {
    throw new Error('Callback is not a function!');
  }
  if (obj && typeof obj !== 'object' || Array.isArray(obj)) {
    throw new Error('The second argument is not an object or is array');
  }
  if (obj) {
    callback.call(obj);
  }

  const RESULT = [];
  for (let i = 0; i < this.length; i += 1) {
    if (callback(this[i], i, this)) {
      RESULT.push(this[i]);
    }
  }
  return RESULT;
}