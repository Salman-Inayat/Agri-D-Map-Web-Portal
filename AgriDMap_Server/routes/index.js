var express = require("express");
var router = express.Router();
const path = require("path");
const multer = require("multer");
var fs = require("fs");
const imageToBase64 = require("image-to-base64");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
var upload = multer({ storage: storage });

// // function to encode file data to base64 encoded string
// function base64_encode(file) {
//   return fs.readFileSync(file, { encoding: "base64" });
//   // return new Buffer(bitmap).toString("base64");
// }

function base64_encode(file) {
  return "data:image/png;base64," + fs.readFileSync(file, "base64");
}

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

  const directoryPath = path.resolve("uploads");

  if (!file) {
    return res.status(400).send({ message: "Please upload a file." });
  }

  return res.send(file);
});

module.exports = router;
