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
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import * as turf from "@turf/turf";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FsbWFuLWluYXlhdCIsImEiOiJja3U3OGNzZzQzNHVlMm9xaG9sZmtoOXI3In0.rF7GhHsrNL8YPMUCLCI92A";
// const ReactWeather, { useOpenWeather } = require("react-open-weather");

const API_KEY = "b22d00c2f91807b86822083ead929d76";
export default function Dashboard(props) {
  var classes = useStyles();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const draw = useRef(null);
  const [lng, setLng] = useState(73.1386);
  const [lat, setLat] = useState(33.6762);
  const [zoom, setZoom] = useState(13.39);
  const [roundedArea, setroundedArea] = useState(0);
  const [location, setLocation] = useState({
    latitude: 34,
    longitude: 45,
  });
  const [weatherData, setweatherData] = useState({});

  useEffect(() => {
    console.log(navigator.geolocation);
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    getList();
  }, []);

  const getList = () => {
    return fetch(
      `https://api.agromonitoring.com/agro/1.0/weather?lat=${location.latitude}=&lon=${location.longitude}&appid=${API_KEY}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setweatherData(data);
        console.log(weatherData);
      });
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/salman-inayat/cku817f1m079d18mqqh70gguw",
      center: [lng, lat],
      zoom: zoom,
    });

    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: "draw_polygon",
    });
    map.current.addControl(draw.current);

    map.current.on("draw.create", updateArea);
    map.current.on("draw.delete", updateArea);
    map.current.on("draw.update", updateArea);
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const showMyLocation = () => {
    if (!map.current) return;
    map.current.flyTo({
      center: [location.longitude, location.latitude],
      essential: true,
    });
  };

  function updateArea(e) {
    const data = draw.current.getAll();
    console.log(data);
    if (data.features.length > 0) {
      const area = turf.area(data);
      // Restrict the area to 2 decimal points.
      setroundedArea(Math.round(area * 100) / 100);
      // rounded_area = Math.round(area * 100) / 100;
    } else {
      if (e.type !== "draw.delete") alert("Click the map to draw a polygon.");
    }
  }

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
          {/* <div className={classes.sidebar}>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div> */}
          <div className="calculation-box">
            <p>Click the map to draw a polygon.</p>
            <div> {roundedArea} square meters</div>
          </div>
          <div ref={mapContainer} className={classes.map_container} />
        </Grid>
        <button className="btn btn-primary" onClick={showMyLocation}>
          Locate Me
        </button>
      </Grid>
      {/* <Grid item xs={12} md={6}>
<div>
  <h2>{}</h2>
</div>
      </Grid> */}
    </Grid>
  );
}
