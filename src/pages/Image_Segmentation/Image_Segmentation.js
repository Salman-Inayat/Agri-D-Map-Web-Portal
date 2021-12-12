import React from "react";
import ImagePicker from "../../components/Image_Picker/Image_Picker";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import WebcamCapture from "../../components/Webcam/Webcam.js";
import { Button } from "@material-ui/core";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Audio from "../../components/Audio_Player/Audio_Player";
import ResultTab from "../../components/Tab/Tab";

function Image_Segmentation() {
  const classes = useStyles();
  const [image, setImage] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const [resultImage, setResultImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [imagePresent, setImagePresent] = React.useState(false);
  const [isResult, setIsResult] = React.useState(false);
  const [resultAudio, setResultAudio] = React.useState();

  const handleImage = (result) => {
    const slug = result.split("base64,").pop();
    setImage(slug);
    setImagePresent(true);
  };

  const handleImagePresent = (result) => {
    setImagePresent(result);
  };

  const handleSubmit = () => {
    setResult("");
    setResultImage("");
    setIsResult(false);
    if (imagePresent) {
      setLoading(true);
      axios
        .post(
          "http://localhost:5000/image-segment",
          {
            image: image,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          },
        )
        .then((res) => {
          const response = res.data;
          var responseArray = response.split(/(\s+)/);
          setResult(responseArray[2]);
          setResultImage(responseArray[0]);
          setLoading(false);
          setIsResult(true);
          switch (responseArray[2]) {
            case "Healthy":
              setResultAudio("/healthy_english.mp3");
              break;
            case "Resistant":
              setResultAudio("/resistant_english.mp3");
              break;
            case "Susceptible":
              setResultAudio("/susceptible_english.mp3");
              break;
            default:
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <LoadingOverlay active={loading} spinner text="Processing the image">
        <Grid container spacing={3} className={classes.grid_container}>
          <Grid item md={5} sm={12} className={classes.ind_grid}>
            <ImagePicker
              handleImage={handleImage}
              handleImagePresent={handleImagePresent}
            />
          </Grid>
          <Grid item md={1} sm={12} className={classes.ind_grid}>
            <h3>OR</h3>
          </Grid>
          <Grid item md={6} sm={12} className={classes.ind_grid}>
            <WebcamCapture
              handleImage={handleImage}
              handleImagePresent={handleImagePresent}
            />
          </Grid>

          <Grid item md={12} sm={12}>
            <Button
              variant="contained"
              disabled={imagePresent ? false : true}
              color="primary"
              className={classes.button}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
          {isResult && (
            <Grid item md={12} sm={12}>
              <div className={classes.result_container}>
                <div>
                  <ResultTab audio={resultAudio} />
                </div>
                <div className={classes.result_image}>
                  <img
                    src={`http://localhost:5000/${resultImage}`}
                    alt="result"
                    className={classes.result_image_img}
                  />
                </div>
              </div>
            </Grid>
          )}
        </Grid>
      </LoadingOverlay>
    </div>
  );
}

export default Image_Segmentation;
