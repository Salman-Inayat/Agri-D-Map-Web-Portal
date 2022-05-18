import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter, useHistory } from "react-router-dom";
import axios from "axios";

// styles
import useStyles from "./styles";

import { useUserDispatch, loginUser } from "../../context/UserContext";

function Login(props) {
  const classes = useStyles();
  const history = useHistory();
  const userDispatch = useUserDispatch();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);
  const [nameValue, setNameValue] = useState("");
  const [loginValue, setLoginValue] = useState("");
  const [loginPasswordValue, setLoginPasswordValue] = useState("");

  const [signupValue, setSignupValue] = useState("");
  const [signupPasswordValue, setSignupPasswordValue] = useState("");
  const [signupPasswordConfirmValue, setSignupPasswordConfirmValue] =
    useState("");
  const [errroMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const handleEmailChange = (event) => {
    setSignupValue(event.target.value);

    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        event.target.value,
      )
    ) {
      setEmailError("");
      return true;
    }
    setEmailError("Email is not valid");
    return false;
  };

  const handlePasswordChange = (event) => {
    setSignupPasswordValue(event.target.value);
    // if (event.target.value.length > 5) {
    //   setPasswordError("");
    //   return true;
    // }
    // setPasswordError("Password must be at least 6 characters");
    // return false;
  };

  const handlePasswordConfirmChange = (event) => {
    setSignupPasswordConfirmValue(event.target.value);
    // if (event.target.value === signupPasswordValue) {
    //   setPasswordConfirmError("");
    //   return true;
    // }
    // setPasswordConfirmError("Passwords do not match");
    // return false;
  };

  const handleSignupUser = () => {
    if (signupPasswordValue.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    if (signupPasswordValue !== signupPasswordConfirmValue) {
      setPasswordConfirmError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    const data = {
      name: nameValue,
      email: signupValue,
      password: signupPasswordValue,
      confirmPassword: signupPasswordConfirmValue,
    };

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/register`, data)
      .then((res) => {
        // props.history.push("/");
        loginUser(
          userDispatch,
          res.data,
          signupValue,
          signupPasswordValue,
          props.history,
          setIsLoading,
          setError,
        );
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });
  };

  const handleLoginUser = () => {
    setIsLoading(true);
    const data = {
      email: loginValue,
      password: loginPasswordValue,
    };

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/login`, data)
      .then((res) => {
        console.log(res);
        loginUser(
          userDispatch,
          res.data,
          loginValue,
          loginPasswordValue,
          props.history,
          setIsLoading,
          setError,
        );
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="Sign up" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h2" className={classes.greeting}>
                Welcome Back!
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                // onChange={(e) => setLoginValue(e.target.value)}
                onChange={(e) => {
                  setLoginValue(e.target.value);
                  setErrorMessage("");
                }}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginPasswordValue}
                onChange={(e) => {
                  setLoginPasswordValue(e.target.value);
                  setErrorMessage("");
                }}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />

              <Typography className={classes.loginError}>
                {errroMessage}
              </Typography>

              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || loginPasswordValue.length === 0
                    }
                    onClick={handleLoginUser}
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.submitButton}
                  >
                    Login
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Full Name"
                type="text"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={signupValue}
                onChange={handleEmailChange}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
                helperText={emailError}
                FormHelperTextProps={{
                  classes: {
                    root: classes.root,
                  },
                }}
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={signupPasswordValue}
                onChange={handlePasswordChange}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
                helperText={passwordError}
                FormHelperTextProps={{
                  classes: {
                    root: classes.root,
                  },
                }}
              />

              <TextField
                id="confirmPassword"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={signupPasswordConfirmValue}
                onChange={handlePasswordConfirmChange}
                margin="normal"
                placeholder="Confirm Password"
                type="password"
                fullWidth
                helperText={passwordConfirmError}
                FormHelperTextProps={{
                  classes: {
                    root: classes.root,
                  },
                }}
              />

              <Typography className={classes.loginError}>
                {errroMessage}
              </Typography>

              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={handleSignupUser}
                    disabled={
                      signupValue.length === 0 ||
                      signupPasswordValue.length <= 5 ||
                      nameValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
