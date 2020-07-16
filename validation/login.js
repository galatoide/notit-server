const validator = require('validator');
const isEmpty = require('is-empty');

validateLoginInput = data =>{
  let errors = {};

  let { email, password } = data;
  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';
  
  if(validator.isEmpty(email)) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(email)) {
    errors.email = 'Enter a valid email id';
  }

  if(validator.isEmpty(password)) {
    errors.password = 'Password is required';
  } else if (!validator.isLength(password, {min:6, max:30})) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateLoginInput;