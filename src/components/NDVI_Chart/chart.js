import React from "react";
import { Chart, LineAdvance } from "bizcharts";

const data = [
  {
    dt: "12-09-2020",
    type: "s2",
    zoom: 13,
    dc: 100,
    cl: 11.74,
    data: {
      mean: 0.3437048851749852,
      num: 337,
      p25: 0.22760096282428458,
      median: 0.3391461214672279,
      max: 0.6519677572309152,
      min: 0.07629649742058105,
      p75: 0.4453737584945112,
      std: 0.15337122284637406,
    },
  },
  {
    dt: "23-10-2020",
    type: "s2",
    zoom: 13,
    dc: 100,
    cl: 5.84,
    data: {
      mean: 0.234057907867241,
      num: 337,
      p25: 0.2496487119437939,
      median: 0.4680502457673403,
      max: 0.3401694149536933,
      min: 0.06390414378432352,
      p75: 0.5882510013351134,
      std: 0.1998458908032688,
    },
  },
  {
    dt: "12-09-2021",
    type: "s2",
    zoom: 13,
    dc: 100,
    cl: 5.84,
    data: {
      mean: 0.104057907867241,
      num: 337,
      p25: 0.2496487119437939,
      median: 0.4680502457673403,
      max: 0.3501694149536933,
      min: 0.06390414378432352,
      p75: 0.5882510013351134,
      std: 0.1998458908032688,
    },
  },
  {
    dt: "4-03-2021",
    type: "s2",
    zoom: 13,
    dc: 100,
    cl: 5.84,
    data: {
      mean: 0.934057907867241,
      num: 337,
      p25: 0.2496487119437939,
      median: 0.4680502457673403,
      max: 0.5501694149536933,
      min: 0.26390414378432352,
      p75: 0.5882510013351134,
      std: 0.1998458908032688,
    },
  },
  {
    dt: "09-02-2021",
    type: "s2",
    zoom: 13,
    dc: 100,
    cl: 5.84,
    data: {
      mean: 0.344057907867241,
      num: 337,
      p25: 0.2496487119437939,
      median: 0.4680502457673403,
      max: 0.5601694149536933,
      min: 0.78390414378432352,
      p75: 0.5882510013351134,
      std: 0.1998458908032688,
    },
  },
];

function Demo(props) {
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

  console.log(result);
  return (
    props.data.length > 0 && (
      <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={result}>
        <LineAdvance
          shape="smooth"
          point
          area
          position="date*value"
          color="label"
        />
      </Chart>
    )
  );
}

export default Demo;
