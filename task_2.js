function createDebounceFunction(callback, delay) {
  var time = null;
  var addTime = null;
  let int = setInterval(() => {
    time -= 100;
    if (time < 0 && addTime) {
      time += addTime;
      addTime = null;
    } else if (time < 0) {
      clearInterval(int);
      callback();
    }
  }, 100);

  return function() {
    if (!time) {
      time = delay;
    } else if (addTime) {
      addTime = Math.max(this._idleTimeout, addTime);
    } else {
      addTime = this._idleTimeout;
    }
  }
}