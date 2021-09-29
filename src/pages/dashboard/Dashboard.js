import React, { useState } from "react";
import { Grid } from "@material-ui/core";

// styles
import Dropzone from "react-dropzone-uploader";
import useStyles from "./styles.js";
import "react-dropzone-uploader/dist/styles.css";
import Audio_Player from "../../components/Audio_Player/Audio_Player";
import ReactWeather, { useOpenWeather } from "react-open-weather";

// const ReactWeather, { useOpenWeather } = require("react-open-weather");

export default function Dashboard(props) {
  var classes = useStyles();

  // const [imageFile, setimageFile] = useState("");

  const getUploadParams = ({ file }) => {
    // setimageFile("");
    const body = new FormData();
    body.append("dataFiles", file);
    return { url: "http://localhost:3000/image-segment", body };
  };

  const handleChangeStatus = ({ xhr }) => {
    if (xhr) {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const result = JSON.parse(xhr.response);
          console.log(result);
          const new_image_file = result.filename.slice(0, -3) + "png";
          // setimageFile(new_image_file);
        }
      };
    }
  };

  const { wdata, wisLoading, werrorMessage } = useOpenWeather({
    key: "2bea7a2f6876565bb5c249d66cbb4ae2",
    lat: "48.137154",
    lon: "11.576124",
    lang: "en",
    unit: "metric", // values are (metric, standard, imperial)
  });

  const customStyles = {
    fontFamily: "Helvetica, sans-serif",
    gradientStart: "#0181C2",
    gradientMid: "#04A7F9",
    gradientEnd: "#4BC4F7",
    locationFontColor: "#FFF",
    todayTempFontColor: "#FFF",
    todayDateFontColor: "#B5DEF4",
    todayRangeFontColor: "#B5DEF4",
    todayDescFontColor: "#B5DEF4",
    todayInfoFontColor: "#B5DEF4",
    todayIconColor: "#FFF",
    forecastBackgroundColor: "#FFF",
    forecastSeparatorColor: "#DDD",
    forecastDateColor: "#777",
    forecastDescColor: "#777",
    forecastRangeColor: "#777",
    forecastIconColor: "#4BC4F7",
  };

  return (
    <Grid container spacing={1}>
      {/* <Grid item md={12} sm={12} className={classes.intro_grid}>
        <div className={classes.intro_content_grid}>
          <h2>Wheat Stripe Rust</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor inc id est laborum. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit, sed do eiusmod tempor inc id est
            laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            sed do eiusmod tempor inc id est laborum. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit, sed do eiusmod tempor inc id est
            laborum.
          </p>
        </div>
      </Grid> */}
      <Grid item md={6} className={classes.image_picker_grid}>
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          accept="image/*"
          maxFiles={1}
          multiple={false}
          canCancel={false}
          inputContent="Drop A File"
          styles={{
            dropzone: {
              width: 300,
              height: 150,
              // marginRight: 30,
              border: "3px dashed black",
            },
            dropzoneActive: { borderColor: "green" },
          }}
        />
      </Grid>
      {/* <Grid item md={6} sm={12} m={2} className={classes.results_grid}>
        <Audio_Player />
        <div className={classes.results_container}>
          <h3>Symptoms</h3>
          <ul>
            <li>Tiny, rusty pustules arranged in stripes</li>
            <li>Stem and heads can be affected also</li>
          </ul>
        </div>
      </Grid>
      <Grid item md={12} sm={12}>
        <div className={classes.intro_content_grid}>
          <h2>Remedial Actions</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor inc id est laborum. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit, sed do eiusmod tempor inc id est
            laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            sed do eiusmod tempor inc id est laborum. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit, sed do eiusmod tempor inc id est
            laborum.
          </p>
        </div>
      </Grid> */}
      <Grid container xs={12} md={6}>
        <Grid item md={12}>
          <h1>Hello</h1>
          <ReactWeather
            isLoading={wisLoading}
            errorMessage={werrorMessage}
            data={wdata}
            lang="en"
            locationLabel="Munich"
            unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
            showForecast
            theme={customStyles}
          />{" "}
        </Grid>
      </Grid>
    </Grid>
  );
}
