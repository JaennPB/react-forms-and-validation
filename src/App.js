import { useState } from "react";

import SimpleInput from "./components/SimpleInput";
import BasicForm from "./components/BasicForm";

const App = () => {
  const [switchForm, setSwitchForm] = useState(true);

  const swithFormHandler = () => {
    setSwitchForm(!switchForm);
  };

  return (
    <>
      <div className="header">
        <button onClick={swithFormHandler}>
          {switchForm ? "Switch to simple form" : "Switch to basic form"}
        </button>
        <span>Used custom hooks</span>
      </div>

      <div className="form">{switchForm ? <BasicForm /> : <SimpleInput />}</div>
    </>
  );
};

export default App;
