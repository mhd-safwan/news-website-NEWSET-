const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://safwan:9562098119@cluster0.suqlbug.mongodb.net/admin-side"
    );
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = db;
