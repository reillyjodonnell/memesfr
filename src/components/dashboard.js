import { useState } from 'react';
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
import { signOut } from '../services/firebase-api';
import { navigation } from '../constants/navigation';
import NewUser from './new-user';

export default function Dashboard(props) {
  const [createPost, createPostFunction] = useState(false);
  const [resetPassword, resetPasswordFunction] = useState(false);

  const { toggleLoginModal, loginModal, setNav, nav } = props;

  const { isMobile } = useMobile();

  const { t } = useTranslation('common');

  const { currentUser, newUser } = useAuth();

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

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    window.location.reload();
  };

  function filterHome() {
    setNav(navigation.HOME);
    navigate('/');
  }

  function filterPopular() {
    navigate('/');
    setNav(navigation.POPULAR);
  }

  function filterRecent() {
    navigate('/');
    setNav(navigation.RECENT);
  }

  const navigateToProfile = () => {
    setNav(navigation.PROFILE);
    navigate(`/${currentUser.username}`, {
      state: { profileUserId: currentUser?.uid },
    });
  };
  const navigateToNotifications = () => {
    setNav(navigation.NOTIFICATIONS);
    navigate(`/notifications`);
  };
  const navigateToSettings = () => {
    setNav(null);
    navigate('/settings');
  };
  const navigateToCoins = () => {
    setNav(null);
    navigate('/coins');
  };
  const navigateToHelp = () => {
    setNav(null);

    navigate('/help');
  };
  const navigateToMessage = () => {
    setNav(navigation.MESSAGES);

    navigate('/messages');
  };

  const navigateToCreate = () => {
    setNav(navigation.CREATE);
    navigate('/create');
  };

  const navigateToLogin = () => {
    setNav(null);
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
        {newUser ? <NewUser /> : null}
        {loginModal && !newUser ? (
          <UserAuth toggleLoginModal={toggleLoginModal} />
        ) : null}
        {isMobile ? (
          <>
            <Outlet />
            <MobileNav
              active={nav}
              homeFilter={filterHome}
              recentFilter={filterRecent}
              popularFilter={filterPopular}
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
              recentFilter={filterRecent}
              popularFilter={filterPopular}
              navigateToProfile={navigateToProfile}
              navigateToNotifications={navigateToNotifications}
              navigateToCoins={navigateToCoins}
              navigateToHelp={navigateToHelp}
              navigateToSettings={navigateToSettings}
              navigateToMessage={navigateToMessage}
              navigateToCreate={navigateToCreate}
              navigateToLogin={navigateToLogin}
              createPost={createMemePost}
              login={toggleLoginModal}
              active={nav}
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
                recentFilter={filterRecent}
                popularFilter={filterPopular}
                navigateToProfile={navigateToProfile}
                navigateToNotifications={navigateToNotifications}
                navigateToLogin={navigateToLogin}
                createPost={createMemePost}
                login={toggleLoginModal}
                notificationCount={props.notificationCount}
                nav={nav ?? -1}
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
