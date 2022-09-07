import React, { useState, useEffect } from 'react';
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
}) {
  const { currentUser } = useAuth();
  const currentUserId = currentUser?.uid;

  useEffect(() => {
    setNav(navigation.HOME);
  }, [setNav]);

  useEffect(() => {
    const accountsUserIsFollowing = async () => {
      const followingData = await retrieveFollowing(currentUserId);
      return followingData;
    };
    accountsUserIsFollowing().then((data) => {
      setFollowing(data);
    });
  }, [currentUserId, setFollowing]);

  async function popularPosts() {
    const postsPromises = await retrievePopularPosts();
    const retrieveData = Promise.all(postsPromises).then((data) => {
      return data;
    });
    return retrieveData;
  }

  async function recentPosts() {
    const postsPromises = await retrieveRecentPosts();
    const retrieveData = Promise.all(postsPromises).then((data) => {
      return data;
    });
    return retrieveData;
  }
  useEffect(() => {
    switch (nav) {
      case navigation.HOME:
        setPostsLoading(true);
        popularPosts().then((data) => {
          setPosts(data);
          setPostsLoading(false);
        });
        break;
      case navigation.RECENT:
        setPostsLoading(true);

        recentPosts().then((data) => {
          setPosts(data);
          setPostsLoading(false);
        });
        break;
      default:
        break;
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
