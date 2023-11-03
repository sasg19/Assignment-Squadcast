import React, { useState, useEffect, useMemo } from "react";
import sampleData from "./data.json";
import { userData } from "./types";
import "./App.css";

interface MentionsProps {
  onChange: (text: string) => void;
  value: string;
}

const MentionInput: React.FC<MentionsProps> = ({ onChange, value }) => {
  const [mentionText, setMentionText] = useState<string>("");
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>("");

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      setDebouncedInputValue(value);
    }, 500);

    return () => {
      clearTimeout(debounceSearch);
    };
  }, [value]);

  const filteredOptions = useMemo(() => {
    return sampleData.filter((option) =>
      option.first_name.toLowerCase().includes(mentionText.toLowerCase())
    );
  }, [mentionText]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const mentionStartIndex = inputValue.lastIndexOf("@");

    if (mentionStartIndex !== -1) {
      setMentionText(inputValue.substring(mentionStartIndex + 1));
    } else {
      setMentionText("");
    }

    onChange(inputValue);
  };

  const handleSelectClick = (mention: userData) => {
    const updatedValue = value.replace(
      `@${mentionText}`,
      `@${mention.first_name} ${mention.last_name}`
    );
    setMentionText("");
    onChange(updatedValue);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="mention"
      />

      {mentionText && filteredOptions.length > 0 && (
        <div>
          <ul className="list-items">
            {filteredOptions.map((option) => (
              <li key={option.id} onClick={() => handleSelectClick(option)}>
                {option.first_name + " " + option.last_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MentionInput;
