import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

// import useStyles from "./styles.js";

import NDVIChart from "../../components/Charts/NDVI_Chart";
// import WeatherChart from "../../components/WeatherChart/WeatherChart";
import PolygonTable from "../../components/PolygonsTable/PolygonsTable";
import NDVILayers from "./NDVI_Layers";
import useStyles from "./styles.js";

import Typography from "@material-ui/core/Typography";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

export default function Statistics(props) {
  var classes = useStyles();

  const initialToDate = new Date();
  const UNIX_initialToDate = initialToDate.getTime() / 1000;

  const priorDate = new Date();
  priorDate.setDate(priorDate.getDate() - 30);

  const UNIX_initialFromDate = priorDate.getTime() / 1000;

  const initialDate = new Date();
  initialDate.setDate(initialDate.getDate() - 30);

  const [fromDate, setfromDate] = useState(initialDate);
  const [toDate, settoDate] = useState(new Date());
  const [fromDateUNIX, setfromDateUNIX] = useState(UNIX_initialFromDate);
  const [toDateUNIX, settoDateUNIX] = useState(UNIX_initialToDate);
  const [NDVI_data, setNDVI_data] = useState([]);
  const [polygonId, setPolygonId] = useState("");
  const [firstPolygonId, setFirstPolygonId] = useState("");
  const [mountComponent, setMountComponent] = useState(false);

  useEffect(() => {
    let firstPolygon;
    fetch(
      `${process.env.REACT_APP_AGROMONITORING_API_URL}polygons?appid=${process.env.REACT_APP_AGROMONITORING_API_KEY}`,
    )
      .then((response) => response.json())
      .then((data) => {
        firstPolygon = data[0].id;
        setPolygonId(firstPolygon);
        setFirstPolygonId(firstPolygon);
        setTimeout(() => {
          setMountComponent(true);
        }, 1000);
      });

    setTimeout(() => {
      console.log(firstPolygon);
      fetch(
        `${process.env.REACT_APP_AGROMONITORING_API_URL}ndvi/history?polyid=${firstPolygon}&start=${fromDateUNIX}&end=${toDateUNIX}&appid=${process.env.REACT_APP_AGROMONITORING_API_KEY}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setNDVI_data(data);
        });
    }, 1000);
  }, []);

  useEffect(() => {
    getNDVI();
  }, [toDateUNIX, fromDateUNIX, polygonId]);

  const handleFromDateChange = (date) => {
    setfromDate(date);
    const UNIX_dateFrom = date.getTime() / 1000;
    setfromDateUNIX(UNIX_dateFrom);
    setTimeout(() => {
      getNDVI();
    }, 500);
  };

  const handleToDateChange = (date) => {
    settoDate(date);
    const UNIX_dateTo = date.getTime() / 1000;
    settoDateUNIX(UNIX_dateTo);
    setTimeout(() => {
      getNDVI();
    }, 500);
  };

  const handleChange = (value) => {
    setPolygonId(value);
    setTimeout(() => {
      setMountComponent(true);
    }, 1000);
  };

  const getNDVI = () => {
    (async () => {
      const rawResponse = await fetch(
        `${process.env.REACT_APP_AGROMONITORING_API_URL}ndvi/history?polyid=${polygonId}&start=${fromDateUNIX}&end=${toDateUNIX}&appid=${process.env.REACT_APP_AGROMONITORING_API_KEY}`,
      );
      const data = await rawResponse.json();
      setNDVI_data(data);
    })();
  };

  return (
    <Grid container spacing={4} className={classes.container}>
      <Grid item md={12} xs={12}>
        <PolygonTable onChange={handleChange} value={polygonId} />
      </Grid>
      <Grid container className={classes.NDVIContainer}>
        <Grid item md={5}>
          <Typography variant="h5" style={{ color: "#fff" }}>
            Historical
          </Typography>
          <Typography variant="h1" style={{ color: "#fff" }}>
            NDVI
          </Typography>
        </Grid>
        <Grid item md={3}></Grid>
        <Grid
          item
          md={4}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              style={{ margin: "5px", width: "130px", color: "white" }}
              label="From"
              variant="inline"
              openTo="date"
              views={["year", "month", "date"]}
              format="dd/MM/yyyy"
              value={fromDate}
              onChange={handleFromDateChange}
              disableFuture
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              label="To"
              style={{ margin: "5px", width: "130px", color: "white" }}
              variant="inline"
              openTo="date"
              views={["year", "month", "date"]}
              format="dd/MM/yyyy"
              value={toDate}
              onChange={handleToDateChange}
              maxDate={new Date()}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item md={12} xs={12}>
          {" "}
          {NDVI_data.length > 0 && <NDVIChart data={NDVI_data} />}
        </Grid>
      </Grid>

      <Grid item md={12} xs={12}>
        {mountComponent && (
          <NDVILayers
            fromDateUNIX={fromDateUNIX}
            toDateUNIX={toDateUNIX}
            polygonId={polygonId}
          />
        )}
      </Grid>
      {/* {mountComponent && (
          <WeatherChart firstPolygon={firstPolygonId} polygonId={polygonId} />
        )} */}
    </Grid>
  );
}
