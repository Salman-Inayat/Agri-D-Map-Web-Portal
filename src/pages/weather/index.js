import React, { useState, useEffect, Fragment } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  FormHelperText,
  Card,
  CardContent,
  CircularProgress,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import useStyles from "./styles.js";

const StyledTableCell = withStyles({
  root: {
    color: "#fff",
  },
})(TableCell);

const Weather = () => {
  const classes = useStyles();
  const [polygons, setPolygons] = useState([]);
  const [currentWeather, setCurrentWeather] = useState();
  const [currentSoil, setCurrentSoil] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPolygons();
  }, []);

  const fetchPolygons = () => {
    fetch(
      `${process.env.REACT_APP_AGROMONITORING_API_URL}polygons?appid=${process.env.REACT_APP_AGROMONITORING_API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        data.map((item, i) => {
          const unixTimestamp = data[i].created_at;
          var date = new Date(unixTimestamp * 1000);
          const standard_date =
            date.getDate() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getFullYear();
          data[i].created_at = standard_date;
        });
        setPolygons(data);
        fetchWeather(data[0].center[0], data[0].center[1]);
        fetchSoil(data[0].id);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const fetchWeather = async (lat, lon) => {
    const promise = new Promise((resolve, reject) => {
      fetch(
        `https://api.agromonitoring.com/agro/1.0/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_AGROMONITORING_API_KEY}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setCurrentWeather(data);
        })
        .catch((err) => console.log(err));
    });
    return promise;
  };

  const fetchSoil = async (id) => {
    const promise = new Promise((resolve, reject) => {
      fetch(
        `https://api.agromonitoring.com/agro/1.0/soil?polygon_id=${id}&appid=${process.env.REACT_APP_AGROMONITORING_API_KEY}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setCurrentSoil(data);
          resolve(data);
        })
        .catch((err) => console.log(err));
    });
    return promise;
  };

  const handleFieldClick = async (field) => {
    setLoading(true);
    const promise1 = new Promise((resolve, reject) => {
      fetchWeather(field.center[0], field.center[1]);
      resolve();
    });
    const promise2 = new Promise((resolve, reject) => {
      fetchSoil(field.id);
      resolve();
    });
    await Promise.all([promise1, promise2]);
    setLoading(false);
  };

  const convertKelinToCelcius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <Card
            style={{
              backgroundColor: "#3F4257",
              borderRadius: "10px",
            }}
          >
            <CardContent>
              <TableContainer
                // component={Card}
                style={{ backgroundColor: "transparent", color: "white" }}
                sx={{
                  ".MuiTableBody-root": {
                    backgroundColor: "transparent",
                    color: "white",
                  },
                }}
              >
                <Table
                  sx={{ minWidth: 500, color: "#fff" }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell component="th" scope="row">
                        Fields
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {polygons.map((item, i) => {
                      return (
                        <TableRow
                          key={i}
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => handleFieldClick(item)}
                        >
                          <StyledTableCell component="th" scope="row">
                            {item.name}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {item.area.toFixed(2)}ha
                          </StyledTableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card
            style={{
              backgroundColor: "#3F4257",
              borderRadius: "10px",
              color: "white",
            }}
          >
            <CardContent>
              {loading ? (
                <CircularProgress />
              ) : (
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <Typography variant="body1" component="h2">
                      Current
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "1.7rem",
                        fontWeight: "400",
                      }}
                    >
                      Weather
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <img
                      src={`https://openweathermap.org/img/w/${currentWeather?.weather[0]?.icon}.png`}
                      alt="weather"
                      style={{
                        width: "80px",
                        height: "80px",
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      style={{ fontSize: "2.5rem", fontWeight: "400" }}
                      align="center"
                    >
                      {convertKelinToCelcius(currentWeather?.main?.temp)}°
                    </Typography>
                    <Typography
                      style={{ fontSize: "1rem", fontWeight: "400" }}
                      align="center"
                    >
                      {currentWeather?.weather[0]?.description}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card
            style={{
              backgroundColor: "#3F4257",
              borderRadius: "10px",
              color: "white",
            }}
          >
            <CardContent>
              {loading ? (
                <CircularProgress />
              ) : (
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <Typography variant="body1" component="h2">
                      Current
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "1.7rem",
                        fontWeight: "400",
                      }}
                    >
                      Soil data
                    </Typography>
                  </Grid>
                  <Grid item md={12}>
                    <Grid container spacing={3}>
                      <Grid item md={6}>
                        <Typography className={classes.soilLeftText}>
                          Temperature at the surface
                        </Typography>
                      </Grid>
                      <Grid item md={6}>
                        <Typography className={classes.soilRightText}>
                          {convertKelinToCelcius(currentSoil?.t0)}°C
                        </Typography>
                      </Grid>
                      <Grid item md={6}>
                        <Typography className={classes.soilLeftText}>
                          Temperature at the depth of 10cm
                        </Typography>
                      </Grid>
                      <Grid item md={6}>
                        <Typography className={classes.soilRightText}>
                          {convertKelinToCelcius(currentSoil?.t10)}°C
                        </Typography>
                      </Grid>
                      <Grid item md={6}>
                        <Typography className={classes.soilLeftText}>
                          Soil moisture
                        </Typography>
                      </Grid>
                      <Grid item md={6}>
                        <Typography className={classes.soilRightText}>
                          {(currentSoil?.moisture * 100).toFixed(2)}%
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Weather;
