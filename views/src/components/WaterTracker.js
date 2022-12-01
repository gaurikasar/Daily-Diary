/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import water_image from "../images/WaterTracker/water_icon.png";
import empty_glass_icon from "../images/WaterTracker/empty_glass_icon.svg";
import full_glass_icon from "../images/WaterTracker/full_glass_icon.svg";
import "../styles/WaterTracker.css";
import Popup from "reactjs-popup";

function WaterTracker() {
  const [emptyGlassCount, setEmptyGlassCount] = useState(8);
  const [emptyGlassArray, setEmptyGlassArray] = useState([]);

  const [fullGlassCount, setFullGlassCount] = useState(0);
  const [fullGlassArray, setfullGlassArray] = useState([]);
  const [glassLimitReached, setGlassLimitReached] = useState(false);

  const updateWaterGlassCountData = async () => {
    const userEmail = localStorage.getItem("email");
    const reqUserData = { email: userEmail, waterGlassCount: fullGlassCount + 1 };
    const glassCountResult = await axios.post("http://localhost:3001/updateWaterGlassCount", reqUserData);
    if (glassCountResult === null || glassCountResult.status !== 200) {
      console.log("Error updating water tracker details..!!");
    }
  };

  useEffect(() => {
    const fetchWaterGlassCountData = async () => {
      console.log("In fetch");
      const userEmail = localStorage.getItem("email");
      const reqUserData = { email: userEmail };
      const glassCountResult = await axios.post("http://localhost:3001/fetchWaterGlassCount", reqUserData);
      if (glassCountResult !== null && glassCountResult.status === 200) {
        const fullCount = glassCountResult.data.waterGlassCount;
        const emptyCount = 8 - glassCountResult.data.waterGlassCount;
        setFullGlassCount(fullCount);
        setEmptyGlassCount(emptyCount);

        let empGlassesArray = [];
        for (let m = 1; m <= emptyCount; m++) {
          empGlassesArray.push(m);
        }
        setEmptyGlassArray(empGlassesArray);

        let fulGlassesArray = [];
        for (let n = 1; n <= fullCount; n++) {
          fulGlassesArray.push(n);
        }
        setfullGlassArray(fulGlassesArray);
      } else {
        console.log("Error fetching water tracker details..!!");
      }
    };

    fetchWaterGlassCountData();
  }, []);

  function drankWater() {
    setEmptyGlassCount(emptyGlassCount - 1);
    let empGlassesArray = [];
    for (let m = 1; m <= emptyGlassCount - 1; m++) {
      empGlassesArray.push(m);
    }
    setEmptyGlassArray(empGlassesArray);

    setFullGlassCount(fullGlassCount + 1);
    let fulGlassesArray = [];
    for (let n = 1; n <= fullGlassCount + 1; n++) {
      fulGlassesArray.push(n);
    }
    setfullGlassArray(fulGlassesArray);

    if (fullGlassCount === 7 || emptyGlassCount === 0) {
      setGlassLimitReached(true);
    }

    updateWaterGlassCountData();
  }

  return (
    <div className="waterTrackerClass">
      <div className="waterTrackerHeading">
        <h3>
          Water Tracker&nbsp;&nbsp;
          <img src={water_image} alt="water icon" width="30" height="30"></img>
        </h3>
      </div>
      <div className="waterClass">
        Did you drink enough water today?&nbsp;&nbsp;
        {fullGlassArray.map((j) => {
          return <img key={j} src={full_glass_icon} alt="full glass icon" width="30" height="30"></img>;
        })}
        {emptyGlassArray.map((k) => {
          return <img key={k} src={empty_glass_icon} alt="empty glass icon" width="30" height="30"></img>;
        })}
      </div>
      <div className="waterButtonAndPopup">
        {glassLimitReached && (
          <Popup trigger={<button className="waterButtonClass">Yes, I just had a glass of water.</button>} position="top center">
            <div className="waterPopupClass">You are on the way to better health. Keep it up!!</div>
          </Popup>
        )}
        {!glassLimitReached && (
          <button onClick={drankWater} className="waterButtonClass">
            Yes, I just had a glass of water.
          </button>
        )}
      </div>
    </div>
  );
}

export default WaterTracker;
