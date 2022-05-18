import React, { useState, useEffect, Fragment } from "react";
import {
  Box,
  Grid,
  Typography,
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
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.scss";

import FeelsLike from "../../assets/FllesLike.svg";
import Cloud from "../../assets/cloud-with-rain.svg";

const StyledTableCellHeading = withStyles({
  root: {
    color: "#fff",
    borderBottom: "none",
  },
})(TableCell);

const StyledTableCell = withStyles({
  root: {
    color: "#fff",
  },
})(TableCell);

const Weather = () => {
  const classes = useStyles();
  const [polygons, setPolygons] = useState([]);
  const [currentWeather, setCurrentWeather] = useState();
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [currentSoil, setCurrentSoil] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedField, setSelectedField] = useState();

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
        setSelectedField(data[0]);

        // fetchWeather(data[0].center[0], data[0].center[1]);
        fetchSoil(data[0].id);
        fetchWeather(data[0].center[0], data[0].center[1]);
      })
      .catch((err) => console.log(err));
  };

  const fetchWeather = async (lon, lat) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Forecast data: ", data);
        setCurrentWeather(data.current);
        setHourlyWeather(data.hourly);
        setDailyWeather(data.daily);
        setLoading(false);
      })
      .catch((err) => console.log(err));
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
    setSelectedField(field);
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

  const convertC = (x) => {
    return x - 273.15;
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
                      <StyledTableCellHeading component="th" scope="row">
                        <Typography variant="h3">Fields</Typography>
                      </StyledTableCellHeading>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {polygons.map((item, i) => {
                      return (
                        <TableRow
                          key={i}
                          style={{
                            cursor: "pointer",
                            backgroundColor:
                              selectedField === item
                                ? "#26293c"
                                : "transparent",
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
                <Grid container>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <CircularProgress
                      style={{
                        color: "white",
                      }}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
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
                  <Grid
                    item
                    md={6}
                    xs={6}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={
                        "/weather-icons/" +
                        currentWeather?.weather[0]?.icon +
                        ".png"
                      }
                      alt="weather"
                      style={{
                        width: "120px",
                        height: "120px",
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <Typography
                      style={{ fontSize: "2.5rem", fontWeight: "400" }}
                      align="center"
                    >
                      {convertC(currentWeather?.temp).toFixed(0)}° C
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                        marginBottom: "10px",
                      }}
                      align="center"
                    >
                      {currentWeather?.weather[0]?.description}
                    </Typography>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={FeelsLike}
                        alt="feels like"
                        width="40px"
                        height="35px"
                      ></img>
                      <Typography
                        style={{ fontSize: "1rem", fontWeight: "400" }}
                      >
                        Feels like{" "}
                        {convertC(currentWeather?.feels_like).toFixed(0)}° C
                      </Typography>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <img src={Cloud} alt="feels like"></img>
                      <Typography
                        style={{ fontSize: "1rem", fontWeight: "400" }}
                      >
                        Cloudly - {currentWeather?.clouds}%
                      </Typography>
                    </div>
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
                <Grid container>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <CircularProgress
                      style={{
                        color: "white",
                      }}
                    />
                  </Grid>
                </Grid>
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
                      <Grid
                        item
                        md={6}
                        xs={8}
                        className={classes.soilLeftTextContainer}
                      >
                        <Typography className={classes.soilLeftText}>
                          Temperature at the surface
                        </Typography>
                      </Grid>
                      <Grid item md={6} xs={4}>
                        <Typography className={classes.soilRightText}>
                          {convertC(currentSoil?.t0).toFixed(0)}° C
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={8}
                        className={classes.soilLeftTextContainer}
                      >
                        <Typography className={classes.soilLeftText}>
                          Temperature at the depth of 10cm
                        </Typography>
                      </Grid>
                      <Grid item md={6} xs={4}>
                        <Typography className={classes.soilRightText}>
                          {convertC(currentSoil?.t10).toFixed(0)}° C
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={8}
                        className={classes.soilLeftTextContainer}
                      >
                        <Typography className={classes.soilLeftText}>
                          Soil moisture
                        </Typography>
                      </Grid>
                      <Grid item md={6} xs={4}>
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
        <Grid
          item
          md={12}
          xs={12}
          style={{
            overflowX: "auto",
            width: "100%",
          }}
          mb={3}
        >
          <Typography
            variant="h3"
            component="h3"
            style={{ color: "white", marginBottom: "1rem" }}
          >
            Today
          </Typography>
          {!loading ? (
            <Swiper
              spaceBetween={20}
              slidesPerView={2}
              breakpoints={{
                // when window width is >= 320px
                320: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                // when window width is >= 480px
                480: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                // when window width is >= 640px
                640: {
                  width: 640,
                  slidesPerView: 4,
                },
                // when window width is >= 768px
                768: {
                  width: 768,
                  slidesPerView: 5,
                },
                // when window width is >= 991px
                991: {
                  width: 991,
                  slidesPerView: 6,
                },
                // when window width is >= 1024px
                1024: {
                  width: 1024,
                  slidesPerView: 6,
                },
              }}
            >
              {hourlyWeather.map((item, i) => {
                return (
                  <SwiperSlide key={i.toString()}>
                    <Card className={classes.weatherCard}>
                      <CardContent className={classes.weatherCardContent}>
                        <Typography>
                          {new Date(item.dt * 1000).toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </Typography>
                        <img
                          src={
                            "/weather-icons/" + item.weather[0].icon + ".png"
                          }
                          alt={item.weather[0].description}
                          style={{
                            width: "80px",
                            height: "80px",
                          }}
                        />
                        <Typography variant="body1">
                          {convertC(item.temp).toFixed(0)}° C
                        </Typography>
                      </CardContent>
                    </Card>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <Grid container>
              <Grid
                item
                md={12}
                xs={12}
                style={{
                  textAlign: "center",
                }}
              >
                <CircularProgress
                  style={{
                    color: "white",
                  }}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          mt={3}
          style={{
            marginBottom: "3rem",
          }}
        >
          <Typography
            variant="h3"
            component="h3"
            style={{ color: "white", marginBottom: "1rem" }}
          >
            Weekly
          </Typography>
          <Grid container spacing={2}>
            {!loading ? (
              <Swiper
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                  // when window width is >= 320px
                  320: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  // when window width is >= 480px
                  480: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  // when window width is >= 640px
                  640: {
                    width: 640,
                    slidesPerView: 4,
                  },
                  // when window width is >= 768px
                  768: {
                    width: 768,
                    slidesPerView: 5,
                  },
                  // when window width is >= 991px
                  991: {
                    width: 991,
                    slidesPerView: 6,
                  },
                  // when window width is >= 1024px
                  1024: {
                    width: 1024,
                    slidesPerView: 6,
                  },
                }}
              >
                {dailyWeather.map((day, i) => {
                  return (
                    <SwiperSlide key={i.toString()}>
                      <Card className={classes.weatherCard}>
                        <CardContent className={classes.weatherCardContent}>
                          <Typography>
                            {new Date(day.dt * 1000).toLocaleString("en-US", {
                              weekday: "short",
                            })}
                          </Typography>
                          <img
                            src={
                              "/weather-icons/" + day.weather[0].icon + ".png"
                            }
                            alt={day.weather[0].description}
                            style={{
                              width: "80px",
                              height: "80px",
                            }}
                          />
                          <Typography variant="body1">
                            {convertC(day.temp.max).toFixed(0)}°{" "}
                            <span> - </span> {convertC(day.temp.min).toFixed(0)}
                            ° C
                          </Typography>
                        </CardContent>
                      </Card>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <Grid container>
                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{
                    textAlign: "center",
                  }}
                >
                  <CircularProgress
                    style={{
                      color: "white",
                    }}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Weather;
