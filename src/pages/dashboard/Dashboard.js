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
import PolygonTable from "../../components/PolygonsTable/PolygonsTable";

import Button from "@material-ui/core/Button";

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
  const [zoom, setZoom] = useState(13);
  const [roundedArea, setroundedArea] = useState(0);
  const [location, setLocation] = useState({
    latitude: 73,
    longitude: 32,
  });
  const [city, setCity] = useState("");
  const [polygon, setPolygon] = useState({});
  // const [fromDate, setfromDate] = useState(new Date());
  // const [toDate, settoDate] = useState(new Date());
  // const [fromDateUNIX, setfromDateUNIX] = useState(0);
  // const [toDateUNIX, settoDateUNIX] = useState(0);
  const [polygonName, setpolygonName] = useState("");
  const [polygonId, setPolygonId] = useState();
  const [polygonCreatedAt, setPolygonCreatedAt] = useState();
  // const [NDVI_data, setNDVI_data] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    getCity();
  }, [location.latitude, location.longitude]);

  const getCity = () => {
    return Geocode.fromLatLng(location.latitude, location.longitude).then(
      (response) => {
        let city;
        for (
          let i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            let j = 0;
            j < response.results[0].address_components[i].types.length;
            j++
          ) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              default:
                break;
            }
          }
        }
        setCity(city);
      },
      (error) => {
        console.error(error);
      },
    );
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
      speed: 0.6, // make the flying slow
      curve: 1,
    });
  };

  function updateArea(e) {
    const data = draw.current.getAll();
    const polygonData = turf.polygon(data.features[0].geometry.coordinates, {
      name: { polygonName },
    });

    setPolygon(polygonData);

    if (data.features.length > 0) {
      const area = turf.area(data);
      setroundedArea(Math.round(area * 100) / 100 / 10000);
    } else {
      if (e.type !== "draw.delete") alert("Click the map to draw a polygon.");
    }
  }

  const createPolygon = () => {
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
      console.log("processing polygon data");
      setPolygonId(content.id);
      console.log("Id: ", content.id);
      console.log("Created_at: ", content.created_at);
      const unixTimestamp = content.created_at;
      var date = new Date(unixTimestamp * 1000);
      const standard_date =
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
      console.log("Standard Date: ", standard_date);
      setPolygonCreatedAt(standard_date);

      console.log("Called after computation");
      console.log("Polygon created at Standard Date: ", standard_date);
      console.log("Polygon id: ", content.id);
      fetch("http://localhost:5005/polygons/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          polygon_id: content.id,
          name: polygonName,
          created_at: standard_date,
          area: roundedArea,
        }),
      }).then((res) => {
        const rs = res.json();
        console.log(rs);
      });
      // const ProcessingData = () => {
      //   console.log("processing polygon data");
      //   setPolygonId(content.id);
      //   console.log("Id: ", content.id);
      //   console.log("Created_at: ", content.created_at);
      //   const unixTimestamp = content.created_at;
      //   var date = new Date(unixTimestamp * 1000);
      //   const standard_date =
      //     date.getDate() +
      //     "-" +
      //     (date.getMonth() + 1) +
      //     "-" +
      //     date.getFullYear();
      //   console.log("Standard Date: ", standard_date);
      //   setPolygonCreatedAt(standard_date);
      // };
      // async function myFunc() {
      //   // Await for the promise to resolve
      //   await new Promise((resolve) => {
      //     setTimeout(() => {
      //       resolve(AddPolygonsToJSON());
      //     }, 5000);
      //   });
      //   // Once the promise gets resolved continue on
      //   console.log("Done");
      // }

      // myFunc();
    })();
  };

  // const AddPolygonsToJSON = () => {
  //   console.log("Called after computation");
  //   console.log("Polygon created at Standard Date: ", polygonCreatedAt);
  //   console.log("Polygon id: ", polygonId);
  //   fetch("http://localhost:5005/polygons/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       polygon_id: polygonId,
  //       name: polygonName,
  //       created_at: polygonCreatedAt,
  //       area: roundedArea,
  //     }),
  //   }).then((res) => {
  //     const rs = res.json();
  //     console.log(rs);
  //   });
  // };

  const handlePolygonNameChange = (e) => {
    setpolygonName(e.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
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
            <p>Click the map to draw a polygon.</p>
            <div> {roundedArea} ha</div>
          </div>
          <div ref={mapContainer} className={classes.map_container} />
        </Grid>

        <Button onClick={showMyLocation} variant="contained" color="primary">
          Locate Me
        </Button>
      </Grid>
      <Grid item xs={12} md={5}>
        <WeatherWidget city={city} />
      </Grid>
      <Grid item md={12}>
        <TextField
          id="outlined-basic"
          label="Enter polygon name"
          variant="outlined"
          value={polygonName}
          onChange={handlePolygonNameChange}
        />
        <Button onClick={createPolygon} variant="contained" color="primary">
          Create polygon
        </Button>
      </Grid>
      <Grid item md={12}>
        <PolygonTable />
      </Grid>
    </Grid>
  );
}
