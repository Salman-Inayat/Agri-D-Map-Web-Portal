import React, { useRef, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

// styles
import Dropzone from "react-dropzone-uploader";
import useStyles from "./styles.js";
import "react-dropzone-uploader/dist/styles.css";
// import Audio_Player from "../../components/Audio_Player/Audio_Player";
// import ReactWeather, { useOpenWeather } from "react-open-weather";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FsbWFuLWluYXlhdCIsImEiOiJja3U3OGNzZzQzNHVlMm9xaG9sZmtoOXI3In0.rF7GhHsrNL8YPMUCLCI92A";
// const ReactWeather, { useOpenWeather } = require("react-open-weather");

export default function Dashboard(props) {
  var classes = useStyles();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.5946);
  const [lat, setLat] = useState(30.7333);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLng(position.coords.longitude);
      setLat(position.coords.latitude);
    });
    console.log("Initial Values: ", lng);
  });

  useEffect(() => {
    if (map.current) return; // initialize map only once
    console.log("Updated value: ", lng);
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  // const [imageFile, setimageFile] = useState("");

  // const getUploadParams = ({ file }) => {
  //   // setimageFile("");
  //   const body = new FormData();
  //   body.append("dataFiles", file);
  //   return { url: "http://localhost:3000/image-segment", body };
  // };

  // const handleChangeStatus = ({ xhr }) => {
  //   if (xhr) {
  //     xhr.onreadystatechange = () => {
  //       if (xhr.readyState === 4) {
  //         const result = JSON.parse(xhr.response);
  //         console.log(result);
  //         const new_image_file = result.filename.slice(0, -3) + "png";
  //         // setimageFile(new_image_file);
  //       }
  //     };
  //   }
  // };

  // const { wdata, wisLoading, werrorMessage } = useOpenWeather({
  //   key: "d7d19ea93799aae622120c139a522048",
  //   lat: "48.137154",
  //   lon: "11.576124",
  //   lang: "en",
  //   unit: "metric", // values are (metric, standard, imperial)
  // });

  // const customStyles = {
  //   fontFamily: "Helvetica, sans-serif",
  //   gradientStart: "#0181C2",
  //   gradientMid: "#04A7F9",
  //   gradientEnd: "#4BC4F7",
  //   locationFontColor: "#FFF",
  //   todayTempFontColor: "#FFF",
  //   todayDateFontColor: "#B5DEF4",
  //   todayRangeFontColor: "#B5DEF4",
  //   todayDescFontColor: "#B5DEF4",
  //   todayInfoFontColor: "#B5DEF4",
  //   todayIconColor: "#FFF",
  //   forecastBackgroundColor: "#FFF",
  //   forecastSeparatorColor: "#DDD",
  //   forecastDateColor: "#777",
  //   forecastDescColor: "#777",
  //   forecastRangeColor: "#777",
  //   forecastIconColor: "#4BC4F7",
  // };

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
      {/* <Grid item md={6} className={classes.image_picker_grid}>
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
      </Grid> */}
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
      <Grid item xs={12} md={6}>
        <Grid item md={12} style={{ position: "relative" }}>
          {/* <ReactWeather
            forecast="today"
            isLoading={wisLoading}
            errorMessage={werrorMessage}
            data={wdata}
            lang="en"
            locationLabel="Munich"
            unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
            showForecast
            theme={customStyles}
          />{" "} */}
          <div className={classes.sidebar}>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <div ref={mapContainer} className={classes.map_container} />
        </Grid>
      </Grid>
    </Grid>
  );
}
