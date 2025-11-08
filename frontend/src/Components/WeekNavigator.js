import React, { useState, useEffect } from "react";

// Helper: get Sunday of the week from a date string
const getSunday = (dateStr) => {
  const d = new Date(dateStr + "T00:00:00Z");
  if (isNaN(d)) return null;
  const day = d.getUTCDay(); // 0 = Sunday
  const sunday = new Date(d);
  sunday.setUTCDate(d.getUTCDate() - day);
  return sunday;
};

const WeekNavigator = ({ data, onWeekChange }) => {
  // Build set of all Sundays in the data
  const weekSet = new Set();
  data.forEach((item) => {
    const sunday = getSunday(item.date);
    if (sunday) weekSet.add(sunday.toISOString().split("T")[0]);
  });

  const weeks = Array.from(weekSet).sort();

  const [currentIndex, setCurrentIndex] = useState(
    weeks.length > 0 ? weeks.length - 1 : 0
  );

  // Trigger onWeekChange whenever currentIndex changes
  useEffect(() => {
    if (weeks.length > 0) {
      onWeekChange(weeks[currentIndex]);
    } else {
      onWeekChange(null);
    }
  }, [currentIndex, weeks, onWeekChange]);

  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, weeks.length - 1));

  const sunday = weeks[currentIndex] ? new Date(weeks[currentIndex] + "T00:00:00Z") : null;
  const saturday = sunday ? new Date(sunday.getTime() + 6 * 24 * 60 * 60 * 1000) : null;

  const formatDate = (d) => (d ? d.toISOString().split("T")[0] : "");

  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
      <button onClick={handlePrev} disabled={currentIndex === 0 || weeks.length === 0}>
        &lt; Previous
      </button>
      <span style={{ fontWeight: "bold" }}>
        {sunday && saturday
          ? `Week of ${formatDate(sunday)} to ${formatDate(saturday)}`
          : "No week data"}
      </span>
      <button
        onClick={handleNext}
        disabled={currentIndex === weeks.length - 1 || weeks.length === 0}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default WeekNavigator;
