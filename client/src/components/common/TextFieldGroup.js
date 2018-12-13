import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
const TextFieldGroup = ({
    name, placeholder, value, label, error, info, type, onChange, disabled
}) =>  {
  return (
    <div className="form-group">
    <input 
    type={type}
    value = {value}  
    onChange={onChange}  
    disabled={disabled}
    className={classnames("form-control form-control-lg", {
        'is-invalid': error
        }) }
    placeholder={placeholder} 
    name={name }
    />
    {info && (<div className="form-text text-muted">{info}</div>)}
    {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  )
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    error: PropTypes.string,
    info: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
}
TextFieldGroup.defaultProps ={
    type: 'text'
}
export default TextFieldGroup