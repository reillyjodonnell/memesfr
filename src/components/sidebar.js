import React, { useState, useRef } from 'react';
import { ReactComponent as Home } from '../assets/icons/home.svg';
import { ReactComponent as Popular } from '../assets/icons/popular.svg';
import { ReactComponent as Recent } from '../assets/icons/recent.svg';
import { ReactComponent as User } from '../assets/svg/user.svg';
import { ReactComponent as Notification } from '../assets/icons/notifications.svg';
import { useAuth } from '../contexts/auth-context';
import { useTheme } from '../contexts/theme-context';
import '../css-components/sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import TrendingTopics from './trending-topics';
import { useTranslation } from 'react-i18next';
import ConditionalNavigate from './templates/conditional-navigate';

export default function Sidebar(props) {
  const [doge, setDoge] = useState(false);
  const [hasNotification, setHasNotfication] = useState(true);

  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const username = currentUser?.username;
  const profileUserId = currentUser?.uid;

  const { t, i18n } = useTranslation('common');

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

  return (
    <div className="sidebar-fixed">
      <div className="sidebar-content">
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
            <ConditionalNavigate
              booleanCheck={currentUser}
              navigateTo={`/notifications`}
              falseAction={() => props.login()}
            >
              <div
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
            </ConditionalNavigate>

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

              <span className="navigation-group-text">{t('recent')}</span>
            </div>

            {
              <ConditionalNavigate
                booleanCheck={currentUser}
                navigateTo={`/${username}`}
                state={{ profileUserId, isSameUser: true }}
                falseAction={() => props.login()}
              >
                <div
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
              </ConditionalNavigate>
            }

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
