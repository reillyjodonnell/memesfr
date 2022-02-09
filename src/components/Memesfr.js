import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './SignUp';
import Home from './Home';
import AuthProvider from '../contexts/AuthContext';
import ThemeProvider from '../contexts/ThemeContext';
import MobileProvider from '../contexts/MobileContext';
import CreateProfile from './CreateProfile';
import Edit from './EditProfile';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import UserProfile from './routes/users/UserProfile';
import Notifications from './routes/notifications/Notifications';
import Feed from './routes/home/Feed';
import Settings from './routes/settings/Settings';
import Help from './routes/help/Help';
import Coins from './routes/coins/Coins';
import Messages from './routes/messages/Messages';
import Wallet from './routes/wallet/Wallet';
import LanguageProvider from '../contexts/LanguageContext';
import Create from './routes/create/Create';
import { useTranslation } from 'react-i18next';

export default function Memesfr() {
  const [nav, setNav] = useState({ count: 0 });
  const [notificationCount, setNotificationCount] = useState(69);
  const [posts, setPosts] = useState({});
  const [loginModal, setLoginModal] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);

  const { t, i18n } = useTranslation('common');

  const toggleLoginModal = () => {
    setLoginModal((prev) => !prev);
  };

  useEffect(() => {
    document.title = `🏠 Memesfr - ${t('dankestMemes')}`;
  }, []);

  return (
    <>
      <BrowserRouter>
        <MobileProvider>
          <LanguageProvider>
            <ThemeProvider>
              <AuthProvider>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <Home
                        toggleLoginModal={toggleLoginModal}
                        loginModal={loginModal}
                        setPosts={setPosts}
                        notificationCount={notificationCount}
                        nav={nav}
                        setNav={setNav}
                        setPostsLoading={setPostsLoading}
                        postsLoading={postsLoading}
                      />
                    }
                  >
                    <Route
                      path="/"
                      element={
                        <Feed
                          toggleLoginModal={toggleLoginModal}
                          loginModal={loginModal}
                          postsData={posts}
                          nav={nav}
                          setNav={setNav}
                          postsLoading={postsLoading}
                        />
                      }
                    />
                    <Route path=":userId" element={<UserProfile />}></Route>
                    <Route
                      path="/notifications"
                      element={
                        <Notifications
                          nav={nav}
                          setNav={setNav}
                          notificationCount={notificationCount}
                        />
                      }
                    />

                    <Route path="/settings" element={<Settings />} />
                    <Route path="/coins" element={<Coins />} />
                    <Route path="/help" element={<Help />} />
                    <Route
                      path="/messages"
                      element={<Messages nav={nav} setNav={setNav} />}
                    />
                    <Route
                      path="/wallet"
                      element={<Wallet nav={nav} setNav={setNav} />}
                    />
                    <Route path="/create" element={<Create />} />
                  </Route>
                  <Route path="/signup" element={<Register />} />
                  <Route path="/setup" element={<CreateProfile />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/edit" element={<Edit />} />
                </Routes>
              </AuthProvider>
            </ThemeProvider>
          </LanguageProvider>
        </MobileProvider>
      </BrowserRouter>
    </>
  );
}
