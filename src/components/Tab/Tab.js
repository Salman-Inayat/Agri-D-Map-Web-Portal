import React, { useEffect, useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import Audio from "../../components/Audio_Player/Audio_Player";
import useStyles from "./styles.js";
import { useMediaQuery } from "react-responsive";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      className={classes.tabPanel}
      style={{ padding: isMobile ? "10px 0px" : "50px 20px" }}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ReaultTab(props) {
  console.log("Image value", props.image);
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const { englishAudio, urduAudio, englishData, urduData } = props;
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();
  const [fallback, setFallback] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setImage(props.image);
    setImageURL(`${process.env.REACT_APP_SERVER_URL}/${props.image}`);
  }, []);

  useEffect(() => {
    setImage(props.image);
    setImageURL(`${process.env.REACT_APP_SERVER_URL}/${props.image}`);
  }, [props.image]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const reloadSrc = (e) => {
    if (fallback) {
      e.target.src = `${process.env.REACT_APP_SERVER_URL}/${props.image}`;
    } else {
      // e.target.src = imageURL(
      //   `${process.env.REACT_APP_SERVER_URL}/${props.image}`,
      // );
      e.target.src = `${process.env.REACT_APP_SERVER_URL}/${props.image}`;
      setFallback(true);
    }
  };

  return (
    <Card
      style={{
        width: "100%",
        padding: isMobile ? "0.3rem" : "1rem",
        backgroundColor: "#3f4257",
        color: "#fff",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="English" {...a11yProps(0)} />
          <Tab label="اُردُو" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container spacing={4}>
          <Grid item md={6} xs={12} style={{ padding: "1rem" }}>
            <Typography
              variant="h4"
              component="h2"
              style={{ fontWeight: "bold" }}
            >
              {englishData.title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              style={{ textAlign: "justify" }}
            >
              {englishData.description}
            </Typography>

            <Typography
              variant="h5"
              bold
              component="h2"
              style={{ fontWeight: "bold", marginTop: "20px" }}
            >
              Symptoms
            </Typography>
            <Typography variant="body1" component="p">
              {englishData.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </Typography>
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Audio audio={englishAudio} />
            <img
              src={imageURL}
              alt="result"
              className={classes.resultImage}
              key={Date.now()}
            />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={4}>
          <Grid item md={6} xs={12} style={{ padding: "1rem" }}>
            <Typography
              variant="h4"
              component="h2"
              style={{ fontWeight: "bold", direction: "rtl" }}
            >
              {urduData.title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              style={{ textAlign: "justify", direction: "rtl" }}
            >
              {urduData.description}
            </Typography>

            <Typography
              variant="h5"
              component="h2"
              style={{
                fontWeight: "bold",
                marginTop: "20px",
                direction: "rtl",
              }}
            >
              علامات
            </Typography>
            <Typography
              variant="body1"
              component="p"
              style={{
                direction: "rtl",
              }}
            >
              {urduData.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </Typography>
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Audio audio={urduAudio} />
            <img
              src={imageURL}
              alt="result"
              className={classes.resultImage}
              onError={reloadSrc}
            />
          </Grid>
        </Grid>
      </TabPanel>
    </Card>
  );
}
