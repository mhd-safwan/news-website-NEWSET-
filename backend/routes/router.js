const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { loginProcess, logout } = require("../controllers/AdminLog");
const {
  newscreat,
  shownews,
  single,
  addnews,
  deletenews,
 sort,
 searchNews
} = require("../controllers/News");
const { Reglogin, Userlog,Userlogout } = require("../controllers/Userlog");

const router = express.Router();

const uploadDir = path.join(__dirname, "../public/images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
router.get("/serch",searchNews);
router.get("/sort", sort);
router.post("/Userlog", Userlog);
router.post("/reg", Reglogin);
router.post("/login", loginProcess);
router.post("/Userlogout", Userlogout);
router.post("/logout", logout);
router.post("/creat", upload.single("file"), newscreat);
router.get("/admin", shownews);
router.get("/single/:id", single);
router.put("/addnews/:id", upload.single('img'), addnews);
router.delete("/delete/:id", deletenews);

module.exports = router;
