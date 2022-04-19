import React, { useState, useEffect } from "react";

import ReactWeather from "react-open-weather-widget";
import "react-open-weather-widget/lib/css/ReactWeather.css";
import axios from "axios";
import { Typography } from "@material-ui/core";

export default function WeatherWidget(props) {
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

  const [city, setCity] = useState();
  const [status, setStatus] = useState(null);

  const reverseGeocoding = function (latitude, longitude) {
    var url = `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATION_IQ_ACCESS_TOKEN}&lat=${latitude}&lon=${longitude}&format=json`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCity(data.address.city);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_GEO_LOCATION_URL}`)
      .then((response) => {
        reverseGeocoding(response.data.latitude, response.data.longitude);
      })
      .catch((error) => {
        setStatus("Please disable adblocker to view weather");
      });
  }, []);

  return (
    <div>
      {city ? (
        <ReactWeather
          forecast="5days"
          apikey={`${process.env.REACT_APP_REACT_WEATHER_API_KEY}`}
          type="city"
          city={city}
          theme={customStyles}
        />
      ) : (
        <div>
          <Typography
            style={{
              color: "white",
              fontSize: "1.2rem",
              textAlign: "center",
              marginTop: "10%",
            }}
          >
            {status}
          </Typography>
        </div>
      )}
    </div>
  );
}
