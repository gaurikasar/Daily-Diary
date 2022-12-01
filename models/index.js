/** @format */
require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3001;
const db = require("./mongodb/DailyDiaryDb");
const bodyParser = require("body-parser");
const axios = require("axios");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const { User } = require("./mongodb/User");
const { ThoughtData } = require("./mongodb/thoughtdata");
const TodoItemRoute = require("./routes/routes");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["4rfv%TGB"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.get("/thoughts", async (req, res) => {
  try {
    const thoughtData = await ThoughtData.find({});
    return res.status(200).json(thoughtData);
  } catch (e) {
    console.log(e);
  }
});
app.get("/latestNews", async (req, res) => {
  try {
    const newsData = await axios.get(
      "https://newsdata.io/api/1/news?apikey=pub_137138d2ad9cfcd1beb7a48f9ea4b14b4fbc2&country=us"
    );
    if (newsData.data != null && newsData.data.status == "success") {
      const newsResults = newsData.data.results;
      let newsExtractedResult = [];
      for (let newsIndex = 0; newsIndex < 10; newsIndex++) {
        newsExtractedResult.push(newsResults[newsIndex]);
      }
      return res.status(200).json(newsExtractedResult);
    }
  } catch (error) {
    const errorJson = { status: error.response.status, statusText: error.response.statusText };
    return res.status(error.response.status).json(errorJson);
  }
});
app.post("/fetchWaterGlassCount", async (req, res) => {
  try {
    const uEmail = req.body.email;
    const userData = await User.findOne({ email: uEmail });
    if (userData !== null) {
      return res.status(200).json(userData);
    } else {
      console.log("Error fetching water glass count..!!");
    }
  } catch (e) {
    console.log(e);
  }
});
app.post("/updateWaterGlassCount", async (req, res) => {
  try {
    const uEmail = req.body.email;
    const glassCount = req.body.waterGlassCount;
    const waterFilter = { email: uEmail };
    const waterUpdate = { waterGlassCount: glassCount };
    const userData = await User.findOneAndUpdate(waterFilter, waterUpdate);
    if (userData !== null) {
      return res.status(200);
    } else {
      console.log("Error updating water glass count..!!");
    }
  } catch (e) {
    console.log(e);
  }
});
app.post("/resetWaterGlassCount", async (req, res) => {
  try {
    const uEmail = req.body.email;
    const waterFilter = { email: uEmail };
    const waterUpdate = { waterGlassCount: 0 };
    const userData = await User.findOneAndUpdate(waterFilter, waterUpdate);
    if (userData !== null) {
      return res.status(200);
    } else {
      console.log("Error resetting water glass count..!!");
    }
  } catch (e) {
    console.log(e);
  }
});
// routes
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", TodoItemRoute);
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
