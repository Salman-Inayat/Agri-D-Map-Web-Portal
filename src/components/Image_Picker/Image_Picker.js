import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone-uploader";
import useStyles from "./styles.js";
import Button from "@material-ui/core/Button";
import "react-dropzone-uploader/dist/styles.css";

const Preview = ({ meta }) => {
  const { name, percent, status, previewUrl } = meta;
  return (
    <div className="preview-box">
      <img src={previewUrl} style={{ height: "100px", width: "100px" }} />{" "}
      <span className="name">{name}</span> -{" "}
      <span className="status">{status}</span>
      {status !== "done" && (
        <span className="percent"> ({Math.round(percent)}%)</span>
      )}
    </div>
  );
};

function Image_Picker(props) {
  const [imageFile, setimageFile] = useState("");
  const [loading, setLoading] = useState();

  const classes = useStyles();

  const getUploadParams = ({ file }) => {
    setLoading(true);
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
          const new_image_file = result.filename.slice(0, -3) + "PNG";
          setimageFile(new_image_file);
          setLoading(false);
        }
      };
    }
  };

  return (
    <>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        accept="image/*"
        maxFiles={1}
        multiple={false}
        // PreviewComponent={Preview}
        canCancel={false}
        inputContent="Drop A File"
        styles={{
          dropzone: { width: 400, height: 200 },
          dropzoneActive: { borderColor: "green" },
        }}
      />
      <div className={classes.image_container}>
        {loading ? (
          <img src="/loading.gif" className={classes.loading_gif} />
        ) : (
          <img
            src={`http://localhost:3000/${imageFile}`}
            // className={`${"loading" ? "" : classes.preview_image}`}
            className={classes.preview_image}
            alt=""
          />
        )}
      </div>
    </>
  );
}

export default Image_Picker;
