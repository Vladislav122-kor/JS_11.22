function checkValue(number) {
  if(number === null) {
    return 'cancel';
  }
  if(number === '' || number.includes(' ')) {
    console.log('Incorrect input!');
    return false;
  }
  if(number.length > 1) {
    if(number.startsWith('0')) {
      console.log('Incorrect input!');
      return false;
    }
  }
  number = Number(number);
  if(Number.isNaN(number) || number < 0) {
    console.log('Incorrect input!');
    return false;
  }
  return number;
}

function getNumbers() {
  const NUMBER_1 = checkValue(prompt('Enter the first number'));
  if(NUMBER_1 === 'cancel' || NUMBER_1 !== 0 && !NUMBER_1) {
    return;
  }
  let NUMBER_2 = checkValue(prompt('Enter the second number'));
  if(NUMBER_2 === 'cancel' || NUMBER_2 !== 0 && !NUMBER_2) {
    return;
  }
  consoleResult(NUMBER_1, NUMBER_2);
}

function consoleResult(number_1, number_2) {
  const SUM = number_1 + number_2;
  const PRODUCT = number_1 * number_2;
  const POWER = number_1 ** number_2;
  console.log(`First number: ${number_1}. Second number: ${number_2}. Sum: ${SUM}. Product: ${PRODUCT}. Power: ${POWER}`);
}
  
getNumbers();