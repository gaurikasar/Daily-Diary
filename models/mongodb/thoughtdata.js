/** @format */

const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
  thought: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const ThoughtData = mongoose.model("ThoughtData", thoughtSchema);

module.exports = { ThoughtData };
