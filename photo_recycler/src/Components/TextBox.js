import React, { useState } from 'react';

function TextBox() {
  const [inputValue, setInputValue] = useState('');

  const handleTextChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleTextChange}
      />
    </div>
  );
}

export default TextBox;