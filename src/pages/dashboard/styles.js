import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  image_picker_grid: {
    paddingRight: theme.spacing(15),
    paddingLeft: theme.spacing(15),
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
