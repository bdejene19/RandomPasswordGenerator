
/**
 * Pseudocode:
 * 
 * Click generate random password => get series of promps
 * Prompt user for password criteria
 * Ask for min password length
 * Ask max password length
 * Will have boolean values for lowercase
 * 
 * Ask for character types
 * confirm if user wants lowercase, uppercase, numeric, and/or special characters
 * 
 * Validate user input => should have at least one character type
 * Generate password
 * Display on screen
 * 
 * 
 */

let pswdConditions = {
  passwordLength: 0,
  lowerCaseIncluded: undefined,
  upperCaseIncluded: undefined,
  numbersIncluded: undefined,
  specialCharactersIncluded: undefined,
}
// helper functions
// ask user for pswd length => handles  incorrect input
const setPasswordLimit = () => {
  let pswdLengthLimit = prompt('Choose a password length between 8-128: ')

  // recall function if input is not valid
  if (pswdLengthLimit < 8 || pswdLengthLimit > 128) {
    setPasswordLimit();
  } else {
    // set pswdConditions passwordLength property to user input
    pswdConditions.passwordLength = pswdLengthLimit;
  }
}


/**
 * setCharacterTypes => asks for user character type inputs and validates
 * dynamically store user input into pswdConditions object
 */

const setCharacterTypes = () => {
  // 
  let includeLower = confirm('Include lowercase?') ? pswdConditions.lowerCaseIncluded = true : pswdConditions.lowerCaseIncluded = false;
  let includeUpper = confirm('Include uppercase?') ? pswdConditions.upperCaseIncluded = true : pswdConditions.upperCaseIncluded = false;
  let includeNumeric = confirm('Include numeric values?') ? pswdConditions.numbersIncluded = true : pswdConditions.numbersIncluded = false;
  let includeSpecial = confirm('Include special characters?') ? pswdConditions.specialCharactersIncluded = true : pswdConditions.specialCharactersIncluded = false;

  // if no character type chosen => recall function => i.e. ask for character types again
  // otherwise, stores user input in pswdConditions object in the lines above
  if (!includeLower && !includeUpper && !includeNumeric && !includeSpecial) {
    setCharacterTypes();
  } 

}

// generate random password => done after all conditions set and validation has occured
const generatePassword = () => {
  let alphabetLower = 'abcdefghijklmnopqrstuvwxyz';
  let alphabetUpper = alphabetLower.toUpperCase();
  let numbers = '1234567890';
  let specialCharacters = `/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/`;

  let totalPotentialCharacter = "";

  Object.keys(pswdConditions).map((key, index) => {
    if (pswdConditions[key] === true) {
      if (index === 1) {
        totalPotentialCharacter = totalPotentialCharacter.concat(alphabetLower);
      } else if (index === 2) {
        totalPotentialCharacter = totalPotentialCharacter.concat(alphabetUpper);
      } else if (index === 3) {
        totalPotentialCharacter = totalPotentialCharacter.concat(numbers);
      } else {
        totalPotentialCharacter = totalPotentialCharacter.concat(specialCharacters)
      }
    }
  })


  let randomPassword = "";
  for (let count = 0; count < pswdConditions.passwordLength; count++) {
    let randomizedIndex = Math.floor(Math.random() * totalPotentialCharacter.length);

    randomPassword += totalPotentialCharacter[randomizedIndex]
  }

  return randomPassword;
}

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  // var password = generatePassword();
  var passwordText = document.querySelector("#password");

  setPasswordLimit();
  setCharacterTypes();

  let password = generatePassword();
 
  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

