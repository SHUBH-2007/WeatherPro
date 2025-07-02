"use client";
import getForecast from "@/utils/forecastweather";
import { useEffect, useState } from "react";

const ForeCastCard = ({ city }) => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (!city) return;
    getForecast(city)
      .then(data => setForecast(data.forecast.forecastday))
      .catch(console.error);
  }, [city]); // now it updates whenever the city changes

  // ✅ guard for forecast not ready yet
  if (!forecast) {
    return <p className="text-white">Loading forecast…</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {forecast.map(day => (
        <div
          key={day.date}
          className="w-40 h-48 p-4 bg-white/20 backdrop-blur-md rounded-xl flex flex-col items-center shadow-lg"
        >
          <p>
            {new Date(day.date).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </p>
          <img src={`https:${day.day.condition.icon}`} alt="icon" />
          <p>{day.day.condition.text}</p>
          <p>
            {day.day.mintemp_c}° / {day.day.maxtemp_c}°
          </p>
        </div>
      ))}
    </div>
  );
};

export default ForeCastCard;
