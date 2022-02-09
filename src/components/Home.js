import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import { useAuth } from '../contexts/AuthContext';
import Loading from './Loading';
import { retrievePopularPosts } from '../services/firebase-api';

export default function Home({
  notificationCount,
  setPosts,
  login,
  loginModal,
  nav,
  setNav,
}) {
  const [loading, setLoading] = useState(true);
  const { loadUser, currentUser } = useAuth();

  useEffect(() => {
    async function retrievePosts() {
      const postsPromises = await retrievePopularPosts();
      const retrieveData = Promise.all(postsPromises).then((data) => {
        return data;
      });
      return retrieveData;
    }
    retrievePosts().then((data) => {
      // console.log(data);
      setPosts(data);
    });
  }, []);

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
            login={login}
            loginModal={loginModal}
            notificationCount={notificationCount}
          />
        </>
      )}
    </>
  );
}
