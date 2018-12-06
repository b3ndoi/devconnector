const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name)? data.name : '';
    data.email = !isEmpty(data.email)? data.email : '';
    data.password = !isEmpty(data.password)? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm)? data.password_confirm : '';

    if(!Validator.isLength(data.name, {min: 2, max: 30})){
        errors.name = 'Name must be 2 and 30 characters';
    }

    if(Validator.isEmpty(data.name)){
        errors.name = 'Name field is required';
    }

    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'password field is required';
    }
    if(!Validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = 'Password must be 6 and 30 characters';
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = 'password2 field is required';
    }
    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = 'Password must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}