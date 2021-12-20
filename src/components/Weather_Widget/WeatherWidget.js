import React, { useState, useEffect } from "react";

import ReactWeather from "react-open-weather-widget";
import "react-open-weather-widget/lib/css/ReactWeather.css";

// mapbox access token
var ACCESS_TOKEN =
  "pk.eyJ1Ijoic2FsbWFuLWluYXlhdCIsImEiOiJja3U3OGNzZzQzNHVlMm9xaG9sZmtoOXI3In0.rF7GhHsrNL8YPMUCLCI92A";

// LocationIQ access token
var access_token = "pk.e83540a57ec2bee941bf85a4d0a2186c";

// geolocation-db access token
var token = "8dd79c70-0801-11ec-a29f-e381a788c2c0";

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
    var url = `https://us1.locationiq.com/v1/reverse.php?key=${access_token}&lat=${latitude}&lon=${longitude}&format=json`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCity(data.address.city);
        console.log(data.address.city);
      });
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const getData = async () => {
    const res = await fetch("/json/");
    console.log(res);
    //  setIP(res.data.IPv4);
  };

  useEffect(() => {
    // var url = `https://cors-anywhere.herokuapp.com/https://geolocation-db.com/json/${token}`;

    setStatus("Fetching location...");
    // getData();
    // fetch(`/json/${token}/111.68.97.206`)
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error", error));

    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);

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
