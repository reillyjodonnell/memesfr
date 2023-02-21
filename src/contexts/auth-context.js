import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../services/firebase';
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

  const user = auth?.currentUser;

  useEffect(() => {
    async function checkIfProfileExists(id) {
      try {
        const profileData = await retrieveProfile(id);
        if (profileData) {
          const username = profileData?.username ?? '';
          const likedPosts = profileData?.likedPosts ?? [];
          const following = profileData?.following ?? [];

          setLikedPosts([...likedPosts]);
          setAccountsUserFollows([...following]);
          const updatedUser = { ...user, username };
          setCurrentUser(updatedUser);
          setNewUser(false);
        } else setNewUser(true);
      } catch (err) {}
    }
    setLoadingUser(true);
    const unsubscribe = auth?.onAuthStateChanged((user) => {
      // This is the JWT provided by Cloud Firestore
      if (user) {
        setLoadingUser(false);
        setCurrentUser(user);
        checkIfProfileExists(user?.uid);

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
        }
      } else {
        setCurrentUser(null);
        setLoadingUser(false);
      }
    });
    return unsubscribe;
  }, [setLoadingUser, newUser, user]);

  const values = {
    currentUser,
    setCurrentUser,
    notConfirmedEmail,
    likedPosts,
    accountsUserFollows,
    newUser,
    setNewUser,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
