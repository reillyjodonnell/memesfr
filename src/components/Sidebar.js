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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar(props) {
  const [activeNav, setActiveNav] = useState();
  const [active, setActive] = useState(false);
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const [doge, setDoge] = useState(false);
  const [hasNotification, setHasNotfication] = useState(true);
  const [memelordCount, setMemelordCount] = useState(1);

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

  const PrevMemelordLeaderboard = () => {
    return (
      <>
        <div className="memelord-container">
          <span className="memelord-emoji-icon">👑</span>
          <span className="memelord-title">{t('dailyMemelord')} </span>
          <span className="memelord-dash">—</span>
          <span className="memelord-count">{memelordCount}</span>
        </div>
        <div className="navigation-group-memelord-container">
          <div className="navigation-group-memelord">
            <Doge />
            <span className="navigation-group-memelord-text">Reilly</span>
            <span style={{ marginLeft: 'auto' }}>200 👑</span>
          </div>
          <CountdownTimer />
        </div>
      </>
    );
  };

  const MemelordLeaderboardTest = () => {
    return (
      <>
        <div className="memelord-container">
          <span className="mememlord-container-leaderboard-title">
            Leaderboard
          </span>
        </div>
        <div className="memelord-container-ranking-list">
          <div className="memelord-container-ranking-container memelord-second">
            <span className="memelord-container-ranking-crown-second">🥈</span>
            <div className="memelord-container-user-avatar">
              <img
                className="memelord-container-user-avatar-image"
                src={currentUser ? currentUser.photoURL : null}
              />
            </div>
            <div className="memelord-container-username">
              <span>@Username</span>
            </div>
            <div className="memelord-container-crown-count">
              <span>6389</span>
            </div>
          </div>
          <div className="memelord-container-ranking-container memelord-container-ranking-first">
            <span className="memelord-container-ranking-crown">👑</span>
            <div className="memelord-container-user-avatar-primary">
              <img
                className="memelord-container-user-avatar-image"
                src={currentUser ? currentUser.photoURL : null}
              />
            </div>
            <div className="memelord-container-username">
              <span>@Username</span>
            </div>
            <div className="memelord-container-crown-count">
              <span>9273</span>
            </div>
          </div>
          <div className="memelord-container-ranking-container memelord-third">
            <span className="memelord-container-ranking-crown-second">🥉</span>
            <div className="memelord-container-user-avatar">
              <img
                className="memelord-container-user-avatar-image"
                src={currentUser ? currentUser.photoURL : null}
              />
            </div>
            <div className="memelord-container-username">
              <span>@Username</span>
            </div>
            <div className="memelord-container-crown-count">
              <span>1474</span>
            </div>
          </div>
        </div>

        <div className="navigation-group-memelord-container">
          <div className="navigation-group-memelord-user-container">
            <span className="navigation-group-ranking">4</span>
            <div className="navigation-group-memelord-user-container-padding">
              <div className="navigation-group-user-info">
                <div className="navigation-group-secondary-icon">
                  <Doge />
                </div>
                <span className="navigation-group-memelord-text">@reilly</span>
                <span className="navigation-group-crown-count">200</span>
              </div>
            </div>
          </div>
          <div className="navigation-group-memelord-user-container">
            <span className="navigation-group-ranking">5</span>

            <div className="navigation-group-memelord-user-container-padding">
              <div className="navigation-group-user-info">
                <div className="navigation-group-secondary-icon">
                  <Doge />
                </div>
                <span className="navigation-group-memelord-text">Reilly</span>
                <span className="navigation-group-crown-count">200</span>
              </div>
            </div>
          </div>
          <div className="navigation-group-memelord-user-container">
            <span className="navigation-group-ranking">6</span>

            <div className="navigation-group-memelord-user-container-padding">
              <div className="navigation-group-user-info">
                <div className="navigation-group-secondary-icon">
                  <Doge />
                </div>
                <span className="navigation-group-memelord-text">@Reilly</span>
                <span className="navigation-group-crown-count">200</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const MemelordLeaderboard = () => {
    return (
      <>
        <div className="memelord-container">
          <span className="memelord-container-leaderboard-crown">👑</span>
          <span className="memelord-container-leaderboard-title">
            Leaderboard
          </span>
        </div>
        <div className="navigation-group-memelord-user-container">
          <span className="navigation-group-ranking">1</span>

          <div className="navigation-group-memelord-user-container-padding">
            <div className="navigation-group-user-info">
              <div className="navigation-group-secondary-icon">
                <Doge />
              </div>
              <span className="navigation-group-memelord-text">@Reilly</span>
              <span className="navigation-group-crown-count">200</span>
            </div>
          </div>
        </div>
        <div className="navigation-group-memelord-user-container">
          <span className="navigation-group-ranking">2</span>

          <div className="navigation-group-memelord-user-container-padding">
            <div className="navigation-group-user-info">
              <div className="navigation-group-secondary-icon">
                <Doge />
              </div>
              <span className="navigation-group-memelord-text">@Reilly</span>
              <span className="navigation-group-crown-count">130</span>
            </div>
          </div>
        </div>
      </>
    );
  };

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
              onClick={currentUser ? props.navigateToProfile : props.login}
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
            {/* <MemelordLeaderboardTest /> */}
            <MemelordLeaderboard />

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
