import React, { useState, useEffect } from 'react';
import Login from './login';
import Register from './signup';
import Home from './home';
import MobileProvider from '../contexts/mobile-context';
import CreateProfile from './create-profile';
import Edit from './edit-profile';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import UserProfile from './routes/users/user-profile';
import Notifications from './routes/notifications/notifications';
import Feed from './routes/home/feed';
import Settings from './routes/settings/settings';
import Help from './routes/help/help';
import Coins from './routes/coins/coins';
import Messages from './routes/messages/messages';
import Wallet from './routes/wallet/wallet';
import LanguageProvider from '../contexts/language-context';
import Create from './routes/create/create';
import { useTranslation } from 'react-i18next';
import AuthenticatedRoute from './routes/authenticated-route';

export default function Memesfr({
  loadingUser,
  setLoadingUser,
  loadingData,
  setLoadingData,
}) {
  const [nav, setNav] = useState(-1);
  const [notificationCount, setNotificationCount] = useState(69);
  const [posts, setPosts] = useState({});
  const [following, setFollowing] = useState([]);
  const [loginModal, setLoginModal] = useState(false);

  const [postsLoading, setPostsLoading] = useState(false);

  const { t, i18n } = useTranslation('common');

  const toggleLoginModal = () => {
    setLoginModal((prev) => !prev);
  };

  useEffect(() => {
    document.title = `🏠 Memesfr - ${t('dankestMemes')}`;
  }, [t]);

  return (
    <>
      <BrowserRouter>
        <MobileProvider>
          <LanguageProvider>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Home
                    loadingUser={loadingUser}
                    setLoading={setLoadingUser}
                    setFollowing={setFollowing}
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
                      following={following}
                      toggleLoginModal={toggleLoginModal}
                      loginModal={loginModal}
                      postsData={posts}
                      nav={nav}
                      setNav={setNav}
                      postsLoading={postsLoading}
                    />
                  }
                />
                <Route
                  path=":userId"
                  element={
                    <UserProfile
                      // loading={loading}
                      // postsLoading={loading}
                      toggleLoginModal={toggleLoginModal}
                      setLoadingData={setLoadingData}
                      following={following}
                      setNav={setNav}
                    />
                  }
                ></Route>
                <Route
                  path="/notifications"
                  element={
                    <AuthenticatedRoute>
                      <Notifications
                        nav={nav}
                        setNav={setNav}
                        notificationCount={notificationCount}
                      />
                    </AuthenticatedRoute>
                  }
                />

                <Route path="/settings" element={<Settings />} />
                <Route path="/coins" element={<Coins />} />
                <Route path="/help" element={<Help />} />
                <Route
                  path="/messages"
                  element={
                    <AuthenticatedRoute>
                      <Messages setNav={setNav} />
                    </AuthenticatedRoute>
                  }
                />

                <Route
                  path="/create"
                  element={<Create nav={nav} setNav={setNav} />}
                />
              </Route>
              <Route path="/signup" element={<Register />} />
              <Route path="/setup" element={<CreateProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/help" element={<Help />} />
              <Route path="/edit" element={<Edit />} />
            </Routes>
          </LanguageProvider>
        </MobileProvider>
      </BrowserRouter>
    </>
  );
}
