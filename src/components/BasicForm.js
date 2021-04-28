import useValidity from "../hooks/useValidity";

const BasicForm = (props) => {
  const namesValidation = (value) => value.trim() !== "";
  const emailValidationRules = (value) => {
    const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailValidation.test(String(value).toLowerCase());
  };

  const {
    enteredValue: enteredName,
    valueIsValid: nameIsValid,
    valueIsInvalid: nameIsInvalid,
    changeValueHandler: setEnteredName,
    blurInputHandler: setNameIsTouched,
    reset: nameReset,
  } = useValidity(namesValidation);

  const {
    enteredValue: enteredLastName,
    valueIsValid: lastNameIsValid,
    valueIsInvalid: lastNameIsInvalid,
    changeValueHandler: setEnteredLastName,
    blurInputHandler: setLastNameIsTouched,
    reset: lastNameReset,
  } = useValidity(namesValidation);

  const {
    enteredValue: enteredEmail,
    valueIsValid: emailIsValid,
    valueIsInvalid: emailIsInvalid,
    changeValueHandler: setEnteredEmail,
    blurInputHandler: setEmailIsTouched,
    reset: emailReset,
  } = useValidity(emailValidationRules);

  let formIsValid = false;
  if (nameIsValid && emailIsValid && lastNameIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (nameIsInvalid || emailIsInvalid || lastNameIsInvalid) return;

    console.log(enteredName);
    console.log(enteredLastName);
    console.log(enteredEmail);

    nameReset();
    lastNameReset();
    emailReset();
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={`form-control ${nameIsInvalid && "invalid"}`}>
          <label htmlFor="lastName">First Name</label>
          <input
            type="text"
            id="lastName"
            onChange={setEnteredName}
            onBlur={setNameIsTouched}
            value={enteredName}
          />
          {nameIsInvalid && (
            <p className="error-text">Please enter a valid name.</p>
          )}
        </div>
        <div className={`form-control ${lastNameIsInvalid && "invalid"}`}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onChange={setEnteredLastName}
            onBlur={setLastNameIsTouched}
            value={enteredLastName}
          />
          {lastNameIsInvalid && (
            <p className="error-text">Please enter a valid name.</p>
          )}
        </div>
      </div>
      <div className={`form-control ${emailIsInvalid && "invalid"}`}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={setEnteredEmail}
          onBlur={setEmailIsTouched}
          value={enteredEmail}
        />
        {emailIsInvalid && (
          <p className="error-text">Please enter a valid email.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
