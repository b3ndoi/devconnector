const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){
    let errors = {};
    let {handle, status, skills} = data;
    handle = !isEmpty(handle)? handle : '';
    status = !isEmpty(status)? status : '';
    skills = !isEmpty(skills)? skills : '';

    
    if(!Validator.isLength(handle, {min: 2, max: 40})){
        errors.handle = 'Handle needs to be between 2 and 40 characters'
    }
    if(Validator.isEmpty(status)){
        errors.status = 'Profile status is required'
    }
    if(Validator.isEmpty(skills)){
        errors.skills = 'Profile skills is required'
    }
    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = 'Not a valid URL'
        }
    }
    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)){
            errors.youtube = 'Not a valid URL'
        }
    }
    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)){
            errors.twitter = 'Not a valid URL'
        }
    }
    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)){
            errors.facebook = 'Not a valid URL'
        }
    }
    if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.instagram)){
            errors.instagram = 'Not a valid URL'
        }
    }
    if(!isEmpty(data.linkedin)){
        if(!Validator.isURL(data.linkedin)){
            errors.linkedin = 'Not a valid URL'
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}