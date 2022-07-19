// import React, { useState, useRef } from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import IconButton from '@material-ui/core/IconButton';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import { InputAdornment } from '@material-ui/core';
// import Container from '@material-ui/core/Container';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import { useAuth } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { ReactComponent as Castle } from '../Assets/SVGs/castle.svg';
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

// function Copyright() {
//   return (
//     <>
//       <Typography
//         variant="body2"
//         style={{ color: 'white', marginTop: '5rem', cursor: 'pointer' }}
//         color="textSecondary"
//         align="center"
//       >
//         {'Copyright © '}
//         <Link color="inherit" href="https://memesfr.com/">
//           Memesfr
//         </Link>{' '}
//         {new Date().getFullYear()}
//         {'.'}
//       </Typography>
//     </>
//   );
// }

// const theme = createMuiTheme({
//   overrides: {
//     MuiOutlinedInput: {
//       root: {
//         '& $notchedOutline': {
//           borderColor: 'white',
//           backgroundColor: '#e3e3e34a',
//           color: 'black',
//         },
//         '&:hover $notchedOutline': {
//           borderColor: 'white',
//         },
//         '&$focused $notchedOutline': {
//           borderColor: 'white',
//         },
//       },
//     },
//   },
// });

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiPaper-root': {
//       backgroundColor: '#272932',
//     },

//     '& label.Mui-focused': {
//       color: 'white',
//     },
//   },

//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },

//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//     height: '48px',
//     background: 'linear-gradient(350deg,  #EA3788, #00A7E1)',
//   },
//   orparent: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   or: {
//     display: 'flex',
//     justifySelf: 'center',
//     alignSelf: 'center',
//     textAlign: 'center',
//   },
//   textfield: {
//     color: 'white',
//     '& $notchedOutline': {
//       //add this nested selector
//       borderColor: 'red',
//     },
//   },
// }));

// export default function SignUp() {
//   const classes = useStyles();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [signedIn, signedInFunction] = useState(false);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [emailError, setEmailError] = useState(false);
//   const [emailErrorMessage, setEmailErrorMessage] = useState();

//   const [passwordError, setPasswordError] = useState(false);
//   const [passwordErrorMessage, setPasswordErrorMessage] = useState();

//   const [showPassword, showPasswordFunction] = useState(false);

//   const emailRef = useRef();
//   const usernameRef = useRef();
//   const passwordRef = useRef();

//   const navigate = useNavigate();

//   const { signup, sendAuthEmail } = useAuth();

//   const [userCreation, setUserCreation] = useState(false);
//   //when the user becomes active, that means the email and pass is valid,
//   //This useEffect will only execute once, when the userCreation is true

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setUserCreation(false);
//     setLoading(true);

//     let email = emailRef.current.value;
//     let password = passwordRef.current.value;

//     try {
//       setError('');
//       await signup(email, password)
//         .then((err) => {
//           if (!err) {
//             window.alert('Success');
//             setUserCreation(true);
//           }
//           if (err) {
//             setError('Email is already in use');
//             setEmailError(true);
//           }
//         })
//         .catch((err) => {});

//       setLoading(false);
//     } catch {}
//     return;
//   }

//   const emailRegEx =
//     /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

//   const passwordRegEx = /^(?=.*[a-zA-z])(?=.*\d).{8,}$/;

//   const checkEmailError = (e) => {
//     setError(false);
//     setEmail(e.target.value);
//     if (e.target.value.match(emailRegEx)) {
//       setEmailErrorMessage('');
//       setEmailError(false);
//       setLoading(false);
//     } else {
//       setEmailErrorMessage('Invalid');
//       setEmailError(true);
//     }
//   };
//   const checkPasswordError = (e) => {
//     setPassword(e.target.value);
//     if (e.target.value.match(passwordRegEx)) {
//       setPasswordErrorMessage('');
//       setPasswordError(false);
//     } else {
//       setPasswordErrorMessage(
//         'Invalid password. Must be at least 8 characters, one letter and one number'
//       );
//       setPasswordError(true);
//     }
//   };
//   function enablePassword() {
//     showPasswordFunction(!showPassword);
//   }
//   function redirectToLogin() {
//     navigate('/login');
//   }

//   const ConfirmEmailAddress = () => {
//     return (
//       <>
//         <span style={{ padding: '1rem' }}>
//           Check your inbox to confirm it's you
//         </span>
//         <span style={{ padding: '1rem' }}>
//           Already clicked the link? Refresh the page
//         </span>
//         <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
//           Didn't get it?
//         </span>
//       </>
//     );
//   };

//   //When a user submits an email we need to check two things:
//   // 1. Is that email already in use?
//   // 2. If not, they need to confirm it's theirs by confirming via email

//   return (
//     <MuiThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline>
//           <div className={classes.paper}>
//             <div onClick={() => navigate('/')} className="login-logo">
//               <Castle />
//               <span>Memesfr</span>
//             </div>

//             {alert && (
//               <span style={{ paddingTop: '1rem', color: 'red' }}>{error}</span>
//             )}
//             {userCreation ? (
//               <ConfirmEmailAddress />
//             ) : (
//               <>
//                 <form
//                   onSubmit={handleSubmit}
//                   className={classes.form}
//                   noValidate
//                 >
//                   <Grid className={classes.root} container spacing={2}>
//                     <Grid item xs={12}>
//                       <TextField
//                         inputRef={emailRef}
//                         variant="outlined"
//                         required
//                         fullWidth
//                         value={email}
//                         onChange={(e) => checkEmailError(e)}
//                         id="email"
//                         label="Email Address"
//                         name="email"
//                         autoComplete="email"
//                         helperText={emailErrorMessage}
//                         error={emailError}
//                         InputProps={{
//                           className: 'textfield',
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         inputRef={passwordRef}
//                         variant="outlined"
//                         required
//                         fullWidth
//                         onChange={(e) => checkPasswordError(e)}
//                         value={password}
//                         name="password"
//                         label="Password"
//                         type={showPassword ? 'text' : 'password'}
//                         id="password"
//                         autoComplete="current-password"
//                         helperText={passwordErrorMessage}
//                         error={passwordError}
//                         InputProps={{
//                           className: 'textfield',
//                         }}
//                         InputProps={{
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <IconButton
//                                 aria-label="toggle password visibility"
//                                 edge="end"
//                                 onClick={enablePassword}
//                               >
//                                 {showPassword ? (
//                                   <Visibility />
//                                 ) : (
//                                   <VisibilityOff />
//                                 )}
//                               </IconButton>
//                             </InputAdornment>
//                           ),
//                         }}
//                       />
//                     </Grid>
//                   </Grid>
//                   <Button
//                     disabled={loading}
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     color="primary"
//                     className={classes.submit}
//                   >
//                     Sign Up
//                   </Button>

//                   <div className={classes.social}></div>

//                   <Grid container justify="flex-start">
//                     <Grid item>
//                       <Link
//                         style={{ color: '#129eda' }}
//                         onClick={redirectToLogin}
//                         href="#"
//                         variant="body2"
//                       >
//                         Already have an account? Sign in
//                       </Link>
//                     </Grid>
//                   </Grid>
//                 </form>
//               </>
//             )}
//           </div>
//           <Box mt={5}>
//             <Copyright />
//           </Box>
//         </CssBaseline>
//       </Container>
//     </MuiThemeProvider>
//   );
// }
import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { ReactComponent as Castle } from '../assets/svg/castle.svg';
import '../css-components/login.css';
import { InputAdornment } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import Doge from '../assets/buff-doge.jpg';
import firebase from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';

import { useTranslation } from 'react-i18next';

const theme = createTheme({
  overrides: {
    MuiInputBase: {
      root: {},
      input: {
        zIndex: 1,
        color: 'var(--text-color)',
      },
      label: {
        color: 'var(--secondary-text-color)',
      },
    },
    MuiInputLabel: {
      outlined: {
        color: 'var(--secondary-text-color)',
      },
    },
    MuiIconButton: {
      root: {
        zIndex: 2,
      },
      label: {
        color: 'var(--secondary-text-color)',
      },
    },

    MuiOutlinedInput: {
      root: {
        '& $notchedOutline': {
          borderColor: 'var(--line)',
          backgroundColor: 'var(--bg)',
          color: 'var(--text-color)',
        },
        textColor: 'var(--text-color)',
        '&:hover $notchedOutline': {
          borderColor: 'var(--line)',
        },
        '&$focused $notchedOutline': {
          borderColor: 'var(--hover)',
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  multilineColor: {
    color: 'red',
  },
  root: {
    height: '100vh',
    '& .MuiPaper-root': {
      backgroundColor: 'var(--bg)',
    },
    '& label.Mui-focused': {
      color: 'var(--text-color)',
    },
    '& label.Mui': {
      color: 'var(--primary-accent)',
    },
    color: 'var(--text-color)',
  },
  image: {
    backgroundImage: `url(${Doge})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: 'var(--primary-accent)',
    height: '56px',
  },
  inputField: {},
}));

export default function Login() {
  const [error, setError] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showPassword, showPasswordFunction] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const classes = useStyles();

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const { login } = useAuth();
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    let mount = true;
    if (mount === true) {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
      });
      return unsubscribe;
    }
    return () => (mount = false);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    try {
      await login(email, password)
        .then((user) => {
          navigate('/');
        })
        .catch((err) => {
          setError('Failed to log in');
        });
    } catch {}
  }
  function redirectToSignup() {
    navigate('/signup');
  }
  function enablePassword() {
    showPasswordFunction(!showPassword);
  }

  return (
    <div className="login-container">
      <MuiThemeProvider theme={theme}>
        <Grid container component="main" className={classes.root}>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <div onClick={() => navigate('/')} className="login-logo">
                <Castle />
                <span>Memesfr</span>
              </div>

              {error ? (
                <span
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    padding: '1rem',
                    color: 'red',
                  }}
                >
                  Invalid email or password. Please double-check and try again.
                </span>
              ) : null}
              <form
                onSubmit={(e) => handleSubmit(e)}
                className={classes.form}
                noValidate
              >
                <TextField
                  inputRef={emailRef}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={t('email')}
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  InputProps={{
                    className: classes.inputField,
                  }}
                />
                <TextField
                  inputRef={passwordRef}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={t('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    className: classes.input,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          onClick={enablePassword}
                          inputProps={{ className: classes.input }}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <div className="login-submit-button">
                  <span>{t('signup')}</span>
                </div>

                <div className="login-signup-prompt">
                  <span>{t('alreadyHaveAccount')}</span>
                  <span className="login-signup-prompt-action">
                    {t('login')}
                  </span>
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}
