import React, { useState } from "react";
import Display from "./display";
import Buttons from "./buttons";

function App() {
  const [inputedValues, setInputedValues] = useState("");
  let answer;

  try {
    const checkAnswer = inputedValues.replace("%", "*0.01")
    // eslint-disable-next-line
    answer = eval(checkAnswer);
  } catch (error) {
    answer = 0
  }
  
  function takeValue(e) {
    let btnValue = e.target.value.toString();
    
    if (inputedValues === "") {
      if ("1234567890".indexOf(btnValue) !== -1) {
        // If what got passed in is a number:
        return setInputedValues(btnValue);
      } else {
        return;
      }
    } else if (btnValue === "C") {
      answer = 0;
      setInputedValues("");
    } else {
      return btnValue === "="
        ? setInputedValues(answer.toString())
        : setInputedValues((prevVal) => prevVal + btnValue);
    }
  }

  function deleteLastItem() {
    setInputedValues(prev => prev.substring(0, prev.length - 1));
  }

  return (
    <div className="root">
      <Display
        answer={answer}
        value={inputedValues}
        set={setInputedValues}
        delete={deleteLastItem}
      />
      <Buttons onclick={takeValue} />
    </div>
  );
}

export default App;
