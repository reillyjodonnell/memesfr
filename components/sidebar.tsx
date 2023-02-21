import {
  Home,
  Flame as Popular,
  Clock as Recent,
  User,
  Bell as Notification,
} from './assets';
import TrendingTopics from './trending-topics';
// import { useTranslation } from 'react-i18next';
import { navigation } from '@/src/constants/navigation';
import { t } from '@/helpers/temp-translator';

export default function Sidebar({ nav, ...props }: any) {
  // const { t } = useTranslation();

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
                  className="navigation-group-svg"
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

            <div
              className={
                nav === navigation.NOTIFICATIONS
                  ? 'navigation-group navigation-group-active'
                  : 'navigation-group'
              }
            >
              <div className="notification-container">
                <Notification
                  className="navigation-group-svg"
                  style={
                    nav === navigation.NOTIFICATIONS
                      ? { stroke: 'var(--primary-accent)' }
                      : null
                  }
                />
                {props.notificationCount && (
                  <NotificationAlert
                    notificationCount={props?.notificationCount}
                  />
                )}
              </div>

              <span className="navigation-group-text">
                {t('notifications')}
              </span>
            </div>

            <div
              onClick={props.popularFilter}
              className={
                nav === navigation.POPULAR
                  ? 'navigation-group navigation-group-active'
                  : 'navigation-group'
              }
            >
              <Popular
                className="navigation-group-svg"
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
                className="navigation-group-svg"
                style={
                  nav === navigation.RECENT
                    ? { stroke: 'var(--primary-accent)' }
                    : null
                }
              />

              <span className="navigation-group-text">{t('recent')}</span>
            </div>

            <div
              className={
                nav === navigation.PROFILE
                  ? 'navigation-group navigation-group-active'
                  : 'navigation-group'
              }
            >
              <User
                className="navigation-group-svg"
                style={
                  nav === navigation.PROFILE
                    ? { stroke: 'var(--primary-accent)' }
                    : null
                }
              />
              <span className="navigation-group-text">{t('profile')}</span>
            </div>

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

function NotificationAlert({ notificationCount = 0 }) {
  return (
    <div className="notification-alert">
      <span className="notification-alert-number">{notificationCount}</span>
    </div>
  );
}

function Help() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/help')} className={'navigation-group'}>
      <div className="navigation-group-items navigation-settings-icon">
        <Help />
        <span className="navigation-group-text">{t('help')}</span>
      </div>
    </div>
  );
}
