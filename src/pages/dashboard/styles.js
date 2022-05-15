import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  root: {
    color: "#FF4842",
  },
  intro_grid: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
  },
  intro_content_grid: {
    padding: `${theme.spacing(4)}px ${theme.spacing(5)}px`,
  },
  image_picker_grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // paddingRight: theme.spacing(2),
    // paddingLeft: theme.spacing(2),
  },
  results_grid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
  },
  results_container: {
    margin: `${theme.spacing(3)}px ${theme.spacing(0)}px`,
  },
  output_container: {
    paddingRight: theme.spacing(20),
    paddingLeft: theme.spacing(20),
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
  },
  paper: {
    height: "10vh",
    padding: "auto",
  },
  map_container: {
    height: "400px",
    position: "relative",
  },
  sidebar: {
    backgroundColor: "rgba(35, 55, 75, 0.9)",
    color: "#fff",
    padding: "6px 12px",
    fontFamily: "monospace",
    zIndex: "1",
    position: "absolute",
    top: "0",
    left: "0",
    margin: "12px",
    borderRadius: "4px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  locateButton: {
    margin: theme.spacing(1),
    borderRadius: theme.spacing(2),
    width: "25%",
    backgroundColor: " #3f4257",

    "&:hover": {
      backgroundColor: "#51556f",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0px",
      marginTop: theme.spacing(1),
    },
  },
  addPolygonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  createPolygonButon: {
    margin: theme.spacing(1),
    borderRadius: theme.spacing(2),
    width: "40%",
    backgroundColor: " #3f4257",

    "&:hover": {
      backgroundColor: "#51556f",
    },
    [theme.breakpoints.down("sm")]: {
      width: "40%",
      borderRadius: theme.spacing(5),
      padding: "0.5rem 0rem",
    },
  },

  addPolygonInput: {
    width: "60%",
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "60%",
    },
    [`& fieldset`]: {
      borderRadius: 50,
    },
  },
  snackbar: {
    "& .MuiSnackbar-root": {
      backgroundColor: "#FF4842",
    },
  },
}));
