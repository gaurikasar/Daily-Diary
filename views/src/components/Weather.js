import React from "react";
import '../styles/Weather.css';

const Weather = ({weatherData}) => (
   
  <table className="content">
      <tr>
        <td><b>Location: {weatherData.name}</b></td>
        <td><b>Temperature: {(weatherData.main.temp).toFixed(1)} &deg;C</b></td>
      </tr>
      <tr>
        <td><b>Weather: {weatherData.weather[0].main}</b></td>
        <td><b>Humidity: {weatherData.main.humidity} %</b></td>
      </tr>
      <tr>
        <td ><b>Feels-like: {(weatherData.main.feels_like).toFixed(1)} &deg;C</b></td>
        <td ><b>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</b></td>
      </tr>
      <tr>
        <td ><b>Description: {weatherData.weather[0].description}</b></td>
        <td ><b>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</b></td>
      </tr>
    </table>
);

export default Weather;