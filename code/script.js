'use strict';

const userNameEl = document.querySelector('.username');
const emailEl = document.querySelector('.email');
const passwordEl = document.querySelector('.password');
const password2El = document.querySelector('.password2');

const allInputEl = document.querySelectorAll('input');
const allFormControlEl = document.querySelectorAll('.form-control');
const submitBtn = document.querySelector('button');

// --------Code function --------

// contain className has specific length check
const specificElements = ['username', 'password'];
// contain [at least length] -- same index with above code
const specificLength = [3, 6];

const correctField = function (indexFormControl) {
  allFormControlEl[indexFormControl].classList.add('correct');
  allFormControlEl[indexFormControl].classList.remove('wrong');
};
const wrongField = function (indexFormControl) {
  allFormControlEl[indexFormControl].classList.add('wrong');
  allFormControlEl[indexFormControl].classList.remove('correct');
};

const checkRequired = function () {
  // check input field for [no empty]
  for (const [i, inputText] of allInputEl.entries()) {
    // inputText = DOM element <input>
    // i = input index = formControl index
    if (inputText.value.length === 0) wrongField(i);
    else {
      // --- Combine function checkSpecificLength() ---

      // check <input> whether in array specificElements
      // loop specificClass then check each element with classList
      for (const [iSpecific, specificClass] of specificElements.entries()) {
        // iSpecific = index specificLengthELement = index specificLength -- to return the specificLength to compare length

        // if not contain in specificClass -> normalElement -> Correct
        if (!inputText.classList.contains(specificClass)) correctField(i);
        // continue | < specificLength -> Wrong
        else if (inputText.value.length < specificLength[iSpecific]) {
          wrongField(i);
          // [break] 'userName' keep loop until specificLength[end]
          break;
        }
        // else -> >= specificLEngth -> Correct
        else correctField(i);
      }
    }
  }
  checkEmailSymbol();
  checkSimilar();
};

const checkSimilar = function () {
  let indexPassword2;
  for (const [i, element] of allInputEl.entries()) {
    if (element.classList.contains('password2')) indexPassword2 = i;
  }
  if (passwordEl.value.length > 0) {
    if (passwordEl.value === password2El.value) correctField(indexPassword2);
    else
      document.querySelector('.password2-small').innerHTML =
        'Passwords do not match';
  } else wrongField(indexPassword2);
};

const checkEmailSymbol = function () {
  // 1.
  let count = 0;
  let atPosition;
  let indexEmail;

  // return indexEmail to use 2 functions later
  for (const [i, element] of allInputEl.entries()) {
    if (element.classList.contains('email')) indexEmail = i;
  }

  // checkAtsymbol
  for (const char of emailEl.value) {
    if (char === '@') count++;
  }

  if (count === 1 && emailEl.value.indexOf('@') !== 0) {
    atPosition = emailEl.value.indexOf('@');
    // checkPeriodSymbol
    const periodPosition = emailEl.value.lastIndexOf('.');
    if (
      // 1. between @ + string + "."
      // 2. Not the final character
      periodPosition > atPosition + 1 &&
      periodPosition < emailEl.value.length - 1
    )
      correctField(indexEmail);
  } else wrongField(indexEmail);
};

submitBtn.addEventListener('click', checkRequired);
