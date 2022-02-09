import React, { useEffect } from 'react';
import { ReactComponent as Home } from '../assets/icons/Home.svg';
import { ReactComponent as Notification } from '../assets/icons/Notifications.svg';

import { ReactComponent as Popular } from '../assets/icons/Popular.svg';
import { ReactComponent as Recent } from '../assets/icons/Recent.svg';
import { ReactComponent as Random } from '../assets/icons/Random.svg';
import { ReactComponent as User } from '../assets/svg/user.svg';
import { useTheme } from '../contexts/ThemeContext';

import { ReactComponent as Plus } from '../assets/icons/Plus.svg';
import { useAuth } from '../contexts/AuthContext';

import '../css-components/MobileNav.css';

import {
  Message,
  Settings,
  AccountBalanceWalletRounded,
} from '@material-ui/icons';

import { People } from '@material-ui/icons';
export default function MobileNav(props) {
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    if (!darkMode) {
      toggleDarkMode();
    }
  }, []);

  const { currentUser } = useAuth();

  return (
    <div className="mobile-nav-container">
      <div onClick={props.homeFilter} className="mobile-nav-icon">
        <Home
          style={
            props.active === 0
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
            props.active === 1 ? { stroke: 'var(--primary-accent)' } : null
          }
        ></Notification>
      </div>
      <div onClick={props.createPost} className="mobile-nav-icon-primary">
        <Plus
          style={props.active === 2 ? { fill: '#00000085' } : { fill: 'white' }}
        />
      </div>

      <div onClick={props.recentFilter} className="mobile-nav-icon">
        <Message
          className="message-icon"
          style={
            props.active === 1 ? { stroke: 'var(--primary-accent)' } : null
          }
        />
      </div>
      <div className="mobile-nav-icon">
        <User />
      </div>
    </div>
  );
}
