import React, { useEffect } from 'react';
import Dashboard from './dashboard';
import { useAuth } from '../contexts/auth-context';
import {
  retrievePopularPosts,
  retrieveRecentPosts,
  retrieveFollowing,
} from '../services/firebase-api';
import { navigation } from '../constants/navigation';

export default function Home({
  notificationCount,
  setPosts,
  toggleLoginModal,
  loginModal,
  nav,
  setNav,
  setPostsLoading,
  setFollowing,
}: any) {
  const { currentUser } = useAuth();
  const currentUserId = currentUser?.uid;

  useEffect(() => {
    const accountsUserIsFollowing = async () => {
      const followingData = await retrieveFollowing(currentUserId);
      return followingData;
    };
    if (currentUser) {
      accountsUserIsFollowing().then((data) => {
        setFollowing(data);
      });
    }
  }, [currentUserId, setFollowing, currentUser]);

  useEffect(() => {
    async function retrievePopular() {
      const popPosts = await retrievePopularPosts();
      setPosts(popPosts);
      if (popPosts) setPostsLoading(false);
    }
    async function retrieveRecent() {
      const response = await retrieveRecentPosts();
      setPosts(response);
      if (response) setPostsLoading(false);
    }

    setPostsLoading(true);
    if (nav === navigation.HOME) {
      retrievePopular();
    }
    if (nav === navigation.RECENT) {
      retrieveRecent();
    }
  }, [nav, setPosts, setPostsLoading]);

  return (
    <>
      <Dashboard
        nav={nav}
        setNav={setNav}
        toggleLoginModal={toggleLoginModal}
        loginModal={loginModal}
        notificationCount={notificationCount}
      />
    </>
  );
}
