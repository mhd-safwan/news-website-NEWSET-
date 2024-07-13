const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { loginProcess } = require("../controllers/AdminLog");
const {
  newscreat,
  shownews,
  single,
  addnews,
  deletenews,
} = require("../controllers/News");
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

router.post("/login", loginProcess);
router.post("/creat", upload.single("file"), newscreat);
router.get("/admin", shownews);
router.get("/single/:id", single);
router.put("/addnews/:id", addnews);
router.delete("/delete/:id", deletenews);

module.exports = router;
