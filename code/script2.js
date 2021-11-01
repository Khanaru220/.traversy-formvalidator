'use strict';

const usernameEl = document.querySelector('.username');
const emailEl = document.querySelector('.email');
const passwordEl = document.querySelector('.password');
const password2El = document.querySelector('.password2');
const allInputEl = document.querySelector('.form').querySelectorAll('input');

const submitBtn = document.querySelector('button');

// --------------- Event listern -----------
const wrongField = function (input, message) {
  input.parentElement.classList.add('wrong');
  input.parentElement.classList.remove('correct');
  input.parentElement.querySelector('small').innerText = `${capitalInputName(
    input
  )} ${message}`;
};
const correctField = function (input) {
  input.parentElement.classList.add('correct');
  input.parentElement.classList.remove('wrong');
};

const capitalInputName = function (input) {
  return input.className.charAt(0).toUpperCase() + input.className.slice(1);
};

const checkRequired = function () {
  for (const input of allInputEl) {
    if (input.value.length === 0) {
      wrongField(input, 'is required');
    } else {
      // always return correct for "normal element"
      correctField(input);
      // add function we want to check
      checkLength(usernameEl, 3, 16);
      checkEmail(emailEl);
      checkSimilar(passwordEl, password2El);
    }
  }
};

const checkLength = function (input, min, max) {
  input.value.length < min && wrongField(input, `must at least ${min}`);
  input.value.length > max && wrongField(input, `must less than ${max}`);
};

const checkEmail = function (input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  re.test(String(input.value).toLowerCase())
    ? correctField(input)
    : wrongField(input, 'need an email');
};

const checkSimilar = function (input1, input2) {
  input1.value === input2.value
    ? correctField(input2)
    : wrongField(input2, 'not same with previous');
};

submitBtn.addEventListener('click', function () {
  checkRequired();
});
