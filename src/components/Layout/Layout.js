import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";
import { Box, IconButton, Link } from "@material-ui/core";
import Icon from "@mdi/react";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Image_Segmentation from "../../pages/Image_Segmentation/Image_Segmentation";
import Statistics from "../../pages/Statistics/Statistics";
import Weather from "../../pages/weather";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar history={props.history} />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/fields" component={Dashboard} />
            <Route path="/app/statistics" component={Statistics} />
            <Route
              path="/app/disease-detection"
              component={Image_Segmentation}
            />
            <Route path="/app/weather" component={Weather} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
