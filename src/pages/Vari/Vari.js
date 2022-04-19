import React from "react";
import ImagePicker from "../../components/Image_Picker/Image_Picker";
import { Grid, Button } from "@material-ui/core";
import useStyles from "./styles";

const clientId = "IoAOqmmySnC58B2PDyV6uQ";
const clientSecret = "liqJb6t8lDlLIiclaGuogFzmFNBZrsaz";

function Vari() {
  const classes = useStyles();

  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }
  var result = range(0, 1000);

  const availableTimeslots = result.map((id) => {
    return {
      id,
      startTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          9,
          0,
          0,
          0,
        ),
      ),
      endTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          21,
          0,
          0,
          0,
        ),
      ),
    };
  });

  // React.useEffect(() => {
  //   if (router.query.code) {
  //     fetch("/connectZoom", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ code: router.query.code }),
  //     })
  //       .then(() => {
  //         /* Show success message to user */
  //       })
  //       .catch(() => {
  //         /* Show error message to user */
  //       });
  //   }
  // }, [router.query.code]);

  var options = {
    method: "POST",
    qs: {
      grant_type: "authorization_code",
      //The code below is a sample authorization code. Replace it with your actual authorization code while making requests.
      code: "B1234558uQ",
      //The uri below is a sample redirect_uri. Replace it with your actual redirect_uri while making requests.
      redirect_uri: "http://localhost:3000/#/app/vari",
    },
    headers: {
      /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
       **/
      Authorization:
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
  };

  const handleSubmit = (data) => {
    fetch("https://zoom.us/oauth/token", options)
      .then((res) => res.json())
      .then((json) => {});
  };

  return (
    <div>
      <Grid container spacing={3} className={classes.grid_container}>
        <Grid item md={12} sm={12}>
          <h3>Vari Calculation</h3>
        </Grid>
        <Grid item md={12} sm={12} className={classes.ind_grid}>
          <ImagePicker url="https://agri-vision-server.herokuapp.com/vari" />
        </Grid>

        <Grid item md={12} sm={12} className={classes.ind_grid}>
          {/* <Button>
            <a
              href={`https://zoom.us/oauth/authorize?response_type=code&client_id=IoAOqmmySnC58B2PDyV6uQ&redirect_uri=http://localhost:3000/#/app/vari`}
            >
              Connect Zoom
            </a>
          </Button> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default Vari;
