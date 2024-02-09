import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearch } from "../../Context/SearchContext";

const HeaderWeather = () => {
  /*   const { latitude, longitude, cityName } = useSearch(); */
  const [dailyForecast, setDailyForecast] = useState(null);
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [error, setError] = useState("");

  const latitude = "52.5200";
  const longitude = "13.4050";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&current_weather=true`
        );

        console.log(response);
        if (response.data) {
          setDailyForecast(response.data.daily);
          setCurrentTemperature(response.data.current_weather.temperature);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to load weather data. Please try again later.");
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!dailyForecast || currentTemperature == null) {
    return <div className="text-center">Loading weather data...</div>;
  }

  const fiveDayForecast = dailyForecast.time.slice(0, 5).map((date, index) => ({
    date,
    maxTemp: dailyForecast.temperature_2m_max[index],
    minTemp: dailyForecast.temperature_2m_min[index],
  }));
  return (
    <div className="max-w-md mx-auto mb-5">
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b border-teal-200">
          <p className="text-center text-teal-100">
            Current Temperature: {currentTemperature}°C
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {fiveDayForecast.length > 0 && (
            <li className="px-4 py-3 flex justify-between items-center bg-white bg-opacity-25">
              <span className="text-sm text-gray-300">
                Max:{" "}
                <span className="font-medium text-white">
                  {fiveDayForecast[0].maxTemp}°C
                </span>
                , Min:{" "}
                <span className="font-medium text-white">
                  {fiveDayForecast[0].minTemp}°C
                </span>
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HeaderWeather;
