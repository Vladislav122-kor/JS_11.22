function getFirstNumber(number_1) {

  if (number_1 === '' || number_1 === null || number_1.includes(' ')) {
    alert('Please enter only positive numbers');
    getFirstNumber(prompt('Enter any positive number'));
    return;
  }

  if (number_1.length > 1) {
    if (number_1.startsWith('0')) {
      alert('Please enter only positive numbers');
      getFirstNumber(prompt('Enter any positive number'));
      return;
    }
  }

  // converting variable to type number and make additional validations
  number_1 = Number(number_1);

  if (Number.isNaN(number_1) || number_1 < 0) {
    alert('Please enter only positive numbers');
    getFirstNumber(prompt('Enter any positive number'));
    return;
  }

  getSecondNumber(number_1, prompt('Enter a number 100 more than the first number'));
}



function getSecondNumber(number_1, number_2) {

  if (number_2 === '' || number_2 === null || number_2.includes(' ')) {
    alert('Please enter only positive numbers');
    getSecondNumber(number_1, prompt('Enter a number 100 more than the first number'));
    return;
  }

  if (number_2.length > 1) {
    if (number_2.startsWith('0')) {
      alert('Please enter only positive numbers');
      getSecondNumber(number_1, prompt('Enter a number 100 more than the first number'));
      return;
    }
  }

  // converting variable to type number and make additional validations
  number_2 = Number(number_2);

  if (Number.isNaN(number_2) || number_2 < 0) {
    alert('Please enter only positive numbers');
    getSecondNumber(number_1, prompt('Enter a number 100 more than the first number'));
    return;
  }

  if (number_2 < number_1 + 100) {
    alert(`Please enter a number greater than ${number_1 + 100}`);
    getSecondNumber(number_1, prompt('Enter a number 100 more than the first number'));
    return;
  }

  playGame(number_1, number_2);
}



function playGame(number_1, number_2) {
  
  const RANDOM = Math.floor(Math.random() * ((number_2 + 1) - number_1)) + number_1;
  let previousNumber = 0;
  let attemptNumber = 0;



  function guessNumber(selectedNumber) {

    if (selectedNumber === '' || selectedNumber === null || selectedNumber.includes(' ')) {
      alert('Please enter only positive numbers');
      guessNumber(prompt(`Try to guess the hidden number from ${number_1} to ${number_2} inclusive`));
      return;
    }
  
    if (selectedNumber.length > 1) {
      if (selectedNumber.startsWith('0')) {
        alert('Please enter only positive numbers');
        guessNumber(prompt(`Try to guess the hidden number from ${number_1} to ${number_2} inclusive`));
        return;
      }
    }
  
    // converting variable to type number and make additional validations
    selectedNumber = Number(selectedNumber);
  
    if (Number.isNaN(selectedNumber) || selectedNumber < 0) {
      alert('Please enter only positive numbers');
      guessNumber(prompt(`Try to guess the hidden number from ${number_1} to ${number_2} inclusive`));
      return;
    }
  
    if (selectedNumber < number_1 || selectedNumber > number_2) {
      alert(`Please enter a number greater than ${number_1} inclusive and less than ${number_2} inclusive`);
      guessNumber(prompt(`Try to guess the hidden number from ${number_1} to ${number_2} inclusive`));
      return;
    }

    // compare selected number with the hidden
    if (selectedNumber === RANDOM && attemptNumber === 0) {

      alert('Great! It’s like you knew the number');
      return;

    } else if (selectedNumber !== RANDOM && attemptNumber === 0) {

      alert('Cold');
      previousNumber = selectedNumber;
      attemptNumber++;
      guessNumber(prompt(`Try to guess the hidden number from ${number_1} to ${number_2} inclusive`));
      return;

    } else if (selectedNumber === RANDOM && attemptNumber !== 0) {

      alert(`You did it in ${attemptNumber} attempts. Congratulations!`);

    } else if (selectedNumber === RANDOM - 1 || selectedNumber === RANDOM + 1) {

      alert('You’re almost there');
      previousNumber = selectedNumber;
      attemptNumber++;
      guessNumber(prompt(`Try to guess the hidden number from ${number_1} to ${number_2} inclusive`));
      return;

    } else {

      let comparisonSelectedNumber = RANDOM - selectedNumber;
      let comparisonPreviousNumber = RANDOM - previousNumber;

      if (comparisonSelectedNumber < 0) {
        comparisonSelectedNumber *= -1;
      }  
      
      if (comparisonPreviousNumber < 0) {
        comparisonPreviousNumber *= -1;
      }

      if (comparisonSelectedNumber <= comparisonPreviousNumber) {

        alert('Warmer');
        previousNumber = selectedNumber;
        attemptNumber++;
        guessNumber(prompt(`Try to guess the hidden number from ${number_1} to ${number_2} inclusive`));
        return;

      } else {

        alert('Colder');
        previousNumber = selectedNumber;
        attemptNumber++;
        guessNumber(prompt(`Try to guess the hidden number from ${number_1} to ${number_2} inclusive`));
        return;
        
      }
    }
  }

  guessNumber(prompt(`Try to guess the hidden number from ${number_1} to ${number_2} inclusive`));
}

getFirstNumber(prompt('Enter any positive number'));