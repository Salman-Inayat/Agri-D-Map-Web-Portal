import React from "react";
import ImagePicker from "../../components/Image_Picker/Image_Picker";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";

function Vari() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3} className={classes.grid_container}>
        <Grid item md={12} sm={12}>
          <h3>Vari Calculation</h3>
        </Grid>
        <Grid item md={12} sm={12} className={classes.ind_grid}>
          <ImagePicker url="http://localhost:5000/vari" />
        </Grid>
        <Grid item md={6} sm={12} className={classes.ind_grid}>
          {/* <div>
            <h1>Segmented Image</h1>
            <img
              src="https://images.unsplash.com/photo-1593642532454-e138e28a63f4?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              className={classes.segmented_image}
            ></img>
          </div> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default Vari;
