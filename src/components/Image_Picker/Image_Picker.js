import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import useStyles from "./styles.js";
import Button from "@material-ui/core/Button";

function Image_Picker(props) {
  const classes = useStyles();

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map((file) => (
    <div className={classes.upload_container}>
      <div className={classes.thumb} key={file.name}>
        <img src={file.preview} className={classes.img} />
      </div>

      <Button
        variant="outlined"
        color="primary"
        className={classes.upload_button}
        onClick={() => alert("You uploaded the photo")}
      >
        Upload
      </Button>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <section className={classes.container}>
      <div {...getRootProps({ className: `${classes.dropzone}` })}>
        <input {...getInputProps()} />
        <span className={classes.span}>📁</span>
        <p className={classes.p}>
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
      <aside className={classes.thumbsContainer}>{thumbs}</aside>
      {/* {files ? (
        <Button variant="outlined" color="primary">
          Upload
        </Button>
      ) : (
        <p>Select a file</p>
      )} */}
    </section>
  );
}

export default Image_Picker;
