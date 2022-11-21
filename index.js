class Calculator {
  #container;
  #display;
  #buttons;
  #operations;
  #switchOperator;
  #result;
  #divideZero;
  #lastNumber;
  #lastOperator;
  constructor() {
    this.#container = this.createComponent(document.body, 'div', ['calculator']);
    this.#display = this.createComponent(this.#container, 'div', ['calculator__display']);
    this.#display.innerHTML = '0';
    this.#buttons = this.createComponent(this.#container, 'div', ['calculator__buttons']);
    this.createButtons();
    this.#buttons.addEventListener('click', (e) => {
      if (e.target.classList.contains('calculations')) {
        if (e.target.classList.contains('operator')) {
          this.removeActiveClass();
          e.target.classList.add('active');
        }
        this.defineTarget(e.target.innerHTML);
      }
    })
    this.#operations = [];
    this.#switchOperator = false;
    this.#result = false;
    this.#divideZero = false;
    this.lastNumber = null;
    this.lastOperator = null;
  }

  createButtons() {
    const VALUES = ['C', '+/-', 'Del', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '00', '.', '='];
    for (let i = 0; i < VALUES.length; i++) {
      const BUTTON = this.createComponent(this.#buttons, 'div', ['calculator__buttons__button', 'calculations']);
      if (i < 4 || (i + 1) % 4 === 0) {
        BUTTON.classList.add('dark');
      } 
      if ((i + 1) % 4 === 0 && i !== 19) {
        BUTTON.classList.add('operator');
      }
      BUTTON.innerHTML = VALUES[i];
    }
  }

  createComponent(append, tag, className) {
    const COMPONENT = document.createElement(tag);
    for (let elem of className) {
      COMPONENT.classList.add(elem);
    }
    append.appendChild(COMPONENT);
    return COMPONENT;
  }

  defineTarget(target) {
    if (target === 'C') {
      this.clearAllValues();
      this.removeActiveClass();
      return;
    }
    if (this.#divideZero) {
      return;
    }
    if (Number(target) || target.includes('0')) {
      this.handleOperand(target);
    } else if (target === '+' || target === '-' || target === '*' || target === '/') {
      this.handleOperator(target);
    } else if (target === '=') {
      this.makeCalculations();
    } else if (target === '.') {
      this.handleDot();
    } else if (target === 'Del') {
      this.handleDel();
    } else if (target === '+/-') {
      this.handleNegation();
    }
  }

  handleOperand(operand) {
    // in case the calculations were made (after button '=') OR entering digit is '0' OR we trying to enter a digit after such buttons '+' '-' '*' '/'
    // we should change the digit (or number consisting of several digits) on display with new one
    if (this.#result || this.#display.innerHTML === '0' || this.#switchOperator) {
      if (operand.startsWith('0')) {
        // in case entering digit = 0. Save this
        this.#display.innerHTML = '0';
      } else {
        // else change 0 with other number
        this.#display.innerHTML = operand;
      }
      // in case the calculations were made we change the status of this
      if (this.#result) {
        this.#result = false;
      }
    } else if (this.#display.innerHTML.includes('.')) {
        // in case display includes any digits besides 0 and it includes digits after DOT
        // we check in order the digits after DOT don't exceed limit length
        if (this.#display.innerHTML.split('.')[1].length > 7) {
          return;
        } else {
          // else add digit to the current number on display
          this.#display.innerHTML += operand;
        }
    } else if (this.#display.innerHTML.length <= 7) {
      this.#display.innerHTML += operand;
    } else {
      return;
    }
    this.#switchOperator = false;
  }

  handleOperator(operator) {
    this.#lastOperator = operator;
    // in case the last clicked button is + ro - or * or /
    if (this.#switchOperator) {
      if (this.#operations[this.#operations.length - 1] !== operator) {
        this.#operations[this.#operations.length - 1] = operator;
        return;
      }
      return;
    }
    // in case we have all the necessary values to make calculations 
    if (this.#operations.length === 2) {
      // adding the second number to array
      this.#operations.push(this.#display.innerHTML);
      // in case of dividing by 0
      if (this.#operations.includes('/') && this.#operations[this.#operations.length - 1] === '0') {
        this.#display.innerHTML = `Can't be divided by 0!`;
        this.#divideZero = true;
        this.#switchOperator = false;
        this.#operations = [];
        this.#result = false;
        return;
      }
      // if everything is ok trying to make calculations
      // what is the operation (+ or - or * or /)
      let result;
      if (this.#operations.includes('+')) {
        result = Number(this.#operations[0]) + Number(this.#operations[2]);
      } else if (this.#operations.includes('-')) {
        result = Number(this.#operations[0]) - Number(this.#operations[2]);
      } else if (this.#operations.includes('*')) {
        result = Number(this.#operations[0]) * Number(this.#operations[2]);
      } else {
        result = Number(this.#operations[0]) / Number(this.#operations[2]);
      }
      // first of all checking if the resulting number contains something after DOT
      this.displayCalculations(result);
      // make new array consisting of the first operand and operator
      this.#operations = [`${this.#display.innerHTML}`];
      this.#operations.push(operator);
    } else {
      this.#operations.push(this.#display.innerHTML);
      this.#operations.push(operator);
    }
    this.#lastNumber = this.#display.innerHTML;
    this.#result = false;
    this.#switchOperator = true;
  }

  handleDot() {
    if (!this.#switchOperator && this.#display.innerHTML.includes('.')) {
      return;
    }
    if (this.#result || this.#switchOperator) {
      this.#display.innerHTML = '0.';
      this.#result = false;
      this.#switchOperator = false;
    } else {
      this.#display.innerHTML += '.';
    }
  }

  handleDel() {
    if (this.#switchOperator) {
      return;
    }
    if (this.#display.innerHTML.length === 1) {
      this.#display.innerHTML = '0';
    } else {
      this.#display.innerHTML = this.#display.innerHTML.slice(0, this.#display.innerHTML.length - 1);
    }
  }

  handleNegation() {
    if (this.#display.innerHTML === '0') {
      return;
    } else if (this.#switchOperator && !(this.#display.innerHTML === '0')) {
      let value = (Number(this.#display.innerHTML) * -1).toString();
      this.#display.innerHTML = '0';
      this.handleOperand(value);
    } else {
      this.#display.innerHTML = (Number(this.#display.innerHTML) * -1).toString();
    }
  }

  makeCalculations() {
    if (!this.#result) {
      if (!this.#operations[1] && !this.#lastOperator) {
        return;
      }
      if (!this.#operations[1]) {
        this.#operations.push(this.#display.innerHTML);
        this.#operations.push(this.#lastOperator);
        this.#operations.push(this.#lastNumber);
      } else {
        this.#operations.push(this.#display.innerHTML);
        this.#lastNumber = this.#display.innerHTML;
      }
    } else {
      this.#operations.push(this.#display.innerHTML);
      this.#operations.push(this.#lastOperator);
      this.#operations.push(this.#lastNumber);
    }
    // in case of dividing by 0
    if (this.#operations.includes('/') && this.#operations[this.#operations.length - 1] === '0') {
      this.#display.innerHTML = `Can't be divided by 0!`;
      this.#divideZero = true;
      this.#switchOperator = false;
      this.#operations = [];
      this.#result = false;
      return;
    }
    // if everything is ok trying to make calculations
    // what is the operation (+ or - or * or /)
    let result;
    if (this.#operations.includes('+')) {
      result = Number(this.#operations[0]) + Number(this.#operations[2]);
    } else if (this.#operations.includes('-')) {
      result = Number(this.#operations[0]) - Number(this.#operations[2]);
    } else if (this.#operations.includes('*')) {
      result = Number(this.#operations[0]) * Number(this.#operations[2]);
    } else {
      result = Number(this.#operations[0]) / Number(this.#operations[2]);
    }
    this.displayCalculations(result);
    this.#operations = [];
    this.#result = true;
    this.#switchOperator = false;
  }

  displayCalculations(result) {
    // first of all checking if the resulting number contains something after DOT
    if (result.toString().includes('.')) {
      if (result.toFixed(8).toString().endsWith('0')) {
        // in case JS made wrong calculations and we have 0 after DOT
        let value = result.toFixed(8).toString().split('');
        let count = value.length - 1;
        // remove all 0
        while (value[count] === '0') {
          value.splice(count, 1);
          count--;
        }
        if (value.join('') === '-0.' || value.join('') === '0.') {
          value = ['0'];
        }
        this.#display.innerHTML = value.join('');
      } else if (result.toString().split(".")[1].length > 8) {
        // in case there are more then 8 numbers after DOT
        this.#display.innerHTML = result.toFixed(8).toString();
      } else {
        this.#display.innerHTML = result.toString();
      }
    } else {
      this.#display.innerHTML = result.toString();
    }
  }

  clearAllValues() {
    this.#display.innerHTML = '0';
    this.#switchOperator = false;
    this.#operations = [];
    this.#result = false;
    this.#divideZero = false;
    this.#lastNumber = null;
    this.#lastOperator = null;
  }

  removeActiveClass() {
    const OPERATORS = document.querySelectorAll('.operator');
    for (let elem of OPERATORS) {
      elem.classList.remove('active');
    }
  }
}

const calculator = new Calculator();