var express = require("express");
var router = express.Router();
const path = require("path");
const multer = require("multer");
var fs = require("fs");
const imageToBase64 = require("image-to-base64");

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

router.get("/", function (req, res, next) {
  const { spawn } = require("child_process");
  var dataToSend;

  const python = spawn("python", ["script.py"]);

  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
  });

  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(dataToSend);
  });
});

router.post("/image-segment", upload.single("dataFiles"), (req, res, next) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send({ message: "Please upload a file." });
  }

  const { spawn } = require("child_process");

  const python = spawn("python", ["segment.py"]);

  // python.stdout.on("data", function (data) {
  //   console.log("Pipe data from python script ...");
  // });

  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
  });
  setTimeout(() => {
    res.send(file);
  }, 30000);
});

module.exports = router;
