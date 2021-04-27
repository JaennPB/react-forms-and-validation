import { useState, useEffect } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const formIsInvalid = !enteredNameIsValid && isTouched;

  useEffect(() => {
    if (enteredNameIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredNameIsValid]);

  const changeNameHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const blurNameHandler = () => {
    setIsTouched(true);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setIsTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);
    setEnteredName("");
    // reseting to a brand new form
    setIsTouched(false);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={`form-control ${formIsInvalid && "invalid"}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={changeNameHandler}
          onBlur={blurNameHandler}
          value={enteredName}
        />
      </div>
      {formIsInvalid && (
        <p className="error-text">Please enter a valid name.</p>
      )}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
