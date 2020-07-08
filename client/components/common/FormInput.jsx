import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
  name,
  label,
  onChange,
  error,
  errorClassString,
  containerClassString,
  fieldClassString,
  instructions,
  type,
  value,
  placeholder,
}) => (
  <div className={containerClassString}>
    <label htmlFor={name}>{label}</label>
    <input
      name={name}
      id={name}
      onChange={onChange}
      type={type}
      value={value}
      placeholder={placeholder}
      className={fieldClassString}
    />
    {error && <div className={errorClassString}>{error}</div>}
    {instructions && <div>{instructions}</div>}
  </div>
);

FormInput.defaultProps = {
  instructions: '',
  value: '',
  placeholder: '',
  type: 'text',
  error: null,
  errorClassString: '',
  containerClassString: '',
  fieldClassString: '',
  onChange: (event) => {
    console.log(`Unhandled change in Input ${event.currentTarget.name}`);
  },
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  instructions: PropTypes.string,
  type: PropTypes.oneOf([
    'button',
    'checkbox',
    'date',
    'email',
    'hidden',
    'month',
    'password',
    'radio',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ]),
  value: PropTypes.any,
  placeholder: PropTypes.string,
  error: PropTypes.any,
  errorClassString: PropTypes.string,
  containerClassString: PropTypes.string,
  fieldClassString: PropTypes.string,
};

export default FormInput;
