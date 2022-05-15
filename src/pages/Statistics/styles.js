import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // margin: "10px",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px",
      margin: "0px -0.5rem",
    },
  },
  NDVIContainer: {
    margin: "10px",
    padding: "20px",
    // backgroundColor: "#373368",
    // color: "white",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px",
    },
  },
  layesBox: {
    width: "30%",
    margin: "50px 20px",
    display: "flex",
    justifyContent: "space-between",
  },
  layersImage: {
    width: "15rem",
    height: "15rem",
    [theme.breakpoints.down("sm")]: {
      width: "10rem",
      height: "10rem",
    },
  },
  datePicker: {
    "& .MuiFormLabel-root, .MuiInputBase-root": {
      color: "#fff",
    },
  },
}));
