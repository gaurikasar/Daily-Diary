/** @format */

import axios from "axios";
import { useEffect } from "react";
import { SplitPane } from "react-multi-split-pane";
import "../styles/Main.css";
import TopBar from "./TopBar";
import LeftsideBar from "./LeftsideBar";
import EventBar from "./NewsBar";
import RightsideBar from "./RightsideBar";
import NearbyEvents from "./NearbyEvents";
import Exercise from "./Exercise";
import FunActivities from "./FunActivities";
import WaterTracker from "./WaterTracker";
import full_glass_icon from "../images/WaterTracker/full_glass_icon.svg";
import leg_exercise_1 from "../images/Exercise/leg_exercise_1.gif";

function Main() {
  const deviceWidth = window.innerWidth;
  const mobileMaxWidth = 768;

  const resetWaterTracker = async (currTimeObj) => {
    const resetResult = await axios.post("http://localhost:3001/resetWaterGlassCount", currTimeObj);
    if (resetResult === null && resetResult.status !== 200) {
      console.log("Error resetting water tracker..!!");
    }
  };
  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    const currentTime = new Date().toLocaleString();
    if (currentTime.includes("12:01")) {
      const timeObj = { email: userEmail, currentTimeObj: currentTime };
      resetWaterTracker(timeObj);
    }

    const waterTimeInterval = 60000 * 9;
    const exerciseTimeInterval = 60000 * 10;
    const waterReminderText = "Hey there!! Please drink enough water!";
    const exerciseReminderText = "Hey there!! Try some relaxing exercises!";

    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }

    const waterInterval = setInterval(() => {
      console.log("In water notification");
      const waterOptions = {
        body: waterReminderText,
        icon: full_glass_icon,
      };
      new Notification("Water Reminder", waterOptions);
    }, waterTimeInterval);

    const exerciseInterval = setInterval(() => {
      console.log("In exercise notification");
      const exerciseOptions = {
        body: exerciseReminderText,
        icon: leg_exercise_1,
      };
      new Notification("Exercise Reminder", exerciseOptions);
    }, exerciseTimeInterval);

    return () => {
      clearInterval(waterInterval);
      clearInterval(exerciseInterval);
    };
  }, []);

  return deviceWidth < mobileMaxWidth ? (
    <div className="Main">
      <SplitPane split="horizontal" defaultSizes={[150, 450, 250]} primary="second">
        <TopBar />
        <LeftsideBar />
        <div className="sideActivities">
          <EventBar />
          <NearbyEvents />
          <Exercise />
          <FunActivities />
          <WaterTracker />
        </div>
        <footer>Copyright</footer>
      </SplitPane>
    </div>
  ) : (
    <div className="Main">
      <SplitPane split="horizontal" defaultSizes={[150, 450, 250]} primary="second">
        <TopBar />
        <SplitPane split="vertical" defaultSizes={[155, 230, 150]} className="splitPaneClass">
          <EventBar />
          <LeftsideBar />
          <RightsideBar />
        </SplitPane>
        <SplitPane split="vertical" className="splitPaneClass" defaultSizes={[155, 230, 150]}>
          <Exercise />
          <FunActivities />
          <WaterTracker />
        </SplitPane>
        <div className="Mainfooter">
          <footer>
            Copyright &copy; @About: <a href="https://github.com/deepika-pdx">Deepika Velapure</a>&nbsp; &nbsp;{" "}
            <a href="https://github.com/vidyav2">Vidya Jayashankar</a>&nbsp; &nbsp;
            <a href="https://github.com/gaurikasar">Gauri Kasar</a>&nbsp; &nbsp;
          </footer>
        </div>
      </SplitPane>
    </div>
  );
}

export default Main;
