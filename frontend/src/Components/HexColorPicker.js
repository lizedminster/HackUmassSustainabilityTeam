import React, { useState } from "react";

const HexColorPicker = ({ label = "Select Color", defaultColor = "#8884d8", onChange }) => {
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

    // validate hex format
    if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(val)) {
      setColor(val);
      if (onChange) onChange(val);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "10px 0" }}>
      <label style={{ fontWeight: "bold" }}>{label}:</label>

      {/* Native color input */}
      <input
        type="color"
        value={color}
        onChange={(e) => handleColorChange(e.target.value)}
        style={{ width: 40, height: 40, border: "none", cursor: "pointer" }}
      />

      {/* Hex text input */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        maxLength={7}
        style={{
          width: 100,
          padding: "6px",
          borderRadius: 6,
          border: "1px solid #ccc",
          fontFamily: "monospace",
          textTransform: "uppercase",
        }}
      />

      {/* Preview swatch */}
      <div
        style={{
          width: 40,
          height: 40,
          backgroundColor: color,
          border: "1px solid #ccc",
          borderRadius: 6,
        }}
      />
    </div>
  );
};

export default HexColorPicker;
