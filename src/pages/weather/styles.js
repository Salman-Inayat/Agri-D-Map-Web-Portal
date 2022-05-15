import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  root: {
    color: "#FF4842",
  },
  tableCellHeading: {
    "& .MuiTableCell-root": {
      borderBottom: "3px solid #fff",
    },
  },
  soilLeftTextContainer: {
    display: "flex",
    alignItems: "center",
  },
  soilLeftText: {
    fontSize: "0.9rem",
    textAlign: "left",
  },
  soilRightText: {
    fontSize: "1.5rem",
    textAlign: "right",
  },
  weatherCard: {
    backgroundColor: "#3f4256",
    color: "#fff",
    borderRadius: "1rem",
    // boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
  },
  weatherCardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
