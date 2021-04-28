import { useState } from "react";

const useValidity = (validationDataFunction) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [inputIsTouched, setInputIsTouched] = useState(false);

  const valueIsValid = validationDataFunction(enteredValue);
  const valueIsInvalid = !valueIsValid && inputIsTouched;

  const changeValueHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const blurInputHandler = () => {
    setInputIsTouched(true);
  };

  const reset = () => {
    setInputIsTouched(false);
    setEnteredValue("");
  };

  return {
    enteredValue, // value
    valueIsValid, //value
    valueIsInvalid, //value
    changeValueHandler, //func
    blurInputHandler, // func
    reset,
  };
};

export default useValidity;
