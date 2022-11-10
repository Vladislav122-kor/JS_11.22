class Calculator {
  constructor(...args) {
    if (args.length !== 2) {
      throw new Error('2 parameters have to be passed');
    }
    for (let elem of args) {
      if (typeof elem !== 'number' || Number.isNaN(elem) || !Number.isFinite(elem)) {
        throw new Error('Parameters are invalid numbers');
      }
    }
    this.x = args[0];
    this.y = args[1];
    this.setX = this.setX.bind(this);
    this.setY = this.setY.bind(this);
    this.getSum = this.getSum.bind(this);
    this.getMul = this.getMul.bind(this);
    this.getSub = this.getSub.bind(this);
    this.getDiv = this.getDiv.bind(this);
  }

  setX(value) {
    if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) {
      throw new Error('The parameter is an invalid number');
    }
    this.x = value;
  }

  setY(value) {
    if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) {
      throw new Error('The parameter is an invalid number');
    }
    this.y = value;
  }

  getSum() {
    return this.x + this.y;
  }

  getMul() {
    return this.x * this.y;
  }

  getSub() {
    return this.x - this.y;
  }

  getDiv() {
    if (this.y === 0) {
      throw new Error('The second number is 0');
    }
    return this.x / this.y;
  }
}