import React, { useEffect } from "react";
import { Chart, LineAdvance, Axis } from "bizcharts";

function NDVIChart(props) {
  let result = [];

  props.data.map((item, i) => {
    var unixTimestamp = props.data[i].dt;
    var date = new Date(unixTimestamp * 1000);
    const standard_date =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    result.push({
      label: "max",
      value: props.data[i].data.max,
      date: standard_date,
    });
    result.push({
      label: "min",
      value: props.data[i].data.min,
      date: standard_date,
    });
    result.push({
      label: "mean",
      value: props.data[i].data.mean,
      date: standard_date,
    });
  });

  result.reverse();

  return (
    <Chart
      padding={"auto"}
      appendPadding={10}
      scale={{ date: { type: "cat", nice: false } }}
      autoFit
      height={300}
      data={result}
    >
      <LineAdvance
        shape="smooth"
        point
        area
        position="date*value"
        color="label"
      />
      <Axis
        name="date"
        label={{
          rotate: 0.5,
          autoRotate: true,
          style: { textAlign: "start", fontSize: 11 },
        }}
      />
    </Chart>
  );
}

export default NDVIChart;
