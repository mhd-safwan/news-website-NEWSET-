const mongoose = require("mongoose");

const adminloginSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Adminlogin = mongoose.model("Adminlogin", adminloginSchema);

module.exports = Adminlogin;
