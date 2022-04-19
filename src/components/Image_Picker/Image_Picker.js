import React, { useState } from "react";
import Dropzone from "react-dropzone-uploader";
import useStyles from "./styles.js";
import "react-dropzone-uploader/dist/styles.css";
import ImageUploader from "react-images-upload";

function ImagePicker(props) {
  const classes = useStyles();

  const onDrop = (pictureFile, pictureDataURL) => {
    if (pictureDataURL.length > 0) {
      props.handleImage(pictureDataURL[0]);
    } else {
      props.handleImagePresent(false);
    }
  };

  return (
    <div className={classes.image_picker_container}>
      <ImageUploader
        singleImage={true}
        withPreview={true}
        withIcon={true}
        buttonText="Choose an image"
        onChange={onDrop}
        imgExtension={[".jpg", ".jpeg", ".png"]}
        label="Max file size: 10MB, accepted: JPG, PNG, JPEG"
        maxFileSize={10485760}
      />
    </div>
  );
}

export default ImagePicker;
