import { useState, useEffect, useLayoutEffect } from 'react';
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
import Skeleton from '../../templates/skeleton';
import { navigation } from '../../../constants/navigation';
import FullscreenPlayer from './fullscreen-player';

export default function Feed(props) {
  const [posts, setPosts] = useState([{}]);
  const [activeVideoURL, setActiveVideoURL] = useState('');
  const [usersLikedPosts, setUsersLikedPosts] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);

  const { toggleLoginModal, nav, setNav } = props;

  const { currentUser } = useAuth();

  useLayoutEffect(() => {
    setNav(navigation.HOME);
  }, [setNav]);

  useEffect(() => {
    const getFollowingUsers = async () => {
      const id = currentUser?.uid;
      const following = await retrieveFollowing(id);
      setFollowingUsers(following);
    };
    if (currentUser) getFollowingUsers();
  }, [currentUser]);

  useEffect(() => {
    async function match() {
      if (currentUser) {
        const results = await hasUserLikedPost({ currentUser });
        let [{ likedPosts }] = results;
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
    const n = 20;
    return [...Array(n)].map((e, i) => <Skeleton key={`skeleton-${i}`} />);
  };

  const openFullScreen = () => {};

  return isMobile ? (
    <div className="home-content-mobile">
      <div className="home-mobile-scroll"></div>
      <FullscreenPlayer activeVideoURL={activeVideoURL} />
      <MobileHeader activeUser={currentUser} />
      <Swipable setActiveVideoURL={setActiveVideoURL} />
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
          const { id } = item;
          if (currentUser && usersLikedPosts?.includes(item.id)) {
            liked = true;
          }
          if (currentUser && followingUsers?.includes(item.author)) {
            following = true;
          }
          const likes = item?.likes ?? 0;
          return (
            <Card
              enableFullScreen={openFullScreen}
              following={following}
              login={toggleLoginModal}
              hearted={hearted}
              liked={liked}
              key={`meme-${id}`}
              likedPosts={usersLikedPosts}
              uniqueId={id}
              likes={likes}
              item={item}
            ></Card>
          );
        })
      ) : null}

      {!props.postsLoading && nav !== 4 && (
        <div className="end-of-memes">
          <span>End of the memes 😢</span>
        </div>
      )}
    </div>
  );
}
