import React, { useState } from "react";
import MentionInput from "./MentionInput";
import "./App.css";
const App = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  return (
    <div className="App">
      <MentionInput onChange={handleInputChange} value={inputValue} />
    </div>
  );
};

export default App;
