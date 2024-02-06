import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherComponent = ({ latitude, longitude, cityName }) => {
  const [dailyForecast, setDailyForecast] = useState(null);
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&current_weather=true`
        );

        if (response.data) {
          setDailyForecast(response.data.daily);
          setCurrentTemperature(response.data.current_weather.temperature);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Failed to load weather data. Please try again later.');
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
          <h2 className="text-2xl font-bold text-center text-white">{cityName} - 5-Day Weather Forecast</h2>
          <p className="text-center text-teal-100">Current Temperature: {currentTemperature}°C</p>
        </div>
        <ul className="divide-y divide-gray-200">
          {fiveDayForecast.map((day, index) => (
            <li key={index} className="px-4 py-3 flex justify-between items-center bg-white bg-opacity-25">
              <span className="font-medium text-gray-800">{day.date}</span>
              <span className="text-sm text-gray-300">
                Max: <span className="font-medium text-white">{day.maxTemp}°C</span>, 
                Min: <span className="font-medium text-white">{day.minTemp}°C</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherComponent;
