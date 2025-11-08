import React, { useState, useEffect } from "react";

// Helper: get ISO week number in UTC-safe way
const getWeekNumber = (dateStr) => {
  const d = new Date(dateStr + "T00:00:00Z");
  const oneJan = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((d.getUTCDay() + 1 + numberOfDays) / 7);
};

// Helper: get Sunday of the week from a date string
const getSunday = (dateStr) => {
  const d = new Date(dateStr + "T00:00:00Z");
  if (isNaN(d)) return null;
  const day = d.getUTCDay(); // 0 = Sunday
  const sunday = new Date(d);
  sunday.setUTCDate(d.getUTCDate() - day); // go back to Sunday
  return sunday;
};

const WeekNavigator = ({ data, onWeekChange }) => {
  // Map week number → representative date
  const weekMap = {};
  data.forEach((item) => {
    const weekNum = getWeekNumber(item.date);
    if (!weekMap[weekNum]) weekMap[weekNum] = item.date;
  });

  const weekNumbers = Object.keys(weekMap)
    .map(Number)
    .sort((a, b) => a - b);

  const [currentIndex, setCurrentIndex] = useState(weekNumbers.length - 1);

  useEffect(() => {
    if (weekNumbers.length > 0) {
      onWeekChange(weekNumbers[currentIndex]);
    }
  }, [currentIndex, weekNumbers, onWeekChange]);

  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, weekNumbers.length - 1));

  // Compute week range for display (Sunday → Saturday)
  const representativeDate = weekMap[weekNumbers[currentIndex]];
  const sunday = getSunday(representativeDate);
  const saturday =
    sunday !== null
      ? new Date(sunday.getTime() + 6 * 24 * 60 * 60 * 1000)
      : null;

  const formatDate = (d) => (d ? d.toISOString().split("T")[0] : "");

  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}
    >
      <button onClick={handlePrev} disabled={currentIndex === 0}>
        &lt; Previous
      </button>
      <span style={{ fontWeight: "bold" }}>
        {sunday && saturday
          ? `Week of ${formatDate(sunday)} to ${formatDate(saturday)}`
          : "No week data"}
      </span>
      <button
        onClick={handleNext}
        disabled={currentIndex === weekNumbers.length - 1}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default WeekNavigator;
