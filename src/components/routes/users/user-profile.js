import { useState, useEffect, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../../../css-components/dashboard.css';
import { useAuth } from '../../../contexts/auth-context';
import { useParams } from 'react-router-dom';
import '../../../css-components/user-profile.css';
import { Skeleton } from '@material-ui/lab';
import { useTheme } from '../../../contexts/theme-context';
import { retrieveProfileData } from '../../../services/firebase-api';
import Smile from '../../../assets/smile.png';
import FollowingButton from '../../card/following-button';
import FollowButton from '../../card/follow-button';
import { t } from 'i18next';
import LoadingSpinner from '../../loading-spinner';
import { useLocation } from 'react-router-dom';
import Card from '../../card/card';
import { navigation } from '../../../constants/navigation';
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
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'var(--shadow)',
    width: '40vw',
    minWidth: '300px',
    height: '35vh',
  },
}));

export default function UserProfile({
  following,
  loading,
  setLoadingData,
  setNav,
  toggleLoginModal,
  ...props
}) {
  useLayoutEffect(() => {
    // Any navigation number is set to null to hide styling
    setNav(navigation.PROFILE);

    // Scroll to top (regardless of previous scroll position) to see full profile
    /* settimeout make sure this run after components have rendered. This will help fixing bug for some views where scroll to top not working perfectly */
    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 0);
  }, [setNav]);

  const location = useLocation();
  const { profileUserId } = location?.state ?? {};

  let params = useParams();
  const { userId } = params;
  const classes = useStyles();
  const [activeFilter, setActiveFilter] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [profilePicture, setProfilePicture] = useState(null);
  const [title, setTitle] = useState('');
  const [numberOfFollowing, setNumberOfFollowing] = useState(0);

  const [usersMemes, setUsersMemes] = useState([]);
  const [followsUserAccount, setFollowsAccount] = useState(true);

  const [memesCreated, setMemesCreated] = useState(0);
  const [retrievingData, setRetrievingData] = useState(true);
  const [loadingMemes, setLoadingMemes] = useState(true);

  const { accentColor } = useTheme();
  const { currentUser, likedPosts, accountsUserFollows } = useAuth();

  const isSameUser = currentUser?.uid === profileUserId;

  useLayoutEffect(() => {
    setActiveFilter(navigation.PROFILE);
  }, []);

  useEffect(() => {
    if (!isSameUser && accountsUserFollows.includes(profileUserId)) {
      setFollowsAccount(true);
    } else setFollowsAccount(false);
  }, [accountsUserFollows, isSameUser, profileUserId]);

  useEffect(() => {
    //load the last 5 of the users posts
    async function loadProfilePosts() {
      try {
        const result = await retrieveProfileData(profileUserId);
        const { createdPosts, followers, following, userTitle, memeArray } =
          result;
        setUsersMemes([...memeArray]);
        setFollowers(followers?.length || 0);
        setMemesCreated(createdPosts?.length || 0);
        setNumberOfFollowing(following?.length || 0);

        isSameUser
          ? setProfilePicture(memeArray[0].authorPic)
          : setProfilePicture('');
        // avatar
        //   ? setProfilePicture(avatar)
        //   : hasAtLeastOneMeme
        //   ? setProfilePicture(memeArray[0]?.authorPic)
        //   : setProfilePicture(null);
        setTitle(userTitle);
        setRetrievingData(false);
        setLoadingMemes(false);
      } catch (err) {
        console.error(err);
      }
    }
    if (profileUserId) {
      loadProfilePosts();
    }
  }, [profileUserId, isSameUser]);

  useEffect(() => {
    let profileName = '';
    if (currentUser) {
      profileName = params.userId;
    }
    document.title = `Memesfr - ${profileName}`;
  }, [params.userId, currentUser]);

  const ProfileDisplay = () => {
    return (
      <div className="user-profile-container">
        {retrievingData ? (
          <>
            <LoadingSpinner />
          </>
        ) : (
          <div className="user-profile">
            <div className="user-profile-cover-photo"></div>
            <div>
              <div className="user-avatar-container">
                {profilePicture === null || !profilePicture ? (
                  <div
                    className="user-avatar"
                    style={{ backgroundColor: 'var(--hover)' }}
                  >
                    <img
                      alt="The user's avatar"
                      src={Smile}
                      className="user-avatar"
                    />
                  </div>
                ) : (
                  <img
                    alt="The user's avatar"
                    className="user-avatar"
                    src={profilePicture}
                  />
                )}
              </div>
            </div>

            <span className="user-username">{params?.userId}</span>
            {title && (
              <div className="title-container">
                <span>{title}</span>
              </div>
            )}
            <div className="user-profile-stats">
              <div className="user-stat-group">
                <span className="user-follower-count">{followers}</span>
                <span className="user-stat-title">{t('followers')}</span>
              </div>
              <div className="user-stat-group">
                <span className="user-follower-count">{numberOfFollowing}</span>
                <span className="user-stat-title">{t('following')}</span>
              </div>

              <div className="user-stat-group">
                <span className="user-bday">{memesCreated} </span>

                <span
                  style={{
                    padding: '0px',
                    margin: '0px !important',
                    display: 'inline',
                  }}
                  className="user-stat-title"
                >
                  {t('memes')}
                </span>
              </div>
            </div>

            {isSameUser ? (
              <div className={'user-follow-button-container'}>
                <div
                  className={`${
                    accentColor === 'green'
                      ? 'user-follow-button-active-alt'
                      : 'user-follow-button'
                  } `}
                >
                  <span>{t('editProfile')} </span>
                </div>
              </div>
            ) : (
              <div className="user-follow-message-container">
                <div className="user-follow-message-padding">
                  <div className="user-follow-button-container">
                    {followsUserAccount ? (
                      <FollowingButton className="user-follow-button-active" />
                    ) : (
                      <FollowButton className="user-follow-button" />
                    )}
                  </div>
                  {followsUserAccount && (
                    <div className="user-follow-button-container">
                      <div
                        className={
                          followsUserAccount
                            ? 'user-follow-button-active'
                            : 'user-follow-button'
                        }
                      >
                        <span>{t('message')}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="user-profile-content">
              <div
                className="user-profile-navigation-container"
                onClick={() => setActiveFilter(0)}
              >
                <span
                  className={
                    activeFilter === 0
                      ? 'user-profile-post-header-active'
                      : 'user-profile-post-header'
                  }
                >
                  {t('posts')}
                </span>
              </div>
              <div
                className="user-profile-navigation-container"
                onClick={() => setActiveFilter(1)}
              >
                <span
                  className={
                    activeFilter === 1
                      ? 'user-profile-post-header-active'
                      : 'user-profile-post-header'
                  }
                >
                  {t('activity')}
                </span>
              </div>
              <div
                className="user-profile-navigation-container"
                onClick={() => setActiveFilter(2)}
              >
                <span
                  className={
                    activeFilter === 2
                      ? 'user-profile-post-header-active'
                      : 'user-profile-post-header'
                  }
                >
                  {t('crowned')}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

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

  return (
    <div className="main-content">
      {currentUser !== undefined ? <ProfileDisplay userId={userId} /> : null}
      {loadingMemes ? (
        <ShowSkeletons />
      ) : (
        usersMemes?.map((item, index) => {
          const id = item?.id;
          let liked = false;
          if (likedPosts?.includes(item.id)) {
            liked = true;
          }

          const likes = item?.likes ?? 0;

          return (
            <Card
              following={followsUserAccount}
              login={toggleLoginModal}
              hearted={liked}
              liked={liked}
              key={id}
              likes={likes}
              item={item}
            />
          );
        })
      )}
    </div>
  );
}
