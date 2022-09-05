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
import {
  hasUserLikedPost,
  retrieveFollowing,
} from '../../../services/firebase-api';
const useStyles = makeStyles((theme) => ({
  skeleton: {
    margin: '2rem 1rem',
    width: '35vw',
    minWidth: '500px',
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

  const { currentUser } = useAuth();

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
        const results = await hasUserLikedPost({ currentUser });
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

  const ShowSkeletons = () => {
    return (
      <div className="skeleton-container">
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
      </div>
    );
  };

  // const RecentlyPosted = () => {
  //   let sayingOne = '';
  //   let sayingTwo = '';
  //   if (recentlyUploaded.length === 1) {
  //     sayingTwo = "Here's what you just posted 👇";
  //   }
  //   if (recentlyUploaded.length > 1) {
  //     sayingOne = 'Keep it up memelord';
  //   }
  //   if (nav === 0 && recentlyUploaded.length > 0) {
  //     return (
  //       <>
  //         <div
  //           style={{
  //             height: '100%',
  //             display: 'flex',
  //             flexDirection: 'column',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             width: 'auto',
  //             margin: '1rem',
  //           }}
  //         >
  //           <div
  //             style={{
  //               textAlign: 'center',
  //               display: 'block',
  //               padding: '1rem',
  //               color: 'white',
  //               height: '100%',
  //               width: '100%',
  //             }}
  //           >
  //             <span style={{ whiteSpace: 'pre-wrap', fontSize: '1.2rem' }}>
  //               {sayingOne}
  //             </span>
  //             <br />
  //             <span style={{ whiteSpace: 'nowrap', fontSize: '1.2rem' }}>
  //               {sayingTwo}
  //             </span>
  //           </div>
  //         </div>
  //         {recentlyUploaded.map((item) => {
  //           return (
  //             <Card
  //               key={item.id}
  //               item={item}
  //               toggleLoginModal={toggleLoginModal}
  //             ></Card>
  //           );
  //         })}
  //       </>
  //     );
  //   }
  //   return null;
  // };

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

      {/* <RecentlyPosted /> */}

      {!props.postsLoading && nav !== 4 && (
        <div className="end-of-memes">
          <span>End of the memes 😢</span>
        </div>
      )}
    </div>
  );
}
