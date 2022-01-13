import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as Home } from '../Assets/Icons/Home.svg';
import { ReactComponent as Popular } from '../Assets/Icons/Popular.svg';
import { ReactComponent as Recent } from '../Assets/Icons/Recent.svg';
import { ReactComponent as Doge } from '../Assets/doge.svg';
import { ReactComponent as User } from '../Assets/SVGs/user.svg';
import { ReactComponent as Notification } from '../Assets/Icons/Notifications.svg';
// import {ReactComponent as Popular} from '../Assets/Icons/Popular.svg'
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import '../CSS Components/Sidebar.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import TrendingTopics from './TrendingTopics';
import { useTranslation } from 'react-i18next';
import CountdownTimer from './CountdownTimer';

export default function Sidebar(props) {
  const [activeNav, setActiveNav] = useState();
  const [active, setActive] = useState(false);
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const [doge, setDoge] = useState(false);
  const [hasNotification, setHasNotfication] = useState(true);
  const { updateDoge } = useTheme();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { signOut, currentUser } = useAuth();

  const { t, i18n } = useTranslation('common');

  function activateDoge() {
    updateDoge();
    setDoge((prev) => !prev);
  }

  function calcHeight(el) {
    const height = el.offsetHeight + 20;
    setMenuHeight(height);
  }
  function goToLogin() {
    navigate('login');
  }

  const redirectToProfile = () => {
    props.randomFilter();
    navigate(`/${currentUser.displayName}`);
  };

  const Help = () => {
    <div onClick={() => navigate('/help')} className={'navigation-group'}>
      <div className="navigation-group-items navigation-settings-icon">
        <Help />
        <span className="navigation-group-text">{t('help')}</span>
      </div>
    </div>;
  };

  const NotificationAlert = () => {
    return (
      <div className="notification-alert">
        <span className="notification-alert-number">
          {props.notificationCount}
        </span>
      </div>
    );
  };

  const discLink = 'https://discord.gg/234DDJUQpD';

  function selectOption() {
    setActive((prevState) => !prevState);
  }

  return (
    <div className="sidebar-fixed">
      <div className="sidebar-content">
        {/* {props.avatar !== undefined ? (
          <Link to={`/${props.username}`}>
            <div className="sidebar-user-section">
              <div
                className="sidebar-avatar-container"
                onClick={props.navigateToProfile}
              >
                <img
                  className="sidebar-avatar"
                  alt="user avatar"
                  src={props.avatar}
                />
              </div>

              <span className="sidebar-username">
                @{props.username && props.username}
              </span>
            </div>
          </Link>
        ) : null}
        <div className="upload-meme-button">
          <Plus style={{ width: '30px', paddingRight: '5px' }} />
          <span>Upload Meme</span>
        </div> */}

        <div className="sidebar-navigation">
          <>
            <div
              onClick={props.homeFilter}
              className={
                props.active === 0
                  ? 'navigation-group navigation-group-active'
                  : 'navigation-group'
              }
            >
              <div className="navigation-group-items">
                <Home
                  style={
                    props.active === 0
                      ? {
                          stroke: 'var(--primary-accent)',
                        }
                      : null
                  }
                />
                <span className="navigation-group-text">{t('home')}</span>
              </div>
            </div>
            <div
              onClick={props.navigateToNotifications}
              className={
                props.active === 1
                  ? 'navigation-group navigation-group-active'
                  : 'navigation-group'
              }
            >
              <div className="notification-container">
                <Notification
                  style={
                    props.active === 1
                      ? { stroke: 'var(--primary-accent)' }
                      : null
                  }
                ></Notification>
                {hasNotification && <NotificationAlert />}
              </div>

              <span className="navigation-group-text">
                {t('notifications')}
              </span>
            </div>
            <div
              onClick={props.popularFilter}
              className={
                props.active === 2
                  ? 'navigation-group navigation-group-active'
                  : 'navigation-group'
              }
            >
              <Popular
                style={
                  props.active === 2
                    ? { stroke: 'var(--primary-accent)' }
                    : null
                }
              />
              <span className="navigation-group-text">{t('popular')}</span>
            </div>
            <div
              onClick={props.recentFilter}
              className={
                props.active === 3
                  ? 'navigation-group navigation-group-active'
                  : 'navigation-group'
              }
            >
              <Recent
                style={
                  props.active === 3
                    ? { stroke: 'var(--primary-accent)' }
                    : null
                }
              />
              {/* <FontAwesomeIcon
                icon={faClock}
                style={
                  props.active === 3
                    ? { stroke: 'var(--primary-accent)' }
                    : null
                }
              /> */}
              <span className="navigation-group-text">{t('recent')}</span>
            </div>
            <div
              onClick={props.navigateToProfile}
              className={
                props.active === 4
                  ? 'navigation-group navigation-group-active'
                  : 'navigation-group'
              }
            >
              <User
                style={
                  props.active === 4
                    ? { stroke: 'var(--primary-accent)' }
                    : null
                }
              />
              <span className="navigation-group-text">{t('profile')}</span>
            </div>
            <div className="memelord-container">
              <span>{t('dailyMemelord')} 👑</span>
            </div>
            <div className="navigation-group-memelord-container">
              <div className="navigation-group-memelord">
                <Doge />
                <span className="navigation-group-text">Reilly</span>
              </div>
              <CountdownTimer />
            </div>

            {/* <div className="rightsidebar-content">
              <div className="daily-counter">
                <Countdown />
              </div>
              <div className="rightsidebar-main-section">
                <div className="daily-meme-lord-container">
                  <div className="daily-meme-lord">
                    <span className="main-section-title">
                      today's memelord 👑
                    </span>
                    <div className="rightsidebar-user-profile">
                      <img className="rightsidebar-avatar" src={Doge} /> 
                      <Doge />
                      <span>@reilly</span>
                    </div>

                    <div className="rightsidebar-user-stats">
                      <span className="rightsidebar-crown-count">1.6k 👑</span>
                      <span className="rightsidebar-meme-count">24 memes</span>
                    </div>
                  </div>
                </div>

              </div>

              
            </div> 
              */}
            <div className="sidebar-container">
              <span>{t('trending')}</span>
            </div>
            <div className="rightsidebar-secondary-section">
              <TrendingTopics />
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
