const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data){
    let errors = {};
    let {text} = data;
    text = !isEmpty(text)? text : '';

    

    if(Validator.isEmpty(text)){
        errors.text = 'Text field is required';
    }
    if(!Validator.isLength(text, {min: 10, max: 300})){
        errors.text = 'Text must be 10 and 300 characters';
    }
    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}