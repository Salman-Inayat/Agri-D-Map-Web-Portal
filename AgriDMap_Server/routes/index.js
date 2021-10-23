var express = require("express");
var router = express.Router();
const path = require("path");
const multer = require("multer");
var fse = require("fs-extra");

var segmentation_storage = multer.diskStorage({
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

var segmentation_upload = multer({ storage: segmentation_storage });

var vari_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "vari/input");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

var vari_upload = multer({ storage: vari_storage });

router.get("/", (req, res) => {
  res.send("Hello again");
});

router.post(
  "/image-segment",
  segmentation_upload.single("dataFiles"),
  (req, res, next) => {
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
      const output_folder = process.cwd() + "/output";

      fse.emptyDir(images_folder, (err) => {
        if (err) return console.error(err);
        console.log("Images folder deleted!");
      });

      fse.emptyDir(results_folder, (err) => {
        if (err) return console.error(err);
        console.log("Results folder deleted!");
      });

      fse.readdir(output_folder, (err, files) => {
        if (err) {
          console.log(err);
        }

        files.forEach((f) => {
          const fileDir = path.join(output_folder, f);
          const image_file = file.filename.slice(0, -3) + "png";

          if (f !== image_file) {
            fse.unlinkSync(fileDir);
          }
        });
        console.log("Output folder cleaned");
      });
    });
  },
);

router.post("/vari", vari_upload.single("dataFiles"), (req, res, next) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send({ message: "Please upload a file." });
  }

  const { spawn } = require("child_process");
  console.log("Spawning child process...");
  const python = spawn("python", ["vari.py", file.filename]);

  python.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  python.stderr.on("data", (data) => {
    console.log(data.toString());
  });

  python.on("close", (code) => {
    res.send(file);
    console.log("File name sent");
    console.log(`child process close all stdio with code ${code}`);

    const images_folder = process.cwd() + "/vari/input";
    const output_folder = process.cwd() + "/output";

    fse.emptyDir(images_folder, (err) => {
      if (err) return console.error(err);
      console.log("Input folder cleaned!");
    });

    fse.readdir(output_folder, (err, files) => {
      if (err) {
        console.log(err);
      }

      files.forEach((f) => {
        const fileDir = path.join(output_folder, f);
        const image_file = file.filename.slice(0, -3) + "png";

        if (f !== image_file) {
          fse.unlinkSync(fileDir);
        }
      });
      console.log("Output folder cleaned");
    });
  });
});

module.exports = router;
