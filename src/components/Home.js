import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import { useAuth } from '../contexts/AuthContext';
import {
  retrievePopularPosts,
  retrieveRecentPosts,
  retrieveFollowing,
} from '../services/firebase-api';
import Loading from './Loading';

export default function Home({
  notificationCount,
  setPosts,
  toggleLoginModal,
  loginModal,
  nav,
  setNav,
  setPostsLoading,
  setFollowing,
  postsLoading,
  setLoading,
  loading,
  loadingData,
}) {
  const { loadUser, currentUser } = useAuth();
  const currentUserId = currentUser?.uid;

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
    switch (nav?.count) {
      case 0:
        setPostsLoading(true);
        popularPosts().then((data) => {
          setPosts(data);
          setPostsLoading(false);
        });
        break;
      case 3:
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
      {loading === false && loadingData === false ? (
        <Dashboard
          nav={nav}
          setNav={setNav}
          toggleLoginModal={toggleLoginModal}
          loginModal={loginModal}
          notificationCount={notificationCount}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
