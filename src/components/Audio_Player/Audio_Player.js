import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
// import AudioPlayer from "material-ui-audio-player";
import Button from "@material-ui/core/Button";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function Audio(props) {
  return <AudioPlayer src={props.audio} style={{ borderRadius: "10px" }} />;
}

export default Audio;
