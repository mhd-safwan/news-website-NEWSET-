const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");
const router = require("./routes/router");
const session = require('express-session');
const app = express();
const port = 8000;
db();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: '123456789t5r',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
