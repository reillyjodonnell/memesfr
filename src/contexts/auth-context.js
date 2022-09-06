import React, { useState, useEffect, useContext } from 'react';
import { auth, db } from '../services/firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children, setLoadingUser }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [notConfirmedEmail, setNotConfirmedEmail] = useState(false);
  const [username, setUsername] = useState('');
  const [likedPosts, setLikedPosts] = useState([]);
  const [accountsUserFollows, setAccountsUserFollows] = useState([]);

  const user = auth.currentUser;

  // // Here we're syncing the avatar in the JWT to the database
  // useEffect(() => {
  //   async function setPhotoToDatabase() {
  //     try {
  //       const userRef = await db.collection('users').doc(user?.uid);
  //       userRef.set(
  //         {
  //           avatar: user?.photoURL,
  //         },
  //         { merge: true }
  //       );
  //     } catch (err) {
  //     }
  //   }
  //   setPhotoToDatabase();
  // }, [user]);

  useEffect(() => {
    async function retrieveUsername() {
      const res = await db.collection('users')?.doc(user?.uid).get();
      const username = res?.data()?.username ?? '';
      const likedPosts = res?.data()?.likedPosts ?? [];
      const following = res?.data()?.following ?? [];

      setLikedPosts([...likedPosts]);
      setAccountsUserFollows([...following]);
      setUsername(username);
      setCurrentUser((prev) => {
        return { ...prev, username };
      });
    }
    if (user) {
      retrieveUsername();
    }
  }, [user]);

  // uid &&
  //   db
  //     .collection('users')
  //     .doc(user?.uid)
  //     .get('username')
  //     .then((res) => {
  //       const username = res?.data()?.username ?? null;
  //       formattedUser.username = username;
  //     });

  // const formattedUser = {
  //   // we will need the display name (whatever that may be)
  //   displayName: user?.displayName ?? '',
  //   // the actual username from the users document
  //   username: '',
  //   // their photoUrl / image
  //   image: user?.photoURL ?? '',
  //   // their uid
  //   uid: user?.uid,
  // };

  useEffect(() => {
    setLoadingUser(true);
    let mount = true;
    if (mount === true) {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
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
        } else {
          setLoadingUser(false);
        }
      });
      return unsubscribe;
    }
    return () => (mount = false);
  }, [setLoadingUser]);

  const values = {
    currentUser,
    setCurrentUser,
    notConfirmedEmail,
    likedPosts,
    accountsUserFollows,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
