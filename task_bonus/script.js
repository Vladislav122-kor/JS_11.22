function checkValue(number) {
  if(number === null) {
    return 'cancel';
  }
  if(number === '' || number.includes(' ')) {
    alert('Please enter only positive numbers');
    return false;
  }
  if(number.length > 1) {
    if(number.startsWith('0')) {
      alert('Please enter only positive numbers');
      return false;
    }
  }
  number = Number(number);
  if(Number.isNaN(number) || number <= 0) {
    alert('Please enter only positive numbers');
    return false;
  }
  return number;
}

function getFirstNumber() {
  let checkNumber = false;
  while(!checkNumber) {
    checkNumber = checkValue(prompt('Enter any positive number'));
    if(checkNumber === 'cancel') {
      return;
    }
  }
  getSecondNumber(checkNumber);
}

function getSecondNumber(number_1) {
  let checkNumber = false;
  while(!checkNumber) {
    checkNumber = checkValue(prompt('Enter a number 100 more than the first number'));
    if(checkNumber === 'cancel') {
      return;
    }
    if(checkNumber && checkNumber < number_1 + 100) {
      alert(`Please enter a number greater than ${number_1 + 100} inclusive`);
      checkNumber = false;
    }
  }
  playGame(number_1, checkNumber);
}

function playGame(number_1, number_2) {
  const RANDOM = Math.floor(Math.random() * ((number_2 + 1) - number_1)) + number_1;
  let previousNumber = 0;
  let attemptNumber = 0;
  let checkNumber = false;
  while(!checkNumber) {
    checkNumber = checkValue(prompt(`Try to guess the hidden number from ${number_1} to ${number_2} inclusive`));
    if(checkNumber === 'cancel') {
      return;
    }
    if(checkNumber && checkNumber < number_1 || checkNumber > number_2) {
      alert(`Please enter a number greater than ${number_1} inclusive and less than ${number_2} inclusive`);
      checkNumber = false;
    }
    if(checkNumber) {
      checkNumber = guessNumber(checkNumber);
    }
  }

  function guessNumber(selectedNumber) {
    if(selectedNumber === RANDOM && attemptNumber === 0) {
      alert('Great! It’s like you knew the number');
      return true;
    } else if(selectedNumber !== RANDOM && attemptNumber === 0) {
      alert('Cold');
      previousNumber = selectedNumber;
      attemptNumber++;
      return false;
    } else if(selectedNumber === RANDOM && attemptNumber !== 0) {
      alert(`You did it in ${attemptNumber} attempts. Congratulations!`);
      return true;
    } else if(selectedNumber === RANDOM - 1 || selectedNumber === RANDOM + 1) {
      alert('You’re almost there');
      previousNumber = selectedNumber;
      attemptNumber++;
      return false;
    } else {
      let comparisonSelectedNumber = RANDOM - selectedNumber;
      let comparisonPreviousNumber = RANDOM - previousNumber;
      if(comparisonSelectedNumber < 0) {
        comparisonSelectedNumber *= -1;
      }  
      if(comparisonPreviousNumber < 0) {
        comparisonPreviousNumber *= -1;
      }
      if(comparisonSelectedNumber <= comparisonPreviousNumber) {
        alert('Warmer');
        previousNumber = selectedNumber;
        attemptNumber++;
        return false;
      } else {
        alert('Colder');
        previousNumber = selectedNumber;
        attemptNumber++;
        return false;
      }
    }
  }
}

getFirstNumber();