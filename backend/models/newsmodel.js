const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  img: String,
  date: String,
  title: String,
  des: String,
  story: String,
  category:String
});

const newsModel = mongoose.model("news", newsSchema);
module.exports = newsModel;
