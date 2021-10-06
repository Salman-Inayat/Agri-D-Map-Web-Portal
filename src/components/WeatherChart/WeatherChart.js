import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function WeatherChart() {
  const [location, setLocation] = useState({
    latitude: 73,
    longitude: 32,
  });
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [pressure, setPressure] = useState([]);
  const [tempMin, setTempMin] = useState([]);
  const [tempMax, setTempMax] = useState([]);
  const [feelsLike, setFeelsLike] = useState([]);
  const [date, setDate] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.agromonitoring.com/agro/1.0/weather/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=b22d00c2f91807b86822083ead929d76`,
        );
        const json = await response.json();
        console.log(json);
        json.map((item, i) => {
          const unixTimestamp = item.dt;

          var dateObj = new Date(unixTimestamp * 1000);
          var utcString = dateObj.toUTCString();

          var time = utcString.slice(-12, -7);

          setTemperature((prevarr) => [...prevarr, item.main.temp]);
          setTempMax((prevarr) => [...prevarr, item.main.temp_max]);
          setTempMin((prevarr) => [...prevarr, item.main.temp_min]);
          setPressure((prevarr) => [...prevarr, item.main.pressure]);
          setHumidity((prevarr) => [...prevarr, item.main.humidity]);
          setFeelsLike((prevarr) => [...prevarr, item.main.feels_like]);
          setDate((prevarr) => [...prevarr, time]);
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  let chartData = {
    labels: date,
    datasets: [
      // {
      //   label: "Temperature",
      //   yaxisID: "temperature",
      //   borderColor: "rgb(54, 162, 235)",
      //   borderWidth: 2,
      //   data: temperature,
      // },
      {
        label: "Temperature",
        yAxisID: "temperature",
        fill: false,
        borderColor: "#ba54f5",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#ba54f5",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#ba54f5",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 1,
        data: temperature,
      },
      // {
      //   label: "Pressure",
      //   data: pressure,
      //   hidden: true,
      // },
      // {
      //   label: "Humidity",
      //   data: humidity,
      //   hidden: true,
      // },
      // {
      //   label: "Date",
      //   data: date,
      //   hidden: true,
      // },
    ],
  };

  return (
    <div>
      <Line
        data={chartData}
        width={2000}
        height={500}
        options={{
          scales: {
            yAxes: [
              {
                id: "temperature",
                display: false,
                position: "left",
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: "rgba(29,140,248,0.0)",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  fontColor: "#9a9a9a",
                  maxTicksLimit: 6,
                  callback: function (value) {
                    return value + "°";
                  },
                  padding: 25,
                },
              },
            ],
            xAxes: [
              {
                // barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: "rgba(29,140,248,0.1)",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  padding: 20,
                  fontColor: "#9a9a9a",
                  autoSkip: true,
                  maxTicksLimit: 5,
                },
              },
              {
                id: "temp",
                offset: true,
                position: "top",
                ticks: {
                  autoSkip: false,
                  callback: (el) => {
                    return "el.temp";
                  },
                  fontColor: "#ba54f5",
                },
              },
              // {
              //   id: "description",
              //   position: "top",
              //   offset: true,
              //   ticks: {
              //     autoSkip: false,
              //     callback: (el) => formatDesc(el).split(" "),
              //     fontColor: "#ffffff",
              //   },
              // },
              {
                id: "dt",
                offset: true,
                position: "top",
                ticks: {
                  autoSkip: false,
                  fontStyle: "bold",
                  fontColor: "#ffffff",
                  callback: (el) => {
                    return el.dt;
                  },
                },
              },
              // {
              //   id: "rain",
              //   offset: true,
              //   ticks: {
              //     autoSkip: false,
              //     callback: (el) =>
              //       (0 + (el.rain && el.rain["1h"])
              //         ? el.rain["1h"]
              //         : 0 + (el.snow && el.snow["1h"])
              //         ? el.snow["1h"]
              //         : 0
              //       ).toFixed(2) + "mm",
              //     fontColor: "#1f8ef1",
              //   },
              // },

              // {
              //   id: "windSpeed",
              //   offset: true,
              //   ticks: {
              //     autoSkip: false,
              //     callback: (el) => formatWindSpeed(el, isMetric),
              //     fontColor: "#ffffff",
              //   },
              // },
              {
                id: "pressure",
                offset: true,
                ticks: {
                  autoSkip: false,
                  callback: (el) => {
                    return el.pressure;
                  },
                  fontColor: "#ffffff",
                },
              },
              {
                id: "humidity",
                offset: true,
                ticks: {
                  autoSkip: false,
                  callback: (el) => {
                    return el.humidity;
                  },
                  fontColor: "#ffffff",
                },
              },
              // {
              //   id: "dewPoint",
              //   offset: true,
              //   ticks: {
              //     autoSkip: false,
              //     callback: (el) => formatTemp(el.dew_point, isMetric),
              //     fontColor: "#ffffff",
              //   },
              // },
              // {
              //   id: "uvi",
              //   offset: true,
              //   ticks: {
              //     autoSkip: false,
              //     callback: (el) => formatUvi(el),
              //     fontColor: "#ffffff",
              //   },
              // },
              // {
              //   id: "clouds",
              //   offset: true,
              //   ticks: {
              //     autoSkip: false,
              //     callback: (el) => formatClouds(el),
              //     fontColor: "#ffffff",
              //   },
              // },
            ],
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          tooltips: {
            backgroundColor: "#f5f5f5",
            titleFontColor: "#333",
            bodyFontColor: "#666",
            bodySpacing: 4,
            xPadding: 12,
            mode: "index",
            enabled: true,
            intersect: 0,
            position: "nearest",
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
        }}
      />
    </div>
  );
}

export default WeatherChart;
