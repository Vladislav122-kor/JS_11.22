function checkValue(value, type) {
  if(value === null) {
    return 'cancel';
  }
  if(type === 'number') {
    if(value === '' || value.includes(' ')) {
      console.log('Incorrect input!');
      return false;
    }
    if(value.length > 1) {
      if(value.startsWith('0')) {
        console.log('Incorrect input!');
        return false;
      }
    }
    value = Number(value);
    if(Number.isNaN(value) || value < 0 || value > 10) {
      console.log('Incorrect input!');
      return false;
    }
  } else if(type === 'string') {
    if(value.length > 3) {
      console.log('Incorrect input!');
      return false;
    }
  }
  return value;
} 

function getValues() {
  const STRING = checkValue(prompt('Enter up to three any characters (a space counts as a character)'), 'string');
  if(STRING === 'cancel' || !STRING) {
    return;
  }
  const NUMBER = checkValue(prompt('Enter any number from 0 to 10 inclusive'), 'number');
  if(NUMBER === 'cancel' || NUMBER !== 0 && !NUMBER) {
    return;
  }
  consoleResult(STRING, NUMBER);
}

function consoleResult(string, number) {
  const MATRIX = [];
  while(MATRIX.length < number * number) {
    if(MATRIX.length % number === 0 && MATRIX.length !== 0) {
      MATRIX.push(`\n${string}`);
    } else {
      MATRIX.push(string);
    }
  }
  console.log(MATRIX.join(' '));
}

getValues();
