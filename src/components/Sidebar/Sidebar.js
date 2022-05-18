import React, { useState, useEffect } from "react";
import {
  Drawer,
  IconButton,
  List,
  Typography,
  SvgIcon,
} from "@material-ui/core";
import {
  // Home as HomeIcon,
  GrassIcon as GrassIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { useMediaQuery } from "react-responsive";
import Logout from "../../assets/logout.svg";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import {
  useUserDispatch,
  useUserState,
  signOut,
} from "../../context/UserContext";

const HomeIcon = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 80 80">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title />
        <path d="M19,8H9A1,1,0,0,1,9,6H19a1,1,0,0,1,0,2Z" fill="#456cb8" />
        <path d="M19,13H9a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" fill="#456cb8" />
        <path d="M19,18H9a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" fill="#456cb8" />
        <circle cx="5" cy="7" fill="#456cb8" r="1" />
        <circle cx="5" cy="12" fill="#456cb8" r="1" />
        <circle cx="5" cy="17" fill="#456cb8" r="1" />
      </svg>{" "}
    </SvgIcon>
  );
};

const DiseaseIcon = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 60 60">
      <g id="row_4" />
      <g id="row_3" />
      <g id="row_2">
        <g id="eco_x5F_friendly">
          <g>
            <path
              d="M29.3,4.1c1,2.2,1.7,6.7,1.7,13.9v36h2V18.7c0-7.8-1.5-12.7-2.6-15.2C29.3,1.2,28.2,1.7,29.3,4.1z"
              fill="#33691E"
            />
            <path
              d="M35.3,20.2l-0.7-0.7c1.6-1.4,2-4.1,2.5-6.2c0.2-0.7,0.7-1.3,1.3-1.5c1.9-0.7,3.7-1.5,5.4-2.4     c0.4-0.2,0.9-0.3,1.3-0.2c2.5,0.5,4.5,1.5,6.8,1.3c2.9-0.2,3.7,0.8,0.6,1.1c-2.5,0.2-5.1,0.1-7.8-0.4c-1.8,1-3.7,1.8-5.7,2.5     C38.5,16.1,37.1,18.5,35.3,20.2z"
              fill="#33691E"
            />
            <path
              d="M50.2,10.6c0.8,0,1.5,0,2.2-0.1c-2.9,0.8-5.7,1.7-8.5,2.7c-3.3,1.2-6.1,3.4-8.1,6.3     c-0.2-0.2-0.4-0.2-0.7-0.2c-0.2,0-0.4,0.1-0.6,0.2c1.7-1.6,2.9-3.7,3.5-6c0.1-0.4,0.3-0.6,0.7-0.8c1.9-0.7,3.8-1.5,5.5-2.4     c0.2-0.1,0.5-0.2,0.7-0.1C46.7,10.5,48.4,10.6,50.2,10.6z"
              fill="#558B2F"
            />
            <path
              d="M33,30h-1c0-3.1,0.8-6.2,2.3-9c0.4-0.7,0.8-1.3,1.2-1.9c2.1-3,5-5.2,8.4-6.4C51.4,10,61,8.5,61,8.5     c-2.9,0.6-5.8,1.6-8.5,2.3c-3,0.8-5.7,1.9-8.3,2.9c-3.2,1.1-5.9,3.2-7.9,6.1c-0.4,0.5-0.8,1.1-1.1,1.8C33.7,24.1,33,27,33,30z"
              fill="#33691E"
            />
            <path
              d="M52.8,13.9c-2.2,4.2-7.2,6.5-12.3,6.5c-1.5,0-4.7-0.9-4.7-0.9c-0.3-0.7-1.3-0.8-1.9-0.6     c-0.5,0.2-0.9,0.7-0.9,1.4c0,0.6,0.3,1.2,0.7,1.6c0.6-0.8,1-1.8,1.6-1.4c1.4,0.9,3.2,1.9,5.1,1.9c5.7,0,11.1-2.9,13.9-7.5     c1.5-2.5,3.5-5.3,6.5-6.4C61,8.5,54.9,9.9,52.8,13.9z"
              fill="#689F38"
            />
            <path
              d="M61,8.5c-3,1.2-5.6,3.2-7.3,5.9c-2.7,4.3-7.7,7-13.1,7c-1.9,0-3.4-0.7-4.7-1.9c0,0,0,0,0,0     c2-2.8,4.8-5.1,8.1-6.3c2.8-1,5.6-1.9,8.5-2.7C55.5,10.3,58.3,9.6,61,8.5z"
              fill="#8BC34A"
            />
            <path
              d="M50.4,10.8c2.8-0.9,7.4-1.9,10.6-2.2C58.3,9.6,56.3,11.9,50.4,10.8z"
              fill="#558B2F"
            />
            <path
              d="M32.8,29.6c-0.2-1-0.5-1.9-0.8-3c-1.5-4.5-4-8.4-7.4-11.7c-5.5-5.3-12.2-8-20.1-8c0,0-0.7,0-0.7,0     l0.6,0.5c8.9,7.1,16.9,15.3,23.8,24.3h0c0.1,0.1,0.1,0.2,0.2,0.2c0.3,0.3,0.5,0.7,0.7,1c0,0,0,0,0,0c0.2,0.3,0.3,0.5,0.4,0.7     c0.6,0.5,1.8,0.2,2.4-0.5c0.6-0.7,1-1.7,1-2.7C32.9,30.1,32.9,29.9,32.8,29.6z"
              fill="#689F38"
            />
            <path
              d="M27.7,31C20.8,22.2,13,14.3,4.3,7.3L3.8,6.8C5.6,19.5,15.3,30,28.1,31.6C28.1,31.6,27.9,31.2,27.7,31z"
              fill="#558B2F"
            />
            <path
              d="M32,42h-1c0-3.5-0.5-6.3-2.2-8.6c-0.6-0.9-1.5-2.1-1.5-2.1c-1.2-1.6-0.4-2.2,0.8-0.6c0,0,0.8,1.1,1.5,2     C31.4,35.2,32,38.2,32,42z M24.8,28.1c-1.3-1.5-2.4-3.2-3.8-4.7c-0.5-0.6-0.1-1,0.5-0.4c1.3,1.5,2.8,2.9,4.1,4.4     C26.3,28.4,25.5,29,24.8,28.1z M19.7,22c-2.7-2.9-5.6-5.8-8.5-8.4c-0.6-0.5-0.3-0.9,0.3-0.4c3,2.7,5.9,5.5,8.6,8.4     C20.6,22.1,20.1,22.5,19.7,22z M8.2,10.9C6.9,9.7,5,8.1,3.8,6.8c0,0,3.4,2.6,4.7,3.7C9.3,11.3,9,11.6,8.2,10.9z"
              fill="#33691E"
            />
          </g>
          <g>
            <path
              d="M51.1,57.8c0,1.3-1.1,2.4-2.4,2.4c-1.3,0-2.4-1.1-2.4-2.4c0-0.2,0-0.4,0.1-0.5c-0.6,0.7-1.5,1.2-2.5,1.2     c-1.8,0-3.2-1.5-3.2-3.3s1.4-3.3,3.2-3.3s3.2,1.5,3.2,3.3c0,0.3-0.1,0.6-0.2,0.9c0.4-0.5,1.1-0.8,1.8-0.8     C50,55.4,51.1,56.5,51.1,57.8z M34,52.4c-2.1,0-3.9,1.7-3.9,3.9c0,0.1,0,0.2,0,0.3c-0.2-0.1-0.4-0.1-0.6-0.1c-0.1,0-0.2,0-0.2,0     c0-0.1,0-0.3,0-0.4c0-1.8-1.4-3.3-3.2-3.3s-3.2,1.5-3.2,3.3c0,0.9,0.3,1.7,0.9,2.2c-0.2,0.3-0.2,0.6-0.2,1c0,1.1,0.9,2,2,2     s2-0.9,2-2c0-0.1,0-0.2,0-0.3c0.1,0,0.2-0.1,0.3-0.2c0.2,0.8,0.9,1.3,1.7,1.3c0.8,0,1.4-0.5,1.7-1.1c0.7,0.7,1.7,1.2,2.8,1.2     c2.1,0,3.9-1.7,3.9-3.9C37.8,54.2,36.1,52.4,34,52.4z M20.5,55.8c-1.3,0-2.4,1.1-2.4,2.4s1.1,2.4,2.4,2.4s2.4-1.1,2.4-2.4     S21.8,55.8,20.5,55.8z"
              fill="#212121"
            />
            <path
              d="M29.8,55.4c-1.2,0-2.1-1-2.1-2.1c0-1.2,0.9-2.1,2.1-2.1s2.1,1,2.1,2.1C31.9,54.5,31,55.4,29.8,55.4z      M31.9,56.8c-1.2,0-2.2,1-2.2,2.2s1,2.2,2.2,2.2c1.2,0,2.2-1,2.2-2.2S33.1,56.8,31.9,56.8z M39,49.9c-1,0-2,0.6-2.4,1.4     c-0.2-0.1-0.5-0.2-0.8-0.2c-0.9,0-1.6,0.7-1.6,1.6s0.7,1.6,1.6,1.6c0.3,0,0.6-0.1,0.8-0.2c0.5,0.9,1.4,1.4,2.4,1.4     c1.6,0,2.8-1.3,2.8-2.8S40.6,49.9,39,49.9z M11.4,56.8c0,0.9,0.7,1.6,1.6,1.6c0.9,0,1.6-0.7,1.6-1.6s-0.7-1.6-1.6-1.6     C12.1,55.2,11.4,56,11.4,56.8z"
              fill="#6D4C41"
            />
          </g>
          <g>
            <path
              d="M43,58c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4C41.2,54,43,55.8,43,58z M44,51.5     c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5s2.5-1.1,2.5-2.5S45.4,51.5,44,51.5z M35,52c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2     S36.1,52,35,52z M48,54.5c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S48.8,54.5,48,54.5z M23,50.5     c-1.9,0-3.5,1.6-3.5,3.5c0,1.9,1.6,3.5,3.5,3.5s3.5-1.6,3.5-3.5C26.5,52.1,24.9,50.5,23,50.5z"
              fill="#3E2723"
            />
            <path
              d="M21,57c0,2.2-1.8,4-4,4s-4-1.8-4-4c0-2.2,1.8-4,4-4S21,54.8,21,57z M31,54c-1.7,0-3,1.3-3,3     c0,1.7,1.3,3,3,3c1.7,0,3-1.3,3-3C34,55.3,32.7,54,31,54z M27,52c-1.1,0-2,0.9-2,2s0.9,2,2,2c1.1,0,2-0.9,2-2S28.1,52,27,52z      M45,56c-1.7,0-3,1.3-3,3c0,1.7,1.3,3,3,3s3-1.3,3-3C48,57.3,46.7,56,45,56z"
              fill="#4E342E"
            />
            <path
              d="M14,59c0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2S14,57.9,14,59z M23,56.5c-1.4,0-2.5,1.1-2.5,2.5     s1.1,2.5,2.5,2.5s2.5-1.1,2.5-2.5S24.4,56.5,23,56.5z M28,58.5c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5     S28.8,58.5,28,58.5z M34,58.5c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S34.8,58.5,34,58.5z M51,57     c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S52.1,57,51,57z"
              fill="#5D4037"
            />
          </g>
        </g>
      </g>
      <g id="row_1" />
    </SvgIcon>
  );
};

const StatisticsIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 44 44" {...props}>
      <g>
        <path
          fill="#FEBECC"
          d="M48.88,19c-2.04-0.66-4.22-1.03-6.48-1.03c-11.6,0-21,9.4-21,21c0,3.07,0.67,5.98,1.86,8.61h25.62V19z"
        />
        <g>
          <g>
            <path
              fill="#9BEAF9"
              d="M41.74,3.17H8.01c-1.09,0-1.98,0.89-1.98,1.98v23.48h37.68V5.15C43.71,4.07,42.83,3.17,41.74,3.17z"
            />
            <polygon
              fill="#FF9D9C"
              points="47.88,34.95 1.88,34.95 6.04,28.64 43.71,28.64    "
            />
            <rect fill="#CDF6FC" height="4" width="46" x="1.88" y="34.95" />
            <rect
              fill="#FFFFFF"
              height="4.56"
              width="3.12"
              x="12.86"
              y="21.58"
            />
            <rect
              fill="#E9F4BC"
              height="7.53"
              width="3.12"
              x="19.24"
              y="18.61"
            />
            <rect height="11.47" width="3.12" x="25.62" y="14.67" />
            <rect
              fill="#E9F4BC"
              height="15.94"
              width="3.12"
              x="32.74"
              y="10.2"
            />
          </g>
          <g>
            <circle fill="#505050" cx="6.04" cy="19.32" r="0.75" />
            <path
              fill="#505050"
              d="M48.62,34.93c0-0.02-0.01-0.04-0.01-0.06c-0.01-0.1-0.04-0.2-0.09-0.28c-0.01-0.01-0.01-0.03-0.02-0.05     l-4.04-6.13V8.68c0.01-0.02,0.01-0.04,0.01-0.05c0-0.01,0-0.01-0.01-0.02V5.15c0-1.5-1.22-2.72-2.72-2.72H8.02     c-1.51,0-2.73,1.22-2.73,2.72v12.17c0,0.42,0.34,0.75,0.75,0.75c0.41,0,0.75-0.33,0.75-0.75V5.15c0-0.67,0.55-1.22,1.23-1.23     h33.72c0.67,0.01,1.22,0.56,1.22,1.23v3.48c0,0.02,0.01,0.03,0.01,0.05l-0.01,19.21H6.79v-6.57c0-0.41-0.34-0.75-0.75-0.75     c-0.41,0-0.74,0.33-0.75,0.74v0.01v7.09l-4.04,6.13c-0.01,0.01-0.01,0.03-0.02,0.05c-0.05,0.09-0.08,0.18-0.09,0.28     c0,0.02-0.01,0.04-0.01,0.06c0,0.01,0,0.01,0,0.02v4c0,0.41,0.34,0.75,0.75,0.75h46c0.41,0,0.75-0.34,0.75-0.75v-4     C48.63,34.94,48.62,34.94,48.62,34.93z M6.44,29.39h36.87l3.17,4.81H3.27L6.44,29.39z M47.13,38.2H2.63v-2.5h44.5V38.2z"
            />
            <path
              fill="#505050"
              d="M12.11,21.58v4.56c0,0.41,0.34,0.75,0.75,0.75h3.12c0.41,0,0.75-0.34,0.75-0.75v-4.56     c0-0.41-0.34-0.75-0.75-0.75h-3.12C12.45,20.83,12.11,21.17,12.11,21.58z M13.61,22.33h1.62v3.06h-1.62V22.33z"
            />
            <path
              fill="#505050"
              d="M19.24,17.86c-0.41,0-0.75,0.34-0.75,0.75v7.53c0,0.41,0.34,0.75,0.75,0.75h3.12c0.41,0,0.75-0.34,0.75-0.75     v-7.53c0-0.41-0.34-0.75-0.75-0.75H19.24z M21.61,25.39h-1.62v-6.03h1.62V25.39z"
            />
            <path
              fill="#505050"
              d="M25.62,13.92c-0.41,0-0.75,0.34-0.75,0.75v11.47c0,0.41,0.34,0.75,0.75,0.75h3.12     c0.41,0,0.75-0.34,0.75-0.75V14.67c0-0.41-0.34-0.75-0.75-0.75H25.62z M27.99,25.39h-1.62v-9.97h1.62V25.39z"
            />
            <path
              fill="#505050"
              d="M35.86,26.89c0.41,0,0.75-0.34,0.75-0.75V10.2c0-0.41-0.34-0.75-0.75-0.75h-3.12     c-0.41,0-0.75,0.34-0.75,0.75v15.94c0,0.41,0.34,0.75,0.75,0.75H35.86z M33.49,10.95h1.62v14.44h-1.62V10.95z"
            />
            <path
              fill="#505050"
              d="M14.87,17.67c0.15,0.2,0.38,0.31,0.61,0.31c0.15,0,0.31-0.05,0.44-0.15l11.67-8.54l-0.19,1.21     c-0.06,0.41,0.22,0.79,0.63,0.86c0.04,0.01,0.08,0.01,0.12,0.01c0.36,0,0.68-0.26,0.74-0.64l0.46-3     c0.06-0.41-0.22-0.79-0.63-0.86l-3-0.46c-0.4-0.06-0.79,0.22-0.86,0.63c-0.06,0.41,0.22,0.79,0.63,0.86l1.21,0.19l-11.67,8.54     C14.69,16.87,14.62,17.33,14.87,17.67z"
            />
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};

const WeatherIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 512 512" {...props}>
      <title />
      <path
        d="M256,149a106,106,0,0,0-84.28,170.28A106,106,0,0,0,320.28,170.72,105.53,105.53,0,0,0,256,149Z"
        fill="#f7ad1e"
      />
      <line
        fill="none"
        stroke="#02005c"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="20"
        x1="235"
        x2="235"
        y1="43"
        y2="102"
      />
      <line
        fill="none"
        stroke="#02005c"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="20"
        x1="99.24"
        x2="140.95"
        y1="99.23"
        y2="140.95"
      />
      <line
        fill="none"
        stroke="#02005c"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="20"
        x1="43"
        x2="102"
        y1="235"
        y2="235"
      />
      <line
        fill="none"
        stroke="#02005c"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="20"
        x1="368"
        x2="426.99"
        y1="235"
        y2="235"
      />
      <line
        fill="none"
        stroke="#02005c"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="20"
        x1="329.04"
        x2="370.76"
        y1="140.95"
        y2="99.23"
      />
      <path
        d="M130.9,221.12A107.63,107.63,0,0,0,130,235a106,106,0,1,0,19.59-61.37"
        fill="none"
        stroke="#02005c"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="20"
      />
      <path
        d="M137.56,195.68c-.17.41-.34.81-.5,1.22"
        fill="none"
        stroke="#02005c"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="20"
      />
      <g data-name="cloud" id="cloud-2">
        <path
          d="M394,296a64.88,64.88,0,0,0-22.86,4.14A106,106,0,0,0,161,320q0,4.08.31,8.08A50,50,0,1,0,147,426H394a65,65,0,0,0,0-130Z"
          fill="#fff"
        />
        <path
          d="M391.14,320.16a105.35,105.35,0,0,0-7.34-23.34,65.11,65.11,0,0,0-12.66,3.33,105.64,105.64,0,0,0-19.9-44.46A106,106,0,0,0,181,340c0,2.72.11,5.42.31,8.09a50,50,0,0,0-58.22,71.82A49.72,49.72,0,0,0,147,426H394a65,65,0,0,0,54.86-99.86,65,65,0,0,0-57.72-6Z"
          fill="#b6c4cf"
        />
        <path
          d="M394,296a64.88,64.88,0,0,0-22.86,4.14A106,106,0,0,0,161,320q0,4.08.31,8.08A50,50,0,1,0,147,426H394a65,65,0,0,0,0-130Z"
          fill="none"
        />
      </g>
      <path
        d="M168.5,280.81c-.07.19-.15.37-.22.56s-.15.36-.22.55"
        fill="none"
        stroke="#02005c"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="20"
      />
      <path
        d="M458.87,364.41c1.86-33.07-22.91-63.16-55.72-67.76a65.39,65.39,0,0,0-32,3.5c-6.45-34.08-30-62.91-61.32-77.47C266,201,209,218,180.85,258.24"
        fill="none"
        stroke="#02005c"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="20"
      />
      <path
        d="M438.65,408.24a64.67,64.67,0,0,0,13.64-18.62"
        fill="none"
        stroke="#02005c"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="20"
      />
      <path
        d="M161.83,306.7a107.71,107.71,0,0,0-.53,21.39A50.48,50.48,0,0,0,102,354.22,48.32,48.32,0,0,0,102,398c3,5,6,11,11,15a83.42,83.42,0,0,0,12,8,120.9,120.9,0,0,0,18,5q129,1.5,258,0c5,0,11-3,15.92-4.16"
        fill="none"
        stroke="#02005c"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="20"
      />
    </SvgIcon>
  );
};

const structure = [
  {
    id: 0,
    label: "Disease Detection",
    link: "/app/disease-detection",
    icon: <DiseaseIcon height={50} width={50} />,
  },
  {
    id: 1,
    label: "Fields",
    link: "/app/fields",
    icon: <HomeIcon height={50} width={50} />,
  },
  {
    id: 2,
    label: "Statistics",
    link: "/app/statistics",
    icon: <StatisticsIcon height={70} width={70} />,
  },
  {
    id: 3,
    label: "Weather",
    link: "/app/weather",
    icon: <WeatherIcon height={50} width={50} />,
  },
];

function Sidebar({ location, history }) {
  var classes = useStyles();
  var theme = useTheme();

  const { userName } = useUserState();

  var userDispatch = useUserDispatch();

  var isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const isMobile = useMediaQuery({ maxWidth: 767 });

  // global
  var { isSidebarOpened } = useLayoutState();

  var layoutDispatch = useLayoutDispatch();
  var userDispatch = useUserDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
            style={{
              color: "#fff",
            }}
          />
        </IconButton>
      </div>
      <div className={classes.userArea}>
        <img src="/person.png" className={classes.sideBarImage} alt="" />
        <h3>{userName}</h3>
      </div>
      <List className={classes.sidebarList}>
        {structure.map((link) => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
      <div
        style={{
          width: isMobile ? "35%" : "40%",
          height: "50px",
          marginLeft: "2rem",
          marginTop: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img src={Logout} width={30} height={30} alt="logout"></img>
        <Typography
          onClick={() => signOut(userDispatch, history)}
          variant="body1"
          style={{
            cursor: "pointer",
            fontSize: "1rem",
            color: "#fff",
          }}
        >
          Logout
        </Typography>
      </div>{" "}
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
