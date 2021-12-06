import React, { useState, useEffect } from "react";

import ReactWeather from "react-open-weather-widget";
import "react-open-weather-widget/lib/css/ReactWeather.css";

// mapbox access token
var ACCESS_TOKEN =
  "pk.eyJ1Ijoic2FsbWFuLWluYXlhdCIsImEiOiJja3U3OGNzZzQzNHVlMm9xaG9sZmtoOXI3In0.rF7GhHsrNL8YPMUCLCI92A";

// LocationIQ access token
var access_token = "pk.e83540a57ec2bee941bf85a4d0a2186c";

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
    var settings = {
      async: true,
      crossDomain: true,
      url: `https://us1.locationiq.com/v1/reverse.php?key=${access_token}&lat=${latitude}&lon=${longitude}&format=json`,
      method: "GET",
    };

    fetch(settings.url)
      .then((response) => response.json())
      .then((data) => {
        setCity(data.address.city);
      });
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
    setStatus("Fetching location...");
    navigator.geolocation.getCurrentPosition((position) => {
      reverseGeocoding(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  return (
    <div>
      {city ? (
        <ReactWeather
          forecast="5days"
          apikey="f6973195b3a29969a6ad7e393d2ac38b"
          type="city"
          city={city}
          theme={customStyles}
        />
      ) : (
        <div>
          <h4>{status}</h4>
        </div>
      )}
    </div>
  );
}
