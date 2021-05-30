import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { SecondaryListItems } from "./ListItems";
import MainListItems from "./ListItems";
import Crown from "../Assets/Icons/Crown.svg";
import Card from "./Card";
import DropDownMenu from "./DropDownMenu";
import "../CSS Components/Dashboard.css";
import CreatePost from "./CreatePost";
import User from "../Assets/Icons/User.svg";
import firebase from "firebase";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, //keep right padding when drawer closed
    backgroundColor: "#1098F7",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    fontSize: "2rem",
    cursor: "pointer",
    marginRight: "auto",
    overflow: "visible",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  loginregister: {
    marginLeft: "auto",
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    cursor: "pointer",
    "@media (max-width: 650px)": {
      display: "none",
    },
  },

  image: {
    marginRight: "1rem",
  },
  skeleton: {
    margin: "1rem",
    width: "40vw",
    height: "40vh",
  },
}));

export default function Dashboard(props) {
  console.log(props.sample);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [expand, expandMenu] = useState(false);
  const [popularPosts, setPopularPosts] = useState([{}]);
  const [recentPosts, setRecentPosts] = useState([{}]);
  const [randomPosts, setRandomPosts] = useState([{}]);
  const [activeScreen, setActiveScreen] = useState([{}]);
  const [loadAnotherRandomMeme, setLoadAnotherRandomMeme] = useState(false);
  const [active, setActive] = useState(0);

  const [nav, setNav] = useState(0);

  const myRef = useRef(null);

  const {
    currentUser,
    loadingFilter,
    retrievePopularPosts,
    retrieveRecentPosts,
    recentlyUploaded,
    retrieveRandomMeme,
  } = useAuth();

  useEffect(() => {
    console.log(recentlyUploaded);
    console.log(recentlyUploaded.length);
  }, [recentlyUploaded]);

  const history = useHistory();

  var hide = true;

  const openRegister = () => {
    console.log("opening register ");
    history.push("/signup");
  };

  const openSignIn = () => {
    console.log("opening sign in ");
    history.push("/login");
  };

  const handleDrawerOpen = () => {
    console.log("Opening");

    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const openMenu = () => {
    expandMenu(!expand);
  };
  useEffect(() => {
    //Load the popular and recent posts which will show up in state

    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          console.log(result);
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
          console.log(error);
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  }, []);

  function showPopular() {
    setActiveScreen();
    if (recentPosts) {
      setRecentPosts();
    }
    if (randomPosts) {
      setRandomPosts();
    }
    loadPopular().then((items) => {
      console.log(items);
      setPopularPosts(items);
      setActiveScreen(items);
    });
  }

  async function loadPopular() {
    const memeDataPromise = await retrievePopularPosts();
    const memeDataObject = Promise.all(memeDataPromise).then((memeData) => {
      console.log(memeData);
      return memeData;
    });
    return memeDataObject;
  }
  async function loadRecent() {
    const memeDataPromise = await retrieveRecentPosts();
    const memeDataObject = Promise.all(memeDataPromise).then((memeData) => {
      console.log(memeData);
      return memeData;
    });
    return memeDataObject;
  }

  function showRecent() {
    setActiveScreen();
    if (popularPosts) {
      setPopularPosts();
    }
    if (randomPosts) {
      setRandomPosts();
    }
    loadRecent().then((items) => {
      setRecentPosts(items);
      setActiveScreen(items);
    });
  }
  async function loadRandom() {
    const memeDataPromise = await retrieveRandomMeme();

    console.log(memeDataPromise);

    return memeDataPromise;
  }

  function showRandom() {
    setActiveScreen();
    if (popularPosts) {
      setPopularPosts();
    }
    if (recentPosts) {
      setRecentPosts();
    }

    loadRandom().then((items) => {
      console.log(items);
      setRandomPosts(items);
      setActiveScreen(items);
    });
  }

  function filterHome() {
    myRef.current.scrollIntoView({ behavior: "smooth" });
    setNav(0);
  }
  function filterTrending() {
    setNav(1);
  }

  function filterPopular() {
    setNav(2);
  }
  function filterRecent() {
    setNav(3);
  }
  function filterRandom() {
    setNav(4);
    setLoadAnotherRandomMeme((prevState) => !prevState);
  }
  useEffect(() => {
    switch (nav) {
      case 0:
        console.log("Back Home");
        showPopular();
        setActive(0);
        break;
      case 1:
        console.log("On Trending screen");
        showPopular();
        setActive(1);

        break;
      case 2:
        console.log("On popular screen");
        showPopular();
        setActive(2);
        break;
      case 3:
        console.log("On Recent Screen");
        showRecent();
        setActive(3);
        break;
      case 4:
        console.log("Random meme time. nice");
        showRandom();
        setActive(4);
        break;
      default:
        console.log("We are on the homescreen now");
        setActive(0);
    }
  }, [nav, active, showPopular, showRandom, showRecent, loadAnotherRandomMeme]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          ></IconButton>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "auto",
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Memesfr
            </Typography>

            <img className={classes.image} src={Crown}></img>
          </div>

          {currentUser ? null : (
            <div className={classes.loginregister}>
              <Typography
                onClick={openSignIn}
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.register}
              >
                Log In
              </Typography>
              <Typography
                onClick={openRegister}
                component="h1"
                variant="h6"
                color="inherit"
                paddingRight="auto"
                noWrap
                className={classes.login}
              >
                Register
              </Typography>
            </div>
          )}

          <IconButton style={{ marginLeft: "auto" }} color="inherit">
            <Badge badgeContent={1} color="secondary">
              <img onClick={openMenu} src={props.activeUser ? null : User} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems
            active={nav}
            homeFilter={filterHome}
            trendingFilter={filterTrending}
            recentFilter={filterRecent}
            popularFilter={filterPopular}
            randomFilter={filterRandom}
          />
        </List>
        <Divider />
        {hide ? null : (
          <List>
            <SecondaryListItems />
          </List>
        )}
      </Drawer>
      <main className={classes.content}>
        <div ref={myRef} className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={5}></Grid>
          <Box spacing={5} pt={4}>
            <CreatePost />

            <div data-testid="post-1" className="main-content">
              {loadingFilter ? (
                <>
                  <Skeleton className={classes.skeleton} variant="rect" />
                  <Skeleton className={classes.skeleton} variant="rect" />
                </>
              ) : null}

              {recentlyUploaded.length > 0 ? (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "auto",
                    border: "1px solid black",
                    padding: "1rem",
                  }}
                >
                  <span>
                    Your recently posted memes
                    {nav === 0 && recentlyUploaded.length > 0
                      ? recentlyUploaded.map((item) => {
                          console.log("Mapping through array");
                          return <Card item={item}></Card>;
                        })
                      : null}
                  </span>
                </div>
              ) : null}

              {activeScreen && activeScreen.length > 1 ? (
                activeScreen.map((item) => {
                  return <Card item={item} />;
                })
              ) : randomPosts != null ? (
                <Card item={randomPosts}></Card>
              ) : null}
            </div>
          </Box>
        </Container>
        {expand ? <DropDownMenu /> : null}
      </main>
    </div>
  );
}
