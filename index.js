class Stack {
  #stack;
  #size;
  #limitSize
  constructor(n = 10) {
    if(typeof n !== 'number' || Number.isNaN(n) || !Number.isFinite(n) || n < 0) {
      throw new Error('Invalid limit value');
    }
    this.#stack = {};
    this.#size = 0;
    this.#limitSize = n;
  }

  push(elem) {
    if(this.#size === this.#limitSize) {
      throw new Error('Limit exceeded');
    }
    this.#size++;
    this.#stack[this.#size] = elem;
  }

  pop() {
    if(this.#size === 0) {
      throw new Error('Empty stack');
    }
    const ELEM = this.#stack[this.#size];
    delete this.#stack[this.#size];
    this.#size--;
    return ELEM;
  }

  peek() {
    if(this.#size === 0) {
      return null;
    }
    return this.#stack[this.#size];
  }

  isEmpty() {
    if(this.#size !== 0) {
      return false;
    }
    return true;
  }

  toArray() {
    const ARRAY = [];
    for(let i = this.#size; i > 0; i--) {
      ARRAY.push(this.#stack[i]);
    }
    return ARRAY;
  }

  static fromIterable(iterable) {
    if(iterable?.[Symbol.iterator] instanceof Function) {
      let length = 0;
      for(let elem of iterable) {
        length++;
      }
      const STACK = new Stack(length);
      for(let elem of iterable) {
        STACK.push(elem);
      }
      return STACK;
    } else {
      throw new Error('Not iterable');
    }
  }
}

class LinkedList {
  #head;
  #tail;
  constructor() {
    this.#head = null;
    this.#tail = null;
  }

  append(elem) {
    const NODE = {value: elem, next: null};
    if(!this.#head || !this.#tail) {
      this.#head = NODE;
      this.#tail = NODE;
      return;
    }
    this.#tail.next = NODE;
    this.#tail = NODE;
  }

  prepend(elem) {
    const NODE = {value: elem, next: this.#head};
    this.#head = NODE;
    if(!this.#tail) {
      this.#tail = NODE;
    }
  }

  find(elem) {
    if(!this.#head) {
      return null;
    }
    function compareElem(currentNode) {
      if(!currentNode) {
        return null;
      }
      if(currentNode.value === elem) {
        return currentNode.value;
      }
      return compareElem(currentNode.next);
    }
    return compareElem(this.#head);
  }

  toArray() {
    const ARRAY = [];
    function makeArray(currentNode) {
      if(!currentNode) {
        return ARRAY;
      }
      ARRAY.push(currentNode.value);
      return makeArray(currentNode.next);
    }
    return makeArray(this.#head);
  }

  static fromIterable(iterable) {
    if(iterable?.[Symbol.iterator] instanceof Function) {
      const LIST = new LinkedList();
      for(let elem of iterable) {
        LIST.append(elem);
      }
      return LIST;
    } else {
      throw new Error('Not iterable');
    }
  }
}

class Car {
  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;
  #damage;
  #currentFuelVolume;
  #isStarted;
  #mileage;
  #health;
  constructor() {
    this.#brand = '';
    this.#model = '';
    this.#yearOfManufacturing = 1950;
    this.#maxSpeed = 100;
    this.#maxFuelVolume = 20;
    this.#fuelConsumption = 1;
    this.#damage = 1;
    this.#currentFuelVolume = 0;
    this.#isStarted = false;
    this.#mileage = 0;
    this.#health = 100;
  }

  get brand() {
    return this.#brand;
  }

  set brand(value) {
    if(typeof value !== 'string' || value.length < 1 || value.length > 50) {
      throw new Error('Invalid brand name');
    }
    this.#brand = value;
  }

  get model() {
    return this.#model;
  }

  set model(value) {
    if(typeof value !== 'string' || value.length < 1 || value.length > 50) {
      throw new Error('Invalid model name');
    }
    this.#model = value;
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set yearOfManufacturing(value) {
    if(typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value) || value < 1950 || value > (new Date()).getFullYear()) {
      throw new Error('Invalid year of manufacturing');
    }
    this.#yearOfManufacturing = value;
  }

  get maxSpeed() {
    return this.#maxSpeed;
  }

  set maxSpeed(value) {
    if(typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value) || value < 100 || value > 300) {
      throw new Error('Invalid max speed');
    }
    this.#maxSpeed = value;
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }

  set maxFuelVolume(value) {
    if(typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value) || value < 20 || value > 100) {
      throw new Error('Invalid max fuel volume');
    }
    this.#maxFuelVolume = value;
  }

  get fuelConsumption() {
    return this.#fuelConsumption;
  }

  set fuelConsumption(value) {
    if(typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value) || value <= 1) {
      throw new Error('Invalid fuel consumption');
    }
    this.#fuelConsumption = value;
  }

  get damage() {
    return this.#damage;
  }

  set damage(value) {
    if(typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value) || value < 1 || value > 5) {
      throw new Error('Invalid damage');
    }
    this.#damage = value;
  }

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get mileage() {
    return this.#mileage;
  }

  get health() {
    return this.#health;
  }

  start() {
    if(this.#isStarted) {
      throw new Error('Car has already started');
    }
    this.#isStarted = true;
  }

  shutDownEngine() {
    if(!this.#isStarted) {
      throw new Error(`Car hasn't started yet`);
    }
    this.#isStarted = false;
  }

  fillUpGasTank(value) {
    if(typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value) || value <= 0) {
      throw new Error('Invalid fuel amount');
    }
    if(this.#currentFuelVolume + value > this.#maxFuelVolume) {
      throw new Error('Too much fuel');
    }
    if(this.#isStarted) {
      throw new Error('You have to shut down your car first');
    }
    this.#currentFuelVolume += value;
  }

  drive(speed, duration) {
    if(typeof speed !== 'number' || Number.isNaN(speed) || !Number.isFinite(speed) || speed <= 0) {
      throw new Error('Invalid speed');
    }
    if(typeof duration !== 'number' || Number.isNaN(duration) || !Number.isFinite(duration) || duration <= 0) {
      throw new Error('Invalid duration');
    }
    if(speed > this.#maxSpeed) {
      throw new Error(`Car can't go this fast`);
    }
    if(!this.#isStarted) {
      throw new Error('You have to start your car first');
    }
    const DISTANCE = speed * duration;
    const FUELSPEND = DISTANCE / 100 * this.#fuelConsumption;
    if(FUELSPEND > this.#currentFuelVolume) {
      throw new Error(`You don't have enough fuel`);
    }
    const HEALTHSPEND = DISTANCE / 100 * this.#damage;
    if(HEALTHSPEND > this.#health) {
      throw new Error(`Your car won't make it`);
    }
    this.#currentFuelVolume -= FUELSPEND;
    this.#health -= HEALTHSPEND;
    this.#mileage += DISTANCE;
  }

  repair() {
    if(this.#isStarted) {
      throw new Error('You have to shut down your car first');
    }
    if(this.#maxFuelVolume !== this.#currentFuelVolume) {
      throw new Error('You have to fill up your gas tank first');
    }
    this.#health = 100;
  }

  getFullAmount() {
    return this.#maxFuelVolume - this.#currentFuelVolume;
  }
}