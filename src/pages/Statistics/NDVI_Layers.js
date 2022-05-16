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
import useStyles from "./styles.js";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles({
  root: {
    color: "#fff",
  },
})(TableCell);

function NDVILayers(props) {
  var classes = useStyles();

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
      `${process.env.REACT_APP_AGROMONITORING_API_URL}image/search?start=${props.fromDateUNIX}&end=${props.toDateUNIX}&polyid=${props.polygonId}&appid=${process.env.REACT_APP_AGROMONITORING_API_KEY}`,
    )
      .then((response) => response.json())

      .then((data) => {
        if (data.length > 0) {
          const dataB = data;
          setLayersData(dataB);
          setMetricDate(dataB[0].dt);

          let layerStats = dataB[0].stats.ndvi;

          if (layerStats.includes("http")) {
            layerStats = layerStats.replace("http", "https");
          }

          setImageURL(dataB[0].image.ndvi);

          fetch(layerStats)
            .then((res) => res.json())
            .then((data) => {
              setTableData(data);
            });
        }
      })
      .catch((error) => {});
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
    }
    setImageLoading(false);
  };

  const fetchStatsData = (url) => {
    if (url.includes("http")) {
      url = url.replace("http", "https");
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTableData(data);
      });
  };

  const formatDate = (d) => {
    const date = new Date(d * 1000);
    // return (
    //   date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    // );

    return date.toDateString();
  };

  const Layers = () => {
    const standard_date = formatDate(metricDate);
    return (
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
              sx={{ minWidth: 650, color: "#fff" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>{standard_date}</StyledTableCell>
                  <StyledTableCell align="right">
                    {metric.toUpperCase()}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    Maximum
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {tableData.max.toFixed(2)}
                  </StyledTableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    Minimum
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {tableData.min.toFixed(2)}
                  </StyledTableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    Mean
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {tableData.mean.toFixed(2)}
                  </StyledTableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    Median
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {tableData.median.toFixed(2)}
                  </StyledTableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    Deviation
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {tableData.std.toFixed(2)}
                  </StyledTableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    Number of pixels
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {tableData.num.toFixed(0)}
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    );
  };

  var dateToBeSelected;

  return (
    <Grid container spacing={4}>
      <Grid item md={6} xs={12}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={5}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ color: "#fff" }}
              >
                Select Date
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={metricDate}
                label="date"
                defaultValue={metricDate}
                onChange={(e) => {
                  handleDateChange(e);
                }}
                style={{ color: "#fff" }}
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
          </Grid>
          <Grid item md={6} xs={5}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ color: "#fff" }}
              >
                Select Metric
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={metric}
                label="metric"
                onChange={(e) => handleMetricChange(e)}
                style={{ color: "#fff" }}
              >
                <MenuItem value="ndvi">NDVI</MenuItem>
                <MenuItem value="evi">EVI</MenuItem>
                <MenuItem value="evi2">EVI2</MenuItem>
                <MenuItem value="ndwi">NDWI</MenuItem>
                <MenuItem value="nri">NRI</MenuItem>
                <MenuItem value="dswi">DSWI</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid item md={12}>
        <Grid container spacing={3}>
          <Grid
            item
            md={4}
            xs={12}
            style={{
              backgroundColor: "transparent",
            }}
          >
            {tableData.max && <Layers />}
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {tableData.max && (
              <img
                src={imageURL.replace("http", "https")}
                alt="loading"
                className={classes.layersImage}
              ></img>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NDVILayers;
