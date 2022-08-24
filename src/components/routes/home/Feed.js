import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '../../card/card';
import '../../../css-components/dashboard.css';
import { useAuth } from '../../../contexts/auth-context';
import { useMobile } from '../../../contexts/mobile-context';
import '../../../css-components/routes/home/feed.css';
import MobileHeader from '../../mobile-header';
import Swipable from './swipable';
import { retrieveFollowing } from '../../../services/firebase-api';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: '#1098F7',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    fontSize: '2rem',
    cursor: 'pointer',
    marginRight: 'auto',
    overflow: 'visible',
  },
  drawerRoot: {
    position: 'sticky',
    left: 0,
  },
  drawerPaper: {
    top: '74px',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100%',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  loginregister: {
    marginLeft: 'auto',
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    cursor: 'pointer',
    '@media (max-width: 650px)': {
      display: 'none',
    },
  },

  image: {
    marginRight: '1rem',
  },
  skeleton: {
    margin: '1rem',

    width: '35vw',
    minWidth: '300px',
    height: '35vh',
  },
}));

export default function Feed(props) {
  const classes = useStyles();
  const [posts, setPosts] = useState([{}]);
  const [activeVideoURL, setActiveVideoURL] = useState('');
  const [usersLikedPosts, setUsersLikedPosts] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);

  const { toggleLoginModal, nav } = props;

  const { currentUser, hasUserLikedPost } = useAuth();

  useEffect(() => {
    const getFollowingUsers = async () => {
      const id = currentUser?.uid;
      const following = await retrieveFollowing(id);
      setFollowingUsers(following);
    };
    getFollowingUsers();
  }, [currentUser]);

  useEffect(() => {
    async function match() {
      if (currentUser) {
        const results = await hasUserLikedPost();
        let [{ likedPosts }, { heartedPosts }] = results;
        setUsersLikedPosts(likedPosts);
      }
    }
    match();
  }, [currentUser]);

  useEffect(() => {
    if (props.postsData.length === undefined) {
      return;
    } else {
      setPosts(props.postsData);
    }
  }, [props.postsData]);

  const { isMobile } = useMobile();

  const { recentlyUploaded } = useAuth();

  const ShowSkeletons = () => {
    return (
      <>
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
      </>
    );
  };

  const RecentlyPosted = () => {
    let sayingOne = '';
    let sayingTwo = '';
    if (recentlyUploaded.length === 1) {
      sayingTwo = "Here's what you just posted 👇";
    }
    if (recentlyUploaded.length > 1) {
      sayingOne = 'Keep it up memelord';
    }
    if (nav === 0 && recentlyUploaded.length > 0) {
      return (
        <>
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'auto',
              margin: '1rem',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                display: 'block',
                padding: '1rem',
                color: 'white',
                height: '100%',
                width: '100%',
              }}
            >
              <span style={{ whiteSpace: 'pre-wrap', fontSize: '1.2rem' }}>
                {sayingOne}
              </span>
              <br />
              <span style={{ whiteSpace: 'nowrap', fontSize: '1.2rem' }}>
                {sayingTwo}
              </span>
            </div>
          </div>
          {recentlyUploaded.map((item) => {
            return (
              <Card
                key={item.id}
                item={item}
                toggleLoginModal={toggleLoginModal}
              ></Card>
            );
          })}
        </>
      );
    }
    return null;
  };

  return isMobile ? (
    <div className="home-content-mobile">
      <div className="home-mobile-scroll"></div>
      {/* <FullscreenPlayer activeVideoURL={activeVideoURL} /> */}
      <MobileHeader activeUser={currentUser} />
      <Swipable setActiveVideoURL={setActiveVideoURL} />

      {/* <SideCrownContainer />
      <div className="home-content-user-information">
        <div className="home-content-username-and-title">
          <span className="home-content-username">@Reilly</span>
          <span className="home-content-title">This is a sample 😂</span>
        </div>
        <div className="home-content-avatar">
          <User className="home-content-avatar-image" />
        </div>
      </div> */}
    </div>
  ) : (
    <div className="main-content">
      {props.postsLoading ? (
        <ShowSkeletons />
      ) : !props.postsLoading && posts ? (
        posts.length !== undefined &&
        posts.map((item, index) => {
          console.log(item);
          let liked = false;
          let hearted = false;
          let following = false;
          if (usersLikedPosts?.includes(item.id)) {
            liked = true;
          }
          if (followingUsers?.includes(item.author)) {
            following = true;
          }
          return (
            <Card
              following={following}
              login={toggleLoginModal}
              hearted={hearted}
              liked={liked}
              key={index}
              likedPosts={usersLikedPosts}
              item={item}
              toggleLoginModal={toggleLoginModal}
            ></Card>
          );
        })
      ) : null}

      <RecentlyPosted />

      {!props.postsLoading && nav !== 4 && (
        <div className="end-of-memes">
          <span>End of the memes 😢</span>
        </div>
      )}
    </div>
  );
}
