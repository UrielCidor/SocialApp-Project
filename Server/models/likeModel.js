const mongoose = require("mongoose");
const Like = mongoose.model(
  "Like",
  new mongoose.Schema({
    user: String,
    post: String,
    time: Date
  })
);
module.exports = Like;