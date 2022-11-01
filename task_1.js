function checkValue(value_1, value_2) {

  if (value_1 === '' || value_2 === '' || value_1 === null || value_2 === null) {
    console.log('Incorrect input!');
    return;
  }
  
  // converting variables to type number and call the function for numbers validation
  makeNumberValidation(Number(value_1), Number(value_2));
}
  
function makeNumberValidation(number_1, number_2) {
  
  if (Number.isNaN(number_1) || Number.isNaN(number_2)) {
    console.log('Incorrect input!');
  } else {
    const SUM = number_1 + number_2;
    const PRODUCT = number_1 * number_2;
    const POWER = number_1 ** number_2;
  
    console.log(`First number: ${number_1}. Second number: ${number_2}. Sum: ${SUM}. Product: ${PRODUCT}. Power: ${POWER}`);
  }
}
  
checkValue(prompt('Введите первое число'), prompt('Введите второе число'));