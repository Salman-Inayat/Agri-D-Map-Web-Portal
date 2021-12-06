import React, { useState } from "react";
import Dropzone from "react-dropzone-uploader";
import useStyles from "./styles.js";
import "react-dropzone-uploader/dist/styles.css";

function ImagePicker(props) {
  const [imageFile, setimageFile] = useState("");
  const [loading, setLoading] = useState();

  const classes = useStyles();

  const getUploadParams = ({ file }) => {
    setLoading(true);
    setimageFile("");
    const body = new FormData();
    body.append("dataFiles", file);
    return { url: props.url, body };
  };

  const handleChangeStatus = ({ xhr }) => {
    if (xhr) {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const result = JSON.parse(xhr.response);
          console.log(result);
          const new_image_file = result.filename.slice(0, -3) + "png";
          setimageFile(new_image_file);
          setLoading(false);
        }
      };
    }
  };

  return (
    <div className={classes.image_picker_container}>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        accept="image/*"
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent="Drop A File"
        styles={{
          dropzone: {
            width: 400,
            height: 200,
            marginRight: 30,
            border: "3px dashed black",
          },
          dropzoneActive: { borderColor: "green" },
        }}
      />
      <div className={classes.image_container}>
        {loading && (
          <img src="/loading.gif" className={classes.loading_gif} alt="" />
        )}
        {imageFile && (
          <img
            src={`http://localhost:5000/${imageFile}`}
            className={classes.preview_image}
            alt=""
          />
        )}
      </div>
    </div>
  );
}

export default ImagePicker;
