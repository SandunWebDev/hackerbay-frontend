import reduxFormLevelValidator from "./reduxFormLevelValidator";
import { required, length } from "redux-form-validators";

describe("Form Helpers - reduxFormLevelValidator()", () => {
  it("Should return just empty error object when executed with no validators passed.", () => {
    const validatorFunctionWithOutValidators = reduxFormLevelValidator();

    expect(
      validatorFunctionWithOutValidators({ name: "Sandun", b: "Age" })
    ).toEqual({});
  });

  it("Should return error object with appopriate errors when valid validators are provided using 'redux-form-validators'.", () => {
    const validateOptions = {
      name: [
        required({ message: "Must have a name." }),
        length({ min: 2, message: "Must be at least 2 characters." })
      ],
      age: [required({ message: "Must have a age." })]
    };

    const validatorFunctionWithValidators = reduxFormLevelValidator(
      validateOptions
    );

    const valuesToValidate = {
      name: "A", // Name is not long enough.
      age: "" // Age is not provided.
    };

    expect(validatorFunctionWithValidators(valuesToValidate)).toEqual({
      name: "Must be at least 2 characters.",
      age: "Must have a age."
    });
  });
});
