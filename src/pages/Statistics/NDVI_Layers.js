import React, { useState, useEffect } from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const API_KEY = "b22d00c2f91807b86822083ead929d76";

function NDVILayers(props) {
  const initialDate = new Date();
  initialDate.setDate(initialDate.getDate() - 30);

  const [metric, setMetric] = useState("ndvi");
  const [layersData, setLayersData] = useState([]);
  const [tableData, setTableData] = useState({});
  const [metricDate, setMetricDate] = useState("");
  const [imageURL, setImageURL] = useState();
  const [imageLoading, setImageLoading] = useState();

  useEffect(() => {
    fetch(
      `http://api.agromonitoring.com/agro/1.0/image/search?start=${props.fromDateUNIX}&end=${props.toDateUNIX}&polyid=${props.polygonId}&appid=${API_KEY}`,
    )
      .then((response) => response.json())

      .then((data) => {
        const dataB = data;
        setLayersData(dataB);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, [props]);

  const handleDateChange = (event) => {
    setMetricDate(event.target.value);
    const required_layer_object = layersData.filter(
      (layer) => layer.dt === event.target.value,
    );
    switchFunction(metric, required_layer_object);
    setImageLoading(true);
  };

  const handleMetricChange = (event) => {
    setMetric(event.target.value);
    const required_layer_object = layersData.filter(
      (layer) => layer.dt === metricDate,
    );
    switchFunction(event.target.value, required_layer_object);
  };

  const switchFunction = (value, required_layer_object) => {
    switch (value) {
      case "ndvi":
        setImageURL(required_layer_object[0].image.ndvi);
        fetchStatsData(required_layer_object[0].stats.ndvi);
        break;
      case "evi":
        setImageURL(required_layer_object[0].image.evi);
        fetchStatsData(required_layer_object[0].stats.evi);
        break;
      case "evi2":
        setImageURL(required_layer_object[0].image.evi2);
        fetchStatsData(required_layer_object[0].stats.evi2);
        break;
      case "ndwi":
        setImageURL(required_layer_object[0].image.ndwi);
        fetchStatsData(required_layer_object[0].stats.ndwi);
        break;
      case "nri":
        setImageURL(required_layer_object[0].image.nri);
        fetchStatsData(required_layer_object[0].stats.nri);
        break;
      case "dswi":
        setImageURL(required_layer_object[0].image.dswi);
        fetchStatsData(required_layer_object[0].stats.dswi);
        break;
      default:
        console.log("Incorrect choice");
    }
    setImageLoading(false);
  };

  const fetchStatsData = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTableData(data);
      });
  };

  const formatDate = (d) => {
    const date = new Date(d * 1000);
    return (
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    );
  };

  const Layers = () => {
    const standard_date = formatDate(metricDate);
    return (
      <Card>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{standard_date}</TableCell>
                <TableCell align="right">{metric.toUpperCase()}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Maximum
                </TableCell>
                <TableCell align="right">{tableData.max.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Minimum
                </TableCell>
                <TableCell align="right">{tableData.min.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Mean
                </TableCell>
                <TableCell align="right">{tableData.mean.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Median
                </TableCell>
                <TableCell align="right">
                  {tableData.median.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Deviation
                </TableCell>
                <TableCell align="right">{tableData.std.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Number of pixels
                </TableCell>
                <TableCell align="right">{tableData.num.toFixed(0)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    );
  };

  var dateToBeSelected;

  return (
    <div>
      <Box
        style={{
          width: "30%",
          margin: "50px 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <FormControl style={{ width: "40%" }}>
          <InputLabel id="demo-simple-select-label">Select Date</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={metricDate}
            label="date"
            defaultValue={
              layersData.length > 0 ? formatDate(layersData[1].dt) : ""
            }
            onChange={(e) => handleDateChange(e)}
          >
            {layersData.map(
              (layer, i) => (
                (dateToBeSelected = formatDate(layer.dt)),
                (
                  <MenuItem value={layer.dt} key={i}>
                    {dateToBeSelected}
                  </MenuItem>
                )
              ),
            )}
          </Select>
        </FormControl>
        <FormControl style={{ width: "40%" }}>
          <InputLabel id="demo-simple-select-label">Select Metric</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={metric}
            label="metric"
            onChange={(e) => handleMetricChange(e)}
          >
            <MenuItem value="ndvi">NDVI</MenuItem>
            <MenuItem value="evi">EVI</MenuItem>
            <MenuItem value="evi2">EVI2</MenuItem>
            <MenuItem value="ndwi">NDWI</MenuItem>
            <MenuItem value="nri">NRI</MenuItem>
            <MenuItem value="dswi">DSWI</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        <Grid item md={4}>
          {" "}
          {tableData.max && <Layers />}
        </Grid>
        <Grid item md={6}>
          {tableData.max && (
            <img src={imageURL} alt="loading" height="300" width="400"></img>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default NDVILayers;
