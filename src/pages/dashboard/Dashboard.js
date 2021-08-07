import React, { useState } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./styles";
import Image_Picker from "../../components/Image_Picker/Image_Picker";
import Audio_Player from "../../components/Audio_Player/Audio_Player";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

export default function Dashboard(props) {
  var classes = useStyles();

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={12} className={classes.image_picker_grid}>
          <Image_Picker url="http://localhost:3000/image-segment" />
        </Grid>
        <Grid container spacing={3} className={classes.output_container}>
          <Grid item md={5} sm={12}>
            <Paper className={classes.paper}>
              Visual result displayed here
            </Paper>
          </Grid>
          <Grid item md={5} sm={12} m={2} p={3}>
            <Audio_Player />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
