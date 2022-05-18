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
import { LinearProgress, Box } from "@material-ui/core";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

export default function Statistics(props) {
  var classes = useStyles();

  const initialToDate = new Date();
  const UNIX_initialToDate = initialToDate.getTime() / 1000;

  const priorDate = new Date();
  priorDate.setDate(priorDate.getDate() - 60);

  const UNIX_initialFromDate = priorDate.getTime() / 1000;

  const initialDate = new Date();
  initialDate.setDate(initialDate.getDate() - 60);

  const [fromDate, setfromDate] = useState(initialDate);
  const [toDate, settoDate] = useState(new Date());
  const [fromDateUNIX, setfromDateUNIX] = useState(UNIX_initialFromDate);
  const [toDateUNIX, settoDateUNIX] = useState(UNIX_initialToDate);
  const [NDVI_data, setNDVI_data] = useState([]);
  const [polygonId, setPolygonId] = useState("");
  const [firstPolygonId, setFirstPolygonId] = useState("");
  const [mountComponent, setMountComponent] = useState(false);
  const [doesPolygonExist, setDoesPolygonExist] = useState(false);
  const [getNDVIFailed, setGetNDVIFailed] = useState();
  const [NDVILoading, setNDVILoading] = useState(false);

  useEffect(() => {
    let firstPolygon;
    fetch(
      `${process.env.REACT_APP_AGROMONITORING_API_URL}polygons?appid=${process.env.REACT_APP_AGROMONITORING_API_KEY}`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setDoesPolygonExist(true);
          firstPolygon = data[0].id;

          setPolygonId(firstPolygon);
          setFirstPolygonId(firstPolygon);
          setTimeout(() => {
            setMountComponent(true);
          }, 1000);
        } else {
          setDoesPolygonExist(false);
          setPolygonId("");
          setFirstPolygonId("");
          setTimeout(() => {
            setMountComponent(true);
          }, 1000);
        }
      });

    setTimeout(() => {
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
    getNDVI(fromDateUNIX, toDateUNIX);
  }, [toDateUNIX, fromDateUNIX, polygonId]);

  const handleFromDateChange = (date) => {
    setfromDate(date);
    const UNIX_dateFrom = date.getTime() / 1000;
    setfromDateUNIX(UNIX_dateFrom);

    getNDVI(UNIX_dateFrom, toDateUNIX);
  };

  const handleToDateChange = (date) => {
    settoDate(date);
    const UNIX_dateTo = date.getTime() / 1000;
    settoDateUNIX(UNIX_dateTo);
    getNDVI(fromDateUNIX, UNIX_dateTo);
  };

  const handleChange = (value) => {
    setNDVI_data([]);
    setPolygonId(value);
    setTimeout(() => {
      setMountComponent(true);
    }, 1000);
  };

  const getNDVI = (fromDateUNIX, toDateUNIX) => {
    setNDVILoading(true);
    (async () => {
      const rawResponse = await fetch(
        `${process.env.REACT_APP_AGROMONITORING_API_URL}ndvi/history?polyid=${polygonId}&start=${fromDateUNIX}&end=${toDateUNIX}&appid=${process.env.REACT_APP_AGROMONITORING_API_KEY}`,
      );

      if (rawResponse.status === 200) {
        const data = await rawResponse.json();

        setNDVI_data(data);
        setGetNDVIFailed(false);
        setNDVILoading(false);
      } else {
        setGetNDVIFailed(true);
        setNDVILoading(false);
      }
    })();
  };

  return (
    <Grid container spacing={4} className={classes.container}>
      <Grid item md={12} xs={12}>
        <PolygonTable onChange={handleChange} value={polygonId} />
      </Grid>
      {doesPolygonExist && (
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
            xs={12}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                className={classes.datePicker}
                label="From"
                variant="inline"
                openTo="date"
                views={["year", "month", "date"]}
                format="dd/MM/yyyy"
                value={fromDate}
                onChange={handleFromDateChange}
                s
                disableFuture
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                className={classes.datePicker}
                label="To"
                variant="inline"
                openTo="date"
                views={["year", "month", "date"]}
                format="dd/MM/yyyy"
                value={toDate}
                onChange={handleToDateChange}
                maxDate={new Date()}
                minDate={fromDate}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={12} xs={12}>
            {" "}
            {NDVI_data.length > 0 ? (
              <NDVIChart data={NDVI_data} />
            ) : (
              <Grid container>
                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "30vh",
                  }}
                >
                  {NDVILoading ? (
                    <>
                      <Typography variant="h5" style={{ color: "#fff" }}>
                        Loading NDVI data...
                      </Typography>
                      <Box sx={{ width: "50%", marginTop: "2rem" }}>
                        <LinearProgress />
                      </Box>
                    </>
                  ) : (
                    <Typography variant="h5" style={{ color: "#fff" }}>
                      No NDVI data available for selected field
                    </Typography>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item md={12} xs={12}>
            {mountComponent &&
              (getNDVIFailed ? (
                <Typography variant="h5" style={{ color: "#fff" }}></Typography>
              ) : (
                <NDVILayers
                  fromDateUNIX={fromDateUNIX}
                  toDateUNIX={toDateUNIX}
                  polygonId={polygonId}
                />
              ))}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
