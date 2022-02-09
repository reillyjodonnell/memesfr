import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import { useAuth } from '../contexts/AuthContext';
import Loading from './Loading';
import {
  retrievePopularPosts,
  retrieveRecentPosts,
} from '../services/firebase-api';

export default function Home({
  notificationCount,
  setPosts,
  toggleLoginModal,
  loginModal,
  nav,
  setNav,
  setPostsLoading,
}) {
  const [loading, setLoading] = useState(true);
  const { loadUser, currentUser } = useAuth();

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
    switch (nav.count) {
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
  }, [nav]);

  useEffect(() => {
    let mount = true;
    if (mount === true) {
      if (loadUser === false || currentUser === undefined) {
        setLoading(false);
      }
    }

    return () => (mount = false);
  }, [loadUser]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Dashboard
            nav={nav}
            setNav={setNav}
            toggleLoginModal={toggleLoginModal}
            loginModal={loginModal}
            notificationCount={notificationCount}
          />
        </>
      )}
    </>
  );
}
