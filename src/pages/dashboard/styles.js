import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  image_picker_grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // paddingRight: theme.spacing(2),
    // paddingLeft: theme.spacing(2),
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
}));
