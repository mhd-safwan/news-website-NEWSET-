const mongoose = require("mongoose");

const userloginSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Userlogin = mongoose.model("Userlogin", userloginSchema);

module.exports = Userlogin;
