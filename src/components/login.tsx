import { useState, useEffect, useRef } from 'react';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ReactComponent as Castle } from '../assets/svg/castle.svg';
import '../css-components/login.css';
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

export default function Login(): JSX.Element {
  const [error, setError] = useState<String>('');
  const classes = useStyles();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation('common');

  useEffect(() => {
    let mount = true;
    if (mount === true) {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {});
      return unsubscribe;
    }
    return () => (mount = false);
  }, []);

  interface User {}

  interface Error {}

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let email = emailRef?.current?.value;
    let password = passwordRef?.current?.value;

    try {
      await login(email, password)
        .then((user: User) => {
          if (user) {
            navigate('/');
          }
        })
        .catch((err: Error) => {
          if (err) {
            setError('Failed to log in');
          }
        });
    } catch {}
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
                  {t('invalidEmailOrPassword')}
                </span>
              ) : null}
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
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
                  id="password"
                  autoComplete="current-password"
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment position="end">
                  //       <IconButton
                  //         aria-label="toggle password visibility"
                  //         edge="end"
                  //         onClick={enablePassword}
                  //         inputProps={{ className: classes.input }}
                  //       >
                  //         {showPassword ? <Visibility /> : <VisibilityOff />}
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />

                <div className="login-submit-button">
                  <span>{t('login')}</span>
                </div>

                <div className="login-signup-prompt">
                  <span>{t('dontHaveAccount')}</span>
                  <span className="login-signup-prompt-action">
                    {t('signup')}
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
