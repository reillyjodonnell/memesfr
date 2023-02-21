import React, { useEffect } from 'react';
import { ReactComponent as Home } from '../assets/icons/home.svg';
import { ReactComponent as Notification } from '../assets/icons/notifications.svg';

import { ReactComponent as User } from '../assets/svg/user.svg';
import { useTheme } from '../contexts/theme-context';
import { ReactComponent as Plus } from '../assets/icons/plus.svg';
import '../css-components/mobile-nav.css';
import { Message } from '@material-ui/icons';
import { navigation } from '../constants/navigation';

export default function MobileNav(props) {
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    if (!darkMode) {
      toggleDarkMode();
    }
  }, [darkMode, toggleDarkMode]);

  return (
    <div className="mobile-nav-container">
      <div onClick={props.homeFilter} className="mobile-nav-icon">
        <Home
          style={
            props.active === navigation.HOME
              ? {
                  fill: 'var(--primary-accent)',
                  stroke: 'var(--primary-accent)',
                }
              : null
          }
        />
      </div>
      <div onClick={props.trendingFilter} className="mobile-nav-icon">
        <Notification
          style={
            props.active === navigation.NOTIFICATIONS
              ? { stroke: 'var(--primary-accent)' }
              : null
          }
        ></Notification>
      </div>
      <div onClick={props.createPost} className="mobile-nav-icon-primary">
        <Plus
          style={
            props.active === navigation.CREATE
              ? { fill: '#00000085' }
              : { fill: 'white' }
          }
        />
      </div>

      <div onClick={props.recentFilter} className="mobile-nav-icon">
        <Message
          className="message-icon"
          style={
            props.active === navigation.MESSAGES
              ? { stroke: 'var(--primary-accent)' }
              : null
          }
        />
      </div>
      <div className="mobile-nav-icon">
        <User />
      </div>
    </div>
  );
}
