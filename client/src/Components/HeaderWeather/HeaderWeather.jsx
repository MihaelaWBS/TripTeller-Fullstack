import React, { useState, useEffect } from "react";
import axios from "axios";
import weatherIcon from "../../assets/logo.png";
import Lottie from "lottie-react";
import snow_weather from "../../assets/snow_weather.json";
import sunny_weather from "../../assets/sunny_weather.json";
import raining_weather from "../../assets/raining_weather.json";
import fog_weather from "../../assets/fog_weather.json";
import drizzle_weather from "../../assets/fog_weather.json";
import thunderstorm_weather from "../../assets/thunderstorm_weather.json";
import cloudy_weather from "../../assets/cloudy_weather.json";

const HeaderWeather = () => {
  const [weatherCode, setWeatherCode] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [error, setError] = useState("");

  const latitude = "52.5200";
  const longitude = "13.4050";

  const getWeatherAnimation = (weatherCode) => {
    console.log("Weather code", weatherCode);
    switch (weatherCode) {
      case 0: // Clear sky
        return sunny_weather;
      case 1: // Mainly clear
      case 2: // Partly cloudy
      case 3: // Overcast
        return cloudy_weather; // Assuming you have a cloudy animation
      case 45: // Fog
      case 48: // Depositing rime fog
        return fog_weather; // Assuming you have a fog animation
      case 51: // Light drizzle
      case 53: // Moderate drizzle
      case 55: // Dense drizzle
      case 56: // Light freezing drizzle
      case 57: // Dense freezing drizzle
        return drizzle_weather; // Assuming you have a drizzle animation
      case 61: // Light rain
      case 63: // Moderate rain
      case 65: // Heavy rain
      case 66: // Light freezing rain
      case 67: // Heavy freezing rain
      case 80: // Light rain showers
      case 81: // Moderate rain showers
      case 82: // Violent rain showers
        return raining_weather;
      case 71: // Light snowfall
      case 73: // Moderate snowfall
      case 75: // Heavy snowfall
      case 77: // Snow grains
      case 85: // Light snow showers
      case 86: // Heavy snow showers
        return snow_weather;
      case 95: // Slight thunderstorm
      case 96: // Thunderstorm with slight hail
      case 99: // Thunderstorm with heavy hail
        return thunderstorm_weather; // Assuming you have a thunderstorm animation
      default:
        return sunny_weather; // Default animation if the code doesn't match
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&current_weather=true`
        );
        console.log(response.data.current_weather);
        if (response.data) {
          const { temperature, weathercode } = response.data.current_weather;
          const { temperature_2m_max, temperature_2m_min } =
            response.data.daily;
          setCurrentWeather({
            temp: temperature,
            maxTemp: temperature_2m_max[0],
            minTemp: temperature_2m_min[0],
            weatherCode: weathercode, // Use the current weather code
          });
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

  if (!currentWeather) {
    return <div className="text-center">Loading weather data...</div>;
  }

  const weatherAnimation = getWeatherAnimation(currentWeather.weatherCode);

  return (
    <>
      <div className="sm:hidden md:flex">
        <Lottie
          animationData={weatherAnimation}
          loop={true}
          className="w-12 h-12"
        />
        <div className="text-black ml-4">
          <div className="text-lg font-bold">{currentWeather.temp}°C</div>
          <div className="text-sm">
            <span className="font-medium">Max: {currentWeather.maxTemp}°C</span>
            <span className="ml-2 font-medium">
              Min: {currentWeather.minTemp}°C
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderWeather;
