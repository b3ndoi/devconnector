const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data){
    let errors = {};
   
    let {school, degree, fieldofstudy, from} = data;
    school = !isEmpty(school)? school : '';
    degree = !isEmpty(degree)? degree : '';
    from = !isEmpty(from)? from : '';
    fieldofstudy = !isEmpty(fieldofstudy)? fieldofstudy : '';

    
    if(Validator.isEmpty(school)){
        errors.school = 'school is required';
    }
    if(Validator.isEmpty(degree)){
        errors.degree = 'degree is required';
    }
    if(Validator.isEmpty(from)){
        errors.from = 'From date is required';
    }
    if(Validator.isEmpty(fieldofstudy)){
        errors.fieldofstudy = 'Field of study is required';
    }
    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}