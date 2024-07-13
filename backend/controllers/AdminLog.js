const Adminlogin = require("../models/adminmodel");

module.exports.loginProcess = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Adminlogin.findOne({ username });
    if (!admin || admin.password !== password) {
      return res.status(400).send("Invalid credentials");
    }
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(400).send("Admin login failed");
  }
};
