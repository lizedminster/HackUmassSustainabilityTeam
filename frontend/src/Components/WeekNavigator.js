import React, { useState, useEffect } from "react";

// Helper: get ISO week number
const getWeekNumber = (date) => {
  const d = new Date(date);
  const oneJan = new Date(d.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
};

const WeekNavigator = ({ data, onWeekChange }) => {
  // Find all weeks in the data
  const weeks = Array.from(new Set(data.map((d) => getWeekNumber(d.date)))).sort(
    (a, b) => a - b
  );

  const [currentWeekIndex, setCurrentWeekIndex] = useState(weeks.length - 1);

  useEffect(() => {
    onWeekChange(weeks[currentWeekIndex]);
  }, [currentWeekIndex, weeks, onWeekChange]);

  const handlePrev = () => setCurrentWeekIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setCurrentWeekIndex((prev) => Math.min(prev + 1, weeks.length - 1));

  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
      <button onClick={handlePrev} disabled={currentWeekIndex === 0}>
        &lt; Previous
      </button>
      <span style={{ fontWeight: "bold" }}>Week {weeks[currentWeekIndex]}</span>
      <button onClick={handleNext} disabled={currentWeekIndex === weeks.length - 1}>
        Next &gt;
      </button>
    </div>
  );
};

export default WeekNavigator;
