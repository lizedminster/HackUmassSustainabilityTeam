import React, { useState } from "react";
import './HexColorPicker.css';

const HexColorPicker = ({ label = "Select Color", defaultColor = "#154118", onChange }) => {
  const [color, setColor] = useState(defaultColor);
  const [inputValue, setInputValue] = useState(defaultColor);

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setInputValue(newColor);
    if (onChange) onChange(newColor);
  };

  const handleInputChange = (e) => {
    const val = e.target.value.trim();
    setInputValue(val);

    if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(val)) {
      setColor(val);
      if (onChange) onChange(val);
    }
  };

  return (
    <div className="color-picker-wrapper">
      <label className="color-picker-label">{label}:</label>

      <input
        type="color"
        value={color}
        onChange={(e) => handleColorChange(e.target.value)}
        className="color-picker-input"
      />

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        maxLength={7}
        className="color-picker-text"
      />

      <div
        className="color-picker-preview"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export default HexColorPicker;
