import React, { useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone-uploader";
import useStyles from "./styles.js";
import Button from "@material-ui/core/Button";
import "react-dropzone-uploader/dist/styles.css";
import { CompareArrowsOutlined } from "@material-ui/icons";

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

  // const classes = useStyles();

  // const [files, setFiles] = useState([]);
  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: "image/*",
  //   onDrop: (acceptedFiles) => {
  //     setFiles(
  //       acceptedFiles.map((file) =>
  //         Object.assign(file, {
  //           preview: URL.createObjectURL(file),
  //         }),
  //       ),
  //     );
  //   },
  // });

  // const thumbs = files.map((file) => (
  //   <div className={classes.upload_container}>
  //     <div className={classes.thumb} key={file.name}>
  //       <img src={file.preview} className={classes.img} />
  //     </div>

  //     <Button
  //       variant="outlined"
  //       color="primary"
  //       className={classes.upload_button}
  //       onClick={() => alert("You uploaded the photo")}
  //     >
  //       Upload
  //     </Button>
  //   </div>
  // ));

  // useEffect(
  //   () => () => {
  //     // Make sure to revoke the data uris to avoid memory leaks
  //     files.forEach((file) => URL.revokeObjectURL(file.preview));
  //   },
  //   [files],
  // );

  // return (
  //   <section className={classes.container}>
  //     <div {...getRootProps({ className: `${classes.dropzone}` })}>
  //       <input {...getInputProps()} />
  //       <span className={classes.span}>📁</span>
  //       <p className={classes.p}>
  //         Drag 'n' drop some files here, or click to select files
  //       </p>
  //     </div>
  //     <aside className={classes.thumbsContainer}>{thumbs}</aside>
  //   </section>
  // );

  const getUploadParams = ({ file }) => {
    const body = new FormData();
    body.append("dataFiles", file);
    return { url: "http://localhost:3000/image-segment", body };
  };

  // const handleChangeStatus = ({ meta, remove }, status) => {
  //   if (status === "headers_received") {
  //     toast(`${meta.name} uploaded!`);
  //     remove();
  //   } else if (status === "aborted") {
  //     toast(`${meta.name}, upload failed...`);
  //   }
  // };

  const handleChangeStatus = ({ xhr }) => {
    if (xhr) {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const result = JSON.parse(xhr.response);
          setimageFile(result.filename);
        }
      };
    }
  };

  return (
    <>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        // onSubmit={handleSubmit}
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
      <div>
        <img src={`http://localhost:3000/${imageFile}`} alt="demo" />
      </div>
    </>
  );
}

export default Image_Picker;
