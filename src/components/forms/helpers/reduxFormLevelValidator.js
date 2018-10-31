// This function can be used as Redux Form's Form Level validator function with ""redux-form-validators"" module's validators.
// This generate redux form's field errors accroding to given "validateOptions" for each field.

/* "validateOptions" should be given in the format of below using ""redux-form-validators"" module.

    Ex: 
        {
          email: [
            required({ message: "Required." }),
            email({ message: "Must be a valid email." })
          ],
          password: [
            required({ message: "Required." }),
            length({ min: 5, message: "Must be at least 5 character." })
          ]
        };

*/

const reduxFormLevelValidator = (validateOptions = {}) => values => {
  const errors = {};
  for (let field in validateOptions) {
    let value = values[field]; // Getting the value in actual input.
    errors[field] = validateOptions[field]
      .map(validateField => {
        return validateField(value, values);
      })
      .find(x => x);
  }
  return errors;
};

export default reduxFormLevelValidator;
