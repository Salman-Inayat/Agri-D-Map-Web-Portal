import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@material-ui/core";

const WebcamCapture = (props) => {
  const [image, setImage] = useState("");
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user",
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    props.handleImage(imageSrc);
  });

  const retake = () => {
    setImage("");
    props.handleImagePresent(false);
  };

  return (
    <div className="webcam-container">
      <div className="webcam-img">
        {image === "" ? (
          <Webcam
            audio={false}
            height={300}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={250}
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={image} alt="img" />
        )}
      </div>
      <div>
        {image !== "" ? (
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              retake();
            }}
            className="webcam-btn"
          >
            Retake Image
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="webcam-btn"
          >
            Capture
          </Button>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;