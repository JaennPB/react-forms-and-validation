import useValidity from "../hooks/useValidity";

const SimpleInput = (props) => {
  const {
    enteredValue: enteredName,
    valueIsValid: nameIsValid,
    valueIsInvalid: nameIsInvalid,
    changeValueHandler: setEnteredName,
    blurInputHandler: setNameIsTouched,
    reset: nameReset,
  } = useValidity((value) => value.trim() !== "");

  const {
    enteredValue: enteredEmail,
    valueIsValid: emailIsValid,
    valueIsInvalid: emailIsInvalid,
    changeValueHandler: setEnteredEmail,
    blurInputHandler: setEmailIsTouched,
    reset: emailReset,
  } = useValidity((value) => {
    const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailValidation.test(String(value).toLowerCase());
  });

  let formIsValid = false;
  if (nameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!nameIsValid || !emailIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);
    // reseting to a brand new form
    nameReset();
    emailReset();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={`form-control ${nameIsInvalid && "invalid"}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={setEnteredName}
          onBlur={setNameIsTouched}
          value={enteredName}
        />
        {nameIsInvalid && (
          <p className="error-text">Please enter a valid name.</p>
        )}
      </div>
      <div className={`form-control ${emailIsInvalid && "invalid"}`}>
        <label htmlFor="email">Your email</label>
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

export default SimpleInput;
