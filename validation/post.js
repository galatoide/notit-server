const validator = require('validator');
const isEmpty = require('is-empty');

validatePostInput = data =>{
  let errors = {};

  let {title, body } = data;
  title = !isEmpty(title) ? title: '';
  body = !isEmpty(body) ? body: '';

  if ( validator.isEmpty(title)) {
    errors.title = 'Title is required';
  }

  if ( validator.isEmpty(body)) {
    errors.body = 'Description is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validatePostInput;