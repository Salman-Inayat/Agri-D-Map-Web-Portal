import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  App: {
    fontFamily: "sans-serif",
  },
  span: {
    fontSize: "3rem",
    color: "#777",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  p: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
  dropzone: {
    textAlign: "center",
    padding: theme.spacing(2),
    border: "3px dashed #373368",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    height: "150px",
    marginBottom: theme.spacing(2),
    cursor: "pointer",
  },
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginWop: "16px",
  },
  thumb: {
    borderRadius: "6px",
    border: "1px solid rgba(55, 51, 104, 0.51)",
    marginBottom: "8px",
    marginRight: " 8px",
    width: "100px",
    height: "100px",
    padding: "4px",
    boxSizing: "border-box",
    position: "relative",
  },
  thumbInner: {
    display: "flex",
    minWidth: "0",
    overflow: " hidden",
  },
  img: {
    display: "block",
    width: "100%",
    height: "auto",
  },

  container: {
    padding: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: "0px",
    },
  },
  upload_container: {
    display: "flex",
    flexDirection: "column",
  },
  upload_button: {
    marginTop: theme.spacing(1),
  },
  image_container: {
    width: "300px",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  preview_image: {
    height: "300px",
    width: "300px",
    border: "1px solid black",
  },
  loading_gif: {
    width: "150px",
  },
  image_picker_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
  },
}));
