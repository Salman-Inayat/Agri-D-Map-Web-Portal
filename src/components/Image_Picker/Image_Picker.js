import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import useStyles from "./styles.js";

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
    <div className={classes.thumb} key={file.name}>
      <img src={file.preview} className={classes.img} />
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
    </section>
  );
}

export default Image_Picker;
