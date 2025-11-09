import React, { useState } from "react";
import './HexColorPicker.css';

const HexColorPicker = ({ label = "Circle Color", defaultColor = "#0a3f08ff", onChange }) => {
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
    <div className="color-picker">
      <label className="color-picker-label">{label}</label>

      <div className="swatch-container">
        <input
          type="color"
          value={color}
          onChange={(e) => handleColorChange(e.target.value)}
          className="color-swatch"
        />
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        maxLength={7}
        className="color-text-input"
      />

      <p className="selected-color-text">
        Selected color: <span style={{ color }}>{color}</span>
      </p>
    </div>
  );
};

export default HexColorPicker;
