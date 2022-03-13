import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  grid_container: {
    padding: "0px",
    backgroundColor: "#27293d",
  },
  segmented_image: {
    height: "300px",
    width: "300px",
  },
  ind_grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    marginTop: "20px",
    marginBottom: "20px",
    backgroundColor: " #3f4257",
    borderRadius: "20px",

    "&:hover": {
      backgroundColor: "#51556f",
    },
  },

  // ==============
  imgBox: {
    maxWidth: "80%",
    maxHeight: "80%",
    margin: "10px",
  },
  img: {
    height: "inherit",
    maxWidth: "inherit",
    borderRadius: "10px",
  },
  input: {
    display: "none",
  },
}));
