import React, { useRef, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

// styles
import useStyles from "./styles.js";
import "react-dropzone-uploader/dist/styles.css";
// import Audio_Player from "../../components/Audio_Player/Audio_Player";

import Geocode from "react-geocode";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import * as turf from "@turf/turf";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import WeatherWidget from "../../components/Weather_Widget/WeatherWidget";
import DashboardPolygonTable from "../../components/PolygonsTable/DashboardPolygonTable";

import Button from "@material-ui/core/Button";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AddIcon from "@material-ui/icons/Add";

import TextField from "@material-ui/core/TextField";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FsbWFuLWluYXlhdCIsImEiOiJja3U3OGNzZzQzNHVlMm9xaG9sZmtoOXI3In0.rF7GhHsrNL8YPMUCLCI92A";

export default function Dashboard(props) {
  var classes = useStyles();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const draw = useRef(null);
  const [lng, setLng] = useState(73.1386);
  const [lat, setLat] = useState(33.6762);
  const [zoom, setZoom] = useState(8);
  const [roundedArea, setroundedArea] = useState(0);
  const [location, setLocation] = useState({
    latitude: 32,
    longitude: 73,
  });
  const [polygon, setPolygon] = useState({});

  const [polygonName, setpolygonName] = useState("");
  const [fieldHelperText, setFieldHelperText] = useState("");

  useEffect(() => {
    fetch("https://geolocation-db.com/json/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      });
  }, []);

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
    map.current.addControl(new mapboxgl.NavigationControl());

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
      zoom: 13,
      speed: 2, // make the flying slow
      curve: 1,
    });
  };

  function updateArea(e) {
    const data = draw.current.getAll();

    if (data.features.length > 0) {
      const area = turf.area(data);
      setroundedArea(Math.round(area * 100) / 100 / 10000);
      setFieldHelperText("");

      const polygonData = turf.polygon(data.features[0].geometry.coordinates, {
        name: { polygonName },
      });

      setPolygon(polygonData);
    } else {
      setroundedArea(0);
      if (e.type !== "draw.delete") alert("Click the map to draw a polygon.");
    }
  }

  const createPolygon = () => {
    if (roundedArea > 250) {
      setFieldHelperText("Area cannot exceed 200ha");
    } else {
      (async () => {
        const rawResponse = await fetch(
          "http://api.agromonitoring.com/agro/1.0/polygons?appid=b22d00c2f91807b86822083ead929d76",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ geo_json: polygon, name: polygonName }),
          },
        );
        const content = await rawResponse.json();
        console.log(content);
      })();
      setpolygonName("");
    }
  };

  const handlePolygonNameChange = (e) => {
    setpolygonName(e.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        md={7}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid item md={12} style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: "2",
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "5px",
            }}
          >
            <p style={{ margin: "0px" }}>Click the map to draw a polygon.</p>{" "}
            <p style={{ margin: "0px" }}>
              Note: Area cannot be greater than 200ha
            </p>
            <p style={{ margin: "0px" }}>
              {" "}
              {roundedArea > 0 ? `${roundedArea.toFixed(2)} ha` : ""}
            </p>
          </div>
          <div ref={mapContainer} className={classes.map_container} />
        </Grid>
        <Button
          onClick={showMyLocation}
          variant="contained"
          color="primary"
          size="small"
          className={classes.locateButton}
          startIcon={<LocationOnIcon />}
        >
          Locate Me
        </Button>
      </Grid>

      <Grid item xs={12} md={5}>
        <WeatherWidget location={location} />
      </Grid>

      <Grid item md={7} xs={12} m={20} className={classes.addPolygonContainer}>
        <TextField
          id="outlined-basic"
          label="Enter polygon name"
          variant="outlined"
          value={polygonName}
          onChange={handlePolygonNameChange}
          className={classes.addPolygonInput}
          helperText={fieldHelperText}
          FormHelperTextProps={{
            classes: {
              root: classes.root,
            },
          }}
        />
        <Button
          onClick={createPolygon}
          variant="contained"
          color="primary"
          className={classes.createPolygonButon}
          // startIcon={<AddIcon />}
          disabled={roundedArea > 0 ? false : true}
        >
          Create field
        </Button>
      </Grid>
      <Grid item md={12} style={{ marginTop: "50px" }}>
        <DashboardPolygonTable />
      </Grid>
    </Grid>
  );
}
