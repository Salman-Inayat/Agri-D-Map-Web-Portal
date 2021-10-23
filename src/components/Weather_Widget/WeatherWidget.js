import React, { useState, useEffect } from "react";

import ReactWeather from "react-open-weather-widget";
import "react-open-weather-widget/lib/css/ReactWeather.css";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAWa7-RTKOR7BulmJ1PWmDaJ9r2ZB8UqAs");

Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

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

  return (
    <div>
      {props.city ? (
        <ReactWeather
          forecast="5days"
          apikey="f6973195b3a29969a6ad7e393d2ac38b"
          type="city"
          city={props.city}
          theme={customStyles}
        />
      ) : (
        <div>
          <h4>{""}</h4>
        </div>
      )}
    </div>
  );
}
