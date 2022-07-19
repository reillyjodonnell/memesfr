import React from 'react';
import '../css-components/mobile-header.css';
import { ReactComponent as Castle } from '../assets/svg/castle.svg';
import { ReactComponent as User } from '../assets/svg/user.svg';
import { useAuth } from '../contexts/auth-context';
import { ReactComponent as Hamburger } from '../assets/icons/hamburger.svg';

export default function MobileHeader(props) {
  return (
    <div>
      <header className="navbar-container">
        <div className="navbar-hamburger">
          <Hamburger />
        </div>
        <div className="navbar-content">
          <div className="navbar-logo">
            <Castle />
            {/* <span>Memesfr</span> */}
          </div>
          {/* <div className="navbar-avatar">
            <NavbarItem
              icon={
                currentUser ? (
                  <div className="avatar">
                    <img src={currentUser.photoURL} />
                  </div>
                ) : (
                  <User />
                )
              }
            >
              <DropDownMenu activeUser={currentUser} />
            </NavbarItem>
          </div> */}
        </div>
      </header>
    </div>
  );
}
