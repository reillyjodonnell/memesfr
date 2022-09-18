import React, { useState, useEffect, useContext } from 'react';
import { auth, db } from '../services/firebase';
import { retrieveProfile } from '../services/firebase-api';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children, setLoadingUser }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState(false);

  const [notConfirmedEmail, setNotConfirmedEmail] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [accountsUserFollows, setAccountsUserFollows] = useState([]);

  const user = auth.currentUser;

  console.log(user);

  useEffect(() => {
    async function retrieveUsername() {
      const res = await db.collection('users')?.doc(user?.uid).get();
      const username = res?.data()?.username ?? '';
      const likedPosts = res?.data()?.likedPosts ?? [];
      const following = res?.data()?.following ?? [];

      setLikedPosts([...likedPosts]);
      setAccountsUserFollows([...following]);
      setCurrentUser((prev) => {
        return { ...prev, username };
      });
    }
    if (user) {
      retrieveUsername();
    }
  }, [user]);

  useEffect(() => {
    async function checkIfProfileExists(id) {
      try {
        const exists = await retrieveProfile(id);
        if (exists) {
          setNewUser(false);
        } else setNewUser(true);
      } catch (err) {
        console.log(err);
      }
    }

    setLoadingUser(true);
    let mount = true;
    if (mount === true) {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        checkIfProfileExists(user?.uid);
        if (user && !newUser) {
          setCurrentUser(user);
          setLoadingUser(false);

          if (user.emailVerified && user.displayName != null) {
            setCurrentUser(user);
            setLoadingUser(false);
          }
          if (user.displayName && !user.emailVerified) {
            setNotConfirmedEmail(true);
            setLoadingUser(false);
          }
          if (user.emailVerified && user.displayName === null) {
            setCurrentUser(user);
            setLoadingUser(false);

            // navigate('/setup');
          }
        }
        if (user && newUser) {
          setCurrentUser(null);
          setLoadingUser(false);
        } else {
          setCurrentUser(null);
          setLoadingUser(false);
        }
      });
      return unsubscribe;
    }
    return () => (mount = false);
  }, [setLoadingUser, newUser]);

  const values = {
    currentUser,
    setCurrentUser,
    notConfirmedEmail,
    likedPosts,
    accountsUserFollows,
    newUser,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
