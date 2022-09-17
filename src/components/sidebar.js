import { ReactComponent as Home } from '../assets/icons/home.svg';
import { ReactComponent as Popular } from '../assets/icons/popular.svg';
import { ReactComponent as Recent } from '../assets/icons/recent.svg';
import { ReactComponent as User } from '../assets/svg/user.svg';
import { ReactComponent as Notification } from '../assets/icons/notifications.svg';
import { useAuth } from '../contexts/auth-context';
import '../css-components/sidebar.css';
import { useNavigate } from 'react-router-dom';
import TrendingTopics from './trending-topics';
import { useTranslation } from 'react-i18next';
import ConditionalNavigate from './templates/conditional-navigate';
import { navigation } from '../constants/navigation';

const NotificationAlert = ({ notificationCount = 0 }) => {
  return (
    <div className="notification-alert">
      <span className="notification-alert-number">{notificationCount}</span>
    </div>
  );
};

const Help = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/help')} className={'navigation-group'}>
      <div className="navigation-group-items navigation-settings-icon">
        <Help />
        <span className="navigation-group-text">{t('help')}</span>
      </div>
    </div>
  );
};

export default function Sidebar({ nav, ...props }) {
  const { currentUser } = useAuth();
  const username = currentUser?.username;
  const profileUserId = currentUser?.uid;
  const { t } = useTranslation('common');

  const hasNotification = true;

  return (
    <div className="sidebar-fixed">
      <div className="sidebar-content">
        <div className="sidebar-navigation">
          <>
            <div
              onClick={props.homeFilter}
              className={
                nav === navigation.HOME
                  ? 'navigation-group navigation-group-active'
                  : 'navigation-group'
              }
            >
              <div className="navigation-group-items">
                <Home
                  style={
                    nav === navigation.HOME
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
              action={props.navigateToNotifications}
            >
              <div
                className={
                  nav === navigation.NOTIFICATIONS
                    ? 'navigation-group navigation-group-active'
                    : 'navigation-group'
                }
              >
                <div className="notification-container">
                  <Notification
                    style={
                      nav === navigation.NOTIFICATIONS
                        ? { stroke: 'var(--primary-accent)' }
                        : null
                    }
                  ></Notification>
                  {hasNotification && (
                    <NotificationAlert
                      notificationCount={props?.notificationCount}
                    />
                  )}
                </div>

                <span className="navigation-group-text">
                  {t('notifications')}
                </span>
              </div>
            </ConditionalNavigate>

            <div
              onClick={props.popularFilter}
              className={
                nav === navigation.POPULAR
                  ? 'navigation-group navigation-group-active'
                  : 'navigation-group'
              }
            >
              <Popular
                style={
                  nav === navigation.POPULAR
                    ? { stroke: 'var(--primary-accent)' }
                    : null
                }
              />
              <span className="navigation-group-text">{t('popular')}</span>
            </div>
            <div
              onClick={props.recentFilter}
              className={
                nav === navigation.RECENT
                  ? 'navigation-group navigation-group-active'
                  : 'navigation-group'
              }
            >
              <Recent
                style={
                  nav === navigation.RECENT
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
                    nav === navigation.PROFILE
                      ? 'navigation-group navigation-group-active'
                      : 'navigation-group'
                  }
                >
                  <User
                    style={
                      nav === navigation.PROFILE
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
