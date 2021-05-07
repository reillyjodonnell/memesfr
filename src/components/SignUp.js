import React, { useState, useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import firebase from "firebase/app";
import { auth } from "../services/firebase";
import Eye from "../Assets/Icons/Eye.svg";
import EyeHidden from "../Assets/Icons/EyeHidden.svg";
import { InputAdornment } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CreateProfile from "./CreateProfile";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Memesfr
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: "48px",
  },
  orparent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  or: {
    display: "flex",
    justifySelf: "center",
    alignSelf: "center",
    textAlign: "center",
  },
}));

export default function SignUp({ onSuccess }, props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, signedInFunction] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState();

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState();

  const [showPassword, showPasswordFunction] = useState(false);

  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  var actionCodeSettings = {
    url: "http://localhost:3000",
    handleCodeInApp: true,
  };

  const [userCreation, setUserCreation] = useState(false);

  //when the user becomes active, that means the email and pass is valid,
  //This useEffect will only execute once, when the userCreation is true

  useEffect(() => {
    firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
      });
  }, [userCreation]);

  async function handleSubmit(e) {
    e.preventDefault();
    var email = emailRef.current.value;
    var password = passwordRef.current.value;

    try {
      setError("");
      setLoading(true);
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          //Signed in
          console.log(userCredential);
          setUserCreation(true);
        });
    } catch {
      setError("Email is already in use");
      setEmailError(true);
    }

    setLoading(false);

    return;
  }
  console.log(error);

  const emailRegEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const passwordRegEx = /^(?=.*[a-zA-z])(?=.*\d).{8,}$/;

  const checkEmailError = (e) => {
    setError(false);
    setEmail(e.target.value);
    if (e.target.value.match(emailRegEx)) {
      setEmailErrorMessage("");
      setEmailError(false);
    } else {
      setEmailErrorMessage("Invalid");
      setEmailError(true);
    }
  };
  const checkPasswordError = (e) => {
    setPassword(e.target.value);
    if (e.target.value.match(passwordRegEx)) {
      setPasswordErrorMessage("");
      setPasswordError(false);
    } else {
      setPasswordErrorMessage(
        "Invalid password. Must be at least 8 characters, one letter and one number"
      );
      setPasswordError(true);
    }
  };
  function enablePassword() {
    showPasswordFunction(!showPassword);
  }

  const ConfirmEmailAddress = () => {
    return (
      <>
        <CreateProfile />
        <span style={{ padding: "1rem" }}>
          Check your inbox to confirm it's you
        </span>
        <span style={{ textDecoration: "underline", cursor: "pointer" }}>
          Didn't get it?
        </span>
      </>
    );
  };

  //When a user submits an email we need to check two things:
  // 1. Is that email already in use?
  // 2. If not, they need to confirm it's theirs by confirming via email

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {alert && (
          <span style={{ paddingTop: "1rem", color: "red" }}>{error}</span>
        )}
        {userCreation ? (
          <ConfirmEmailAddress />
        ) : (
          <>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    inputRef={emailRef}
                    variant="outlined"
                    required
                    fullWidth
                    value={email}
                    onChange={(e) => checkEmailError(e)}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    helperText={emailErrorMessage}
                    error={emailError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputRef={passwordRef}
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e) => checkPasswordError(e)}
                    value={password}
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    helperText={passwordErrorMessage}
                    error={passwordError}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={enablePassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspirational memes via email ❤️"
                  />
                </Grid>
              </Grid>
              <Button
                disabled={loading}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <div className={classes.orparent}>
                <span className={classes.or}>Or</span>
              </div>

              <div className={classes.social}></div>

              <Grid container justify="flex-end">
                <Grid item>
                  <Link onClick={props.updateRegister} href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </>
        )}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}