/** @format */
const mongoose = require("mongoose");
const url =
  "mongodb+srv://dailyuser:DailyDairy565@dailydairycluster.oj0wdsh.mongodb.net/DailyDatabase?retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
mongoose.set("debug", true);
mongoose.Promise = Promise;