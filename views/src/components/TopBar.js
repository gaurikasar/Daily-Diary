/** @format */

import React, { useEffect, useState } from "react";
import DateTime from "./DateTime";
import axios from "axios";
import Weather from "./Weather";
import "../styles/TopBar.css";
import weather from "../images/Weather/Weather.png";

export function TopBar() {
  const user = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.reload();
  };

  // State
  const [data, setData] = useState([]);

  const getUser = async () => {
    try {
      const url = "http://localhost:3001/auth";
      const { data } = await axios.get(url, { withCredentials: true });
      setData(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      // Weather
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=0dcd57de15dc5818f6f4502b50eb8975`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          console.log(result);
        });
    };
    fetchData();
  }, [lat, long]);

  return (
    <>
      <div className="topBar" data-topbar role="navigation">
        <div>
          <img src={weather} alt="weather" width="50" height="50"></img>
        </div>
        <ul className="title-area">
          <ul className="name">
            <h1 className="Title">
              <b>DAILY DIARY</b>
            </h1>
            <p className="loggedInUser fixed-top">
              <b>Logged In User: {user}</b>
            </p>
            <button className="logOutBtn" onClick={handleLogout}>
              Logout
            </button>
            <div></div>
          </ul>
        </ul>
        <div>
          <div>
            <DateTime></DateTime>{" "}
          </div>
          <div>{typeof data.main != "undefined" ? <Weather weatherData={data} /> : <div></div>}</div>
        </div>
      </div>
    </>
  );
}
export default TopBar;
