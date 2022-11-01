function checkValue(value_1, value_2) {

  if (value_1 === '' || value_2 === '' || value_1 === null || value_2 === null) {
    console.log('Incorrect input!');
    return;
  }

  // converting the second argument to type number and call the function to check the values for compliance with the requirements
  makeValidation(value_1, Number(value_2));
}

function makeValidation(string, number) {

  if (string.length > 3 || Number.isNaN(number) || number < 0 || number > 10) {
    console.log('Incorrect input!');
  } else {
    const MATRIX = [];

    while (MATRIX.length < number) {
        MATRIX.push(Array(number).fill(string));
    }

    console.log(MATRIX);

  }
}

checkValue(prompt('Введите до трех любых символа (пробел считается символом)'), prompt('Введите любое число от 0 до 10 включительно'));