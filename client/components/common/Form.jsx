import React, { useState, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Joi from '@hapi/joi';

/*
Default validation functions wil be used when custom
functions are not defined on props. Default settings
require Joi.
*/

const defaultFunctions = {
  /*
  Relies on schema from child class compared against value from
  input field. Input field name will match property from state data.
  Validates single propery for handleChange.
  */
  validateProperty: (input, joiSchema) => {
    const { name, value } = input;
    const fieldObj = { [name]: value };
    const fieldSchema = Joi.object({ [name]: joiSchema[name] });
    const { error } = fieldSchema.validate(fieldObj);

    // Will be set to state in handleChange
    return error ? error.message : null;
  },

  /*
  Validates entire input for handleSubmit verifying that the data is fit
  for fetch
  */
  validateInput: (data, joiSchema) => {
    const joiOptions = { abortEarly: false }; // Don't quit on first error
    const { error } = joiSchema.validate(data, joiOptions); // must match childClass schema name
    if (!error) return null;

    /*
    If we're here, we won't be sending a fetch request we'll be setting up notifications
    For client. This is all contingent on Joi returns (details array of error Objs)
    */
    const newStateErrorObj = error.details.reduce((stateErr, errObj) => {
      const { path: fieldName, message } = errObj; // Joi path is array
      stateErr[fieldName[0]] = message;
      return stateErr;
    }, {});
    return newStateErrorObj;
  },
};

/*
If using customized validateInput and validateProperty
they must return an error object if errors and null if not

validateProperty will need to take an eventObj parameter from the
built in handleChange function.

validateInput will need to take a data property that will be filled
with the form's state by the built in handleSubmit function
*/

const Form = ({
  doSubmit,
  initialState,
  classString,
  errorClassString,
  propertySchemaObj,
  formSchema,
  validateProperty,
  validateInput,
  children,
  checkErrorsOnSubmitOnly,
}) => {
  // Passing an initial state of empty strings prevents changing children
  // from uncontrolled components to controlled components. Each input will have
  // a name. That name will become a property in the state object and should be
  // matched in the initial state "schema"
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    if (!checkErrorsOnSubmitOnly) {
      const newErrors = { ...errors };
      const errorMessage = validateProperty(input, propertySchemaObj); // returns null if no errors
      if (errorMessage) newErrors[input.name] = errorMessage;
      else delete newErrors[input.name];
      setErrors(newErrors);
    }

    // Update State with new values
    const newData = { ...data };
    if (input.type === 'checkbox') {
      newData[input.name] = input.checked;
    } else {
      newData[input.name] = input.value;
    }

    setData(newData);
  };

  const handleSubmit = (eventObj) => {
    // prevent auto render of page
    eventObj.preventDefault();

    // Check for errors in entire form. If so prevent submit
    const formErrors = validateInput(data, formSchema); // returns null if no errors
    const stateErrors = formErrors || {};
    setErrors(stateErrors);
    if (formErrors) {
      console.log('formErrors', formErrors);
      return;
    }

    // No errors clear to submit via function defined on props and reset form
    // Runs doSubmit passed in via props. doSubmit should be defined in the
    // component that renders the form and contain your submittal logic
    doSubmit(data);
    setData(initialState);
    setErrors({});
  };

  // Passes data managed by form as a whole to indiviual input elements as needed
  // to ensure form works as a unit.
  const addPropsToChildren = (child) => {
    const elementType = child.type.name;

    if (elementType === 'FormInput') {
      return cloneElement(child, {
        onChange: handleChange,
        value: data[child.props.name],
        errorClassString,
        error: errors[child.props.name],
      });
    }

    if (elementType === 'FormSelect') {
      return cloneElement(child, {
        onChange: handleChange,
        value: data[child.props.name],
        errorClassString,
        error: errors[child.props.name],
      });
    }

    if (elementType === 'FormButton') {
      if (!checkErrorsOnSubmitOnly) {
        return cloneElement(child, {
          isDisabled: validateInput(data, formSchema),
        });
      }
    }
    return child;
  };

  return (
    <form className={classString} onSubmit={handleSubmit}>
      {Children.map(children, (child) => addPropsToChildren(child))}
    </form>
  );
};

export default Form;

Form.defaultProps = {
  validateProperty: defaultFunctions.validateProperty,
  validateInput: defaultFunctions.validateInput,
  classString: '',
  errorClassString: '',
  propertySchemaObj: {},
  formSchema: {},
  checkErrorsOnSubmitOnly: true,
};

Form.propTypes = {
  doSubmit: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired,
  classString: PropTypes.string,
  errorClassString: PropTypes.string,
  propertySchemaObj: PropTypes.object,
  formSchema: PropTypes.object,
  validateProperty: PropTypes.func,
  validateInput: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.element, PropTypes.elementType])
    ),
  ]).isRequired,
  checkErrorsOnSubmitOnly: PropTypes.bool,
};
