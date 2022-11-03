function checkValue(number) {

  if (number === null) {
    return 'cancel';
  }

  if (number === '' || number.includes(' ')) {
    console.log('Incorrect input!');
    return false;
  }

  if (number.length > 1) {
    if (number.startsWith('0')) {
      console.log('Incorrect input!');
      return false;
    }
  }
  
  // converting variable to type number and make additional validations
  number = Number(number);

  if (Number.isNaN(number) || number < 0) {
    console.log('Incorrect input!');
    return false;
  }

  return number;
}



function getNumbers() {

  let number_1 = checkValue(prompt('Enter the first number'));


  if (number_1 === 'cancel' || number_1 !== 0 && !number_1) {
    return;
  }

  let number_2 = checkValue(prompt('Enter the second number'));

  if (number_2 === 'cancel' || number_2 !== 0 && !number_2) {
    return;
  }

  consoleResult(number_1, number_2);
}



function consoleResult(number_1, number_2) {
  
  const SUM = number_1 + number_2;
  const PRODUCT = number_1 * number_2;
  const POWER = number_1 ** number_2;
  
  console.log(`First number: ${number_1}. Second number: ${number_2}. Sum: ${SUM}. Product: ${PRODUCT}. Power: ${POWER}`);
}
  


getNumbers();
