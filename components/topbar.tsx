import { useEffect, useRef, useState } from 'react';
import {
  Castle,
  Plus,
  Logout,
  Login,
  Coins,
  Language,
  Help,
  User,
  Message,
  Settings,
} from './assets';
import Link from 'next/link';
import { useLanguage } from '../src/contexts/language-context';
// import { useTranslation } from 'react-i18next';
import { useAuth } from '../src/contexts/auth-context';
import { navigation } from '../src/constants/navigation';
import { t } from '@/helpers/temp-translator';
import { CSSTransition } from 'react-transition-group';

export default function TopBar(props: any) {
  const [isHovering, setIsHovering] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  // const { t } = useTranslation('common');
  const { currentUser, loadingUser } = useAuth();

  const timer = useRef<any>(null);
  const nodeRef = useRef<any>(null);

  const navigateAndClose = (navigate) => {
    navigate();
    handleMouseOut();
  };

  const handleMouseOver = () => {
    clearTimeout(timer.current);
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    timer.current = setTimeout(() => {
      setIsHovering(false);
      setStartTimer(false);
    }, 1000);
  };

  return (
    <div className="topbar-content">
      <Link className="text-decoration-none" href={'/'}>
        <div onClick={props.homeFilter} className="topbar-logo">
          <Castle />
          <span className="px-5px">Memesfr</span>
        </div>
      </Link>

      <div className="topbar-icon-container">
        {!currentUser && !loadingUser ? (
          <button onClick={props.login} className="topbar-login-container">
            <span className="topbar-login-text">{t('login')}</span>
          </button>
        ) : null}

        <button
          aria-label="Upload meme"
          // onClick={currentUser ? props.navigateToCreate : props.login}
          className={`topbar-upload-meme-button topbar-tooltip topbar-first-button ${
            props.active === navigation.CREATE ? 'topbar-active' : ''
          }`}
          data-tooltip={t('upload')}
        >
          <Plus />
        </button>
        {!loadingUser || currentUser ? (
          <>
            <button
              aria-label="Messages"
              onClick={currentUser ? props.navigateToMessage : props.login}
              className={`topbar-upload-meme-button topbar-tooltip ${
                props.active === navigation.MESSAGES ? 'topbar-active' : ''
              }`}
              data-tooltip={t('messages')}
            >
              <Message className="stroke-text-color" />
            </button>
          </>
        ) : null}
      </div>
      <button
        aria-label="Your profile"
        className="topbar-upload-meme-button"
        // onClick={currentUser && props.navigateToProfile}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
      >
        <User className="topbar-avatar" />
      </button>

      {!languageModal ? (
        <ProfileModal
          t={t}
          currentUser={currentUser}
          mouseLeave={handleMouseOut}
          mouseEnter={handleMouseOver}
          navigateToHelp={props.navigateToHelp}
          handleLogout={props.handleLogout}
          login={props.login}
          isHovering={isHovering}
          nodeRef={nodeRef}
        />
      ) : languageModal ? (
        <LanguageModal
          handleMouseOut={handleMouseOut}
          navigateAndClose={navigateAndClose}
        />
      ) : null}
    </div>
  );
}

const ProfileModal = ({
  mouseLeave,
  mouseEnter,
  currentUser,
  t,
  navigateToHelp,
  handleLogout,
  login,
  isHovering,
  nodeRef,
}) => {
  return (
    <CSSTransition
      nodeRef={nodeRef}
      timeout={200}
      in={isHovering}
      unmountOnExit
      classNames={'topbar-profile-modal'}
    >
      <div
        ref={nodeRef}
        id="nav"
        className={`topbar-profile-modal`}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      >
        {currentUser ? (
          <div
            className="topbar-profile-modal-item"
            // onClick={() => navigateAndClose(props.navigateToSettings)}
          >
            <Settings className="topbar-profile-modal-icon" />
            <span className="topbar-profile-modal-item-text">
              {t('settings')}
            </span>
          </div>
        ) : null}
        <div
          className="topbar-profile-modal-item"
          // onClick={currentUser ? props.navigateToCoins : props.login}
        >
          <Coins className="topbar-profile-modal-icon" />
          <span className="topbar-profile-modal-item-text">{t('coins')}</span>
        </div>
        <div className="topbar-profile-modal-item" onClick={navigateToHelp}>
          <Help className="topbar-profile-modal-icon" />
          <span className="topbar-profile-modal-item-text">{t('help')}</span>
        </div>
        <div
          onClick={() => setLanguageModal((prev) => !prev)}
          className="topbar-profile-modal-item"
        >
          <Language className="topbar-profile-modal-icon" />
          <span className="topbar-profile-modal-item-text">
            {t('languages')}
          </span>
        </div>
        <div className="topbar-profile-modal-logout-container">
          {currentUser ? (
            <div
              className="topbar-profile-modal-item-logout"
              onClick={handleLogout}
            >
              <Logout className="topbar-profile-modal-icon" />
              <span className="topbar-profile-modal-item-text">
                {t('logout')}
              </span>
            </div>
          ) : (
            <div className="topbar-profile-modal-item-logout" onClick={login}>
              <Login className="topbar-profile-modal-icon" />
              <span className="topbar-profile-modal-item-text">
                {t('login')}
              </span>
            </div>
          )}
        </div>
      </div>
    </CSSTransition>
  );
};

const LanguageModal = ({ handleMouseOut, navigateAndClose }) => {
  const {
    setLanguageToSpanish,
    setLanguageToChinese,
    setLanguageToGerman,
    setLanguageToEnglish,
    setLanguageToFrench,
    setLanguageToArabic,
    setLanguageToPortuguese,
    setLanguageToRussian,
    languagePreference,
    setLanguageToJapanese,
  } = useLanguage();
  return (
    <div className="topbar-profile-modal" onMouseLeave={handleMouseOut}>
      <div
        className={
          languagePreference === 'English'
            ? 'topbar-profile-modal-item-active'
            : 'topbar-profile-modal-item'
        }
        onClick={() => navigateAndClose(setLanguageToEnglish)}
      >
        <span className="topbar-profile-modal-item-text">English</span>
      </div>
      <div
        className={
          languagePreference === 'Spanish'
            ? 'topbar-profile-modal-item-active'
            : 'topbar-profile-modal-item'
        }
        onClick={() => navigateAndClose(setLanguageToSpanish)}
      >
        <span className="topbar-profile-modal-item-text">Español</span>
      </div>
      <div
        onClick={() => navigateAndClose(setLanguageToFrench)}
        className={
          languagePreference === 'French'
            ? 'topbar-profile-modal-item-active'
            : 'topbar-profile-modal-item'
        }
      >
        <span className="topbar-profile-modal-item-text">français</span>
      </div>
      <div
        onClick={() => navigateAndClose(setLanguageToGerman)}
        className={
          languagePreference === 'German'
            ? 'topbar-profile-modal-item-active'
            : 'topbar-profile-modal-item'
        }
      >
        <span className="topbar-profile-modal-item-text">Deutsch</span>
      </div>
      <div
        onClick={() => navigateAndClose(setLanguageToChinese)}
        className={
          languagePreference === 'Chinese'
            ? 'topbar-profile-modal-item-active'
            : 'topbar-profile-modal-item'
        }
      >
        <span className="topbar-profile-modal-item-text">中国人</span>
      </div>
      <div
        onClick={() => navigateAndClose(setLanguageToArabic)}
        className={
          languagePreference === 'Arabic'
            ? 'topbar-profile-modal-item-active'
            : 'topbar-profile-modal-item'
        }
      >
        <span className="topbar-profile-modal-item-text">عربى</span>
      </div>
      <div
        onClick={() => navigateAndClose(setLanguageToPortuguese)}
        className={
          languagePreference === 'Portuguese'
            ? 'topbar-profile-modal-item-active'
            : 'topbar-profile-modal-item'
        }
      >
        <span className="topbar-profile-modal-item-text">Português</span>
      </div>
      <div
        onClick={() => navigateAndClose(setLanguageToRussian)}
        className={
          languagePreference === 'Russian'
            ? 'topbar-profile-modal-item-active'
            : 'topbar-profile-modal-item'
        }
      >
        <span className="topbar-profile-modal-item-text">русский</span>
      </div>
      <div
        onClick={() => navigateAndClose(setLanguageToJapanese)}
        className={
          languagePreference === 'Japanese'
            ? 'topbar-profile-modal-item-active'
            : 'topbar-profile-modal-item'
        }
      >
        <span className="topbar-profile-modal-item-text">日本</span>
      </div>
    </div>
  );
};
