import { useState } from "react";

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

  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsTouched, setEmailIsTouched] = useState(false);

  const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const enteredEmailIsValid = emailValidation.test(
    String(enteredEmail).toLowerCase()
  );
  const enteredEmailIsInvalid = !enteredEmailIsValid && emailIsTouched;

  let formIsValid = false;
  if (nameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const changeEmailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const blurEmailHandler = () => {
    setEmailIsTouched(true);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!nameIsValid || !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);
    // reseting to a brand new form
    nameReset();
    setEnteredEmail("");
    setEmailIsTouched(false);
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
      <div className={`form-control ${enteredEmailIsInvalid && "invalid"}`}>
        <label htmlFor="email">Your email</label>
        <input
          type="email"
          id="email"
          onChange={changeEmailHandler}
          onBlur={blurEmailHandler}
          value={enteredEmail}
        />
        {enteredEmailIsInvalid && (
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
