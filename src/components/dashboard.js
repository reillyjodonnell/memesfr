import React, { useState } from 'react';
import '../css-components/dashboard.css';
import Sidebar from './sidebar';
import { useAuth } from '../contexts/auth-context';
import { useMobile } from '../contexts/mobile-context';
import { useNavigate } from 'react-router-dom';
import MobileNav from './mobile-nav';
import { Outlet } from 'react-router-dom';
import Topbar from './topbar';
import PopupModal from './templates/popup-modal';
import { useTranslation } from 'react-i18next';
import UserAuth from './auth/auth-container';

export default function Dashboard(props) {
  const [createPost, createPostFunction] = useState(false);
  const [resetPassword, resetPasswordFunction] = useState(false);

  const { toggleLoginModal, loginModal, setNav, nav } = props;

  const { isMobile } = useMobile();

  const { t, i18n } = useTranslation('common');

  const { currentUser, signOut } = useAuth();

  const navigate = useNavigate();

  let username;
  let avatar;

  if (currentUser) {
    username = currentUser.displayName;
    avatar = currentUser.photoURL;
  }

  const createMemePost = () => {
    createPostFunction(!createPost);
  };

  const resetUserPassword = () => {
    document.getElementById('root').style.filter = '';
    resetPasswordFunction(!resetPassword);
  };

  const handleLogout = () => {
    signOut();
  };

  function filterHome() {
    if (nav !== 0) {
      // myRef.current.scrollIntoView({ behavior: 'smooth' });
      setNav({ count: 0 });
      navigate('/');
    }
  }
  function filterTrending() {
    if (nav !== 1) {
      // myRef.current.scrollIntoView({ behavior: 'smooth' });
      setNav({ count: 1 });
    }
  }

  function filterPopular() {
    if (nav !== 2) {
      // myRef.current.scrollIntoView({ behavior: 'smooth' });

      setNav({ count: 2 });
    }
  }
  function filterRecent() {
    navigate('/');

    if (nav !== 3) {
      // myRef.current.scrollIntoView({ behavior: 'smooth' });
      setNav({ count: 3 });
    }
  }
  function filterRandom() {
    setNav({ count: 4 });
  }

  const navigateToProfile = () => {
    setNav({ count: 4 });
    navigate(`/${currentUser.displayName}`);
  };
  const navigateToNotifications = () => {
    setNav({ count: 1 });
    navigate(`/notifications`);
  };
  const navigateToSettings = () => {
    setNav({ count: null });
    navigate('/settings');
  };
  const navigateToCoins = () => {
    setNav({ count: null });
    navigate('/coins');
  };
  const navigateToHelp = () => {
    setNav({ count: null });

    navigate('/help');
  };
  const navigateToMessage = () => {
    setNav({ count: 6 });

    navigate('/messages');
  };
  const navigateToWallet = () => {
    setNav({ count: 7 });

    navigate('/wallet');
  };

  const navigateToCreate = () => {
    setNav({ count: 5 });
    navigate('/create');
  };

  const navigateToLogin = () => {
    setNav({ count: null });
    navigate('/login');
  };

  return (
    <div id="dashboard" className="dashboard">
      <div className="dashboard-content">
        {createPost && (
          <PopupModal
            title={t('createPost')}
            toggleState={createMemePost}
          ></PopupModal>
        )}
        {loginModal ? <UserAuth toggleLoginModal={toggleLoginModal} /> : null}
        {isMobile ? (
          <>
            <Outlet />
            <MobileNav
              active={nav.count}
              homeFilter={filterHome}
              trendingFilter={filterTrending}
              recentFilter={filterRecent}
              popularFilter={filterPopular}
              randomFilter={filterRandom}
              createPost={createMemePost}
              resetPassword={resetUserPassword}
              navigateToCreate={navigateToCreate}
              navigateToLogin={navigateToLogin}
              setNav={setNav}
            />
          </>
        ) : (
          <>
            <Topbar
              homeFilter={filterHome}
              trendingFilter={filterTrending}
              recentFilter={filterRecent}
              popularFilter={filterPopular}
              randomFilter={filterRandom}
              navigateToProfile={navigateToProfile}
              navigateToNotifications={navigateToNotifications}
              navigateToCoins={navigateToCoins}
              navigateToHelp={navigateToHelp}
              navigateToSettings={navigateToSettings}
              navigateToMessage={navigateToMessage}
              navigateToWallet={navigateToWallet}
              navigateToCreate={navigateToCreate}
              navigateToLogin={navigateToLogin}
              createPost={createMemePost}
              login={toggleLoginModal}
              active={nav?.count}
              username={username}
              avatar={avatar}
              resetPassword={resetUserPassword}
              handleLogout={handleLogout}
            />
            <div
              className="meme-content"
              style={{
                display: 'flex',
                position: 'relative',
                justifyContent: 'space-between',
              }}
            >
              <Sidebar
                homeFilter={filterHome}
                trendingFilter={filterTrending}
                recentFilter={filterRecent}
                popularFilter={filterPopular}
                randomFilter={filterRandom}
                navigateToProfile={navigateToProfile}
                navigateToNotifications={navigateToNotifications}
                navigateToLogin={navigateToLogin}
                createPost={createMemePost}
                login={toggleLoginModal}
                notificationCount={props.notificationCount}
                active={nav?.count}
                username={username}
                avatar={avatar}
                resetPassword={resetUserPassword}
              />
              <Outlet />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
