var express = require("express");
var router = express.Router();
const path = require("path");
const multer = require("multer");
var fse = require("fs-extra");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "u2net/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

var upload = multer({ storage: storage });

router.get("/", (req, res) => {
  // try {
  //   const folder_to_be_deleted = process.cwd() + "/u2net/output";
  //   fse.emptyDir(folder_to_be_deleted, (err) => {
  //     if (err) return console.error(err);
  //     console.log("success!");
  //   });
  // } catch (err) {
  //   console.log(err);
  // }

  res.send("Hello again");
});

router.post("/image-segment", upload.single("dataFiles"), (req, res, next) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send({ message: "Please upload a file." });
  }

  const { spawn } = require("child_process");

  const python = spawn("python", ["segment.py"]);

  python.on("close", (code) => {
    res.send(file);
    console.log("File name sent");
    console.log(`child process close all stdio with code ${code}`);

    const images_folder = process.cwd() + "/u2net/images";
    const results_folder = process.cwd() + "/u2net/results";
    fse.emptyDir(images_folder, (err) => {
      if (err) return console.error(err);
      console.log("Images folder deleted!");
    });
    fse.emptyDir(results_folder, (err) => {
      if (err) return console.error(err);
      console.log("Results folder deleted!");
    });
  });
});

module.exports = router;
