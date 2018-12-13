import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
const SelectFieldGroup = ({
    name,  value,  error, info, onChange, options
}) =>  {
const selectOptions = options.map(option =>(
    <option key={option.label} value={option.value}>{option.label}</option>
))
  return (
    <div className="form-group">
    <select 
    
    onChange={onChange}  
    className={classnames("form-control form-control-lg", {
        'is-invalid': error
        }) }
    value={value}
    name={name }
    >
    {selectOptions}
    </select>
    {info && (<div className="form-text text-muted">{info}</div>)}
    {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  )
}

SelectFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    options: PropTypes.array.isRequired,
    info: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
}
export default SelectFieldGroup