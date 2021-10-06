import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid } from "@material-ui/core";

import useStyles from "./styles.js";

import Geocode from "react-geocode";
import NDVIChart from "../../components/Charts/NDVI_Chart";
import WeatherChart from "../../components/WeatherChart/WeatherChart";
import PolygonTable from "../../components/PolygonsTable/PolygonsTable";

import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

export default function Statistics(props) {
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
  const [polygonId, setPolygonId] = useState("61599fe9a81b76539f681074");

  useEffect(() => {
    console.log("Calling UseEffect");
    getNDVI();
  }, []);

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
    console.log("Retrived data from child");
    console.log(value);
  };

  const getNDVI = () => {
    console.log("Calling the graph data");
    (async () => {
      const rawResponse = await fetch(
        `https://api.agromonitoring.com/agro/1.0/ndvi/history?polyid=${polygonId}&start=${fromDateUNIX}&end=${toDateUNIX}&appid=b22d00c2f91807b86822083ead929d76`,
      );
      const data = await rawResponse.json();
      setNDVI_data(data);
    })();
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <PolygonTable onChange={handleChange} value={polygonId} />
      </Grid>
      <Grid item md={12}>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              label="From"
              variant="inline"
              format="dd/MM/yyyy"
              value={fromDate}
              onChange={handleFromDateChange}
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              label="To"
              variant="inline"
              format="dd/MM/yyyy"
              value={toDate}
              onChange={handleToDateChange}
              maxDate={new Date()}
            />
          </MuiPickersUtilsProvider>
        </div>
        <Button onClick={getNDVI} variant="contained" color="primary">
          Get NDVI
        </Button>
        {NDVI_data.length > 0 && <NDVIChart data={NDVI_data} />}
        <WeatherChart />
      </Grid>
    </Grid>
  );
}
