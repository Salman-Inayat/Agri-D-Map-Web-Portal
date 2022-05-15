import React, { useState, useEffect } from "react";
// import { Chart, LineAdvance, Axis } from "bizcharts";
import ReactApexChart from "react-apexcharts";

function NDVIChart(props) {
  let result = [];
  // const [options, setOptions] = useState({});
  const [chartData, setChartData] = useState([]);
  const [chartDate, setChartDate] = useState([]);
  result.push({
    name: "Maximum",
    data: [],
  });
  result.push({
    name: "Minimum",
    data: [],
  });
  result.push({
    name: "Mean",
    data: [],
  });
  props.data.map((item, i) => {
    var unixTimestamp = props.data[i].dt;
    var date = new Date(unixTimestamp * 1000);
    const standard_date =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    result[0].data.push(item.data.max.toFixed(2));
    result[1].data.push(item.data.min.toFixed(2));
    result[2].data.push(item.data.mean.toFixed(2));
    // setChartDate((prevState) => [...prevState, standard_date]);
    chartDate.push(standard_date);
  });

  const options = {
    chart: {
      borderRadius: 10,
      foreColor: "#fff",
      height: "auto",
      type: "line",
      // background: "#373368",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "bottom",
      horizontalAlign: "center",
      floating: false,
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      height: 50,
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          " - " +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          ""
        );
      },
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        // colors: "#fff",
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        // strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },

    xaxis: {
      categories: chartDate.reverse(),
      labels: {
        style: {
          // colors: "#fff",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          // colors: "#fff",
        },
      },
    },
    // grid: {
    //   borderColor: "red",
    //   strokeDashArray: 0,
    //   position: "back",
    //   show: true,
    //   xaxis: {
    //     lines: {
    //       show: false,
    //     },
    //   },
    //   yaxis: {
    //     lines: {
    //       show: false,
    //     },
    //   },
    // },
    theme: {
      pallete: "palette2",
      // mode: "dark",
    },
    tooltip: {
      theme: true,
      y: [
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
      ],
    },
    colors: ["#F44336", "#E91E63", "#9C27B0"],
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
    noData: {
      text: "No data for selected period",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "14px",
        fontFamily: undefined,
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={result}
      type="line"
      height={350}
      style={{ borderRadius: "5px" }}
    />
  );
}

export default NDVIChart;
