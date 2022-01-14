import React, { useState, useEffect } from 'react';
import PopupModal from './templates/PopupModal';
import { useTranslation } from 'react-i18next';
import '../CSS Components/LoginModal.css';
import { useLanguage } from '../contexts/LanguageContext';
import { ReactComponent as BackArrow } from '../Assets/Icons/ChevronLeft.svg';
export default function LoginModal({ login }) {
  const [loginField, setLoginField] = useState(null);
  const [smallerInput, setSmallerInput] = useState(false);
  const [nextButtonClicked, setNextButtonClicked] = useState(false);

  const { t, i18n } = useTranslation('common');

  const { languagePreference } = useLanguage();

  useEffect(() => {
    switch (languagePreference) {
      case 'English':
        setSmallerInput(false);
        break;
      default:
        setSmallerInput(true);
        break;
    }
  }, [languagePreference]);

  const handleForm = (e) => {
    setLoginField(e);
  };

  const handleNext = () => {
    setNextButtonClicked((prevState) => !prevState);
  };

  return nextButtonClicked ? (
    <PopupModal title={t('login')} toggleState={login}>
      <div onClick={handleNext} className="login-modal-back-button">
        <BackArrow />
      </div>
      <div className="login-modal-options-container">
        <div className="login-modal-login-container">
          <input
            onChange={(e) => handleForm(e)}
            className={
              smallerInput
                ? 'login-modal-option-username-small'
                : 'login-modal-option-username'
            }
            placeholder={t('loginOptions')}
          ></input>
          <input
            onChange={(e) => handleForm(e)}
            className={
              smallerInput
                ? 'login-modal-option-username-small'
                : 'login-modal-option-username'
            }
            placeholder={t('password')}
          ></input>
          <div className={'login-modal-option-next-login'}>
            <span className="login-modal-option">{t('login')}</span>
          </div>
        </div>

        <div className="login-modal-option-container">
          <span className="login-modal-option">{t('continueWithGoogle')}</span>
        </div>

        <div className="login-modal-signup-container">
          <span className="login-modal-signup-prompt">
            {t('dontHaveAccount')}
          </span>
          <span className="login-modal-signup-action">{t('signup')}</span>
        </div>
      </div>
    </PopupModal>
  ) : (
    <PopupModal title={t('login')} toggleState={login}>
      <div className="login-modal-options-container">
        <div className="login-modal-login-container">
          <input
            onChange={(e) => handleForm(e)}
            className={
              smallerInput
                ? 'login-modal-option-username-small'
                : 'login-modal-option-username'
            }
            placeholder={t('loginOptions')}
          ></input>

          <div
            onClick={loginField !== null && handleNext}
            className={
              loginField !== null
                ? 'login-modal-option-next-button-active'
                : 'login-modal-option-next-button-inactive'
            }
          >
            <span className="login-modal-option">{t('next')}</span>
          </div>
        </div>
        <span className="login-modal-option">{t('or')}</span>

        <div className="login-modal-option-container">
          <span className="login-modal-option">{t('continueWithGoogle')}</span>
        </div>
        <div className="login-modal-option-container">
          <span className="login-modal-option">
            {t('continueWithFacebook')}
          </span>
        </div>
        <div className="login-modal-option-container">
          <span className="login-modal-option">{t('continueWithTwitter')}</span>
        </div>
        <div className="login-modal-option-container">
          <span className="login-modal-option">{t('continueWithApple')}</span>
        </div>
        <div className="login-modal-option-container">
          <span className="login-modal-option">
            {t('continueWithInstagram')}
          </span>
        </div>
        <div className="login-modal-signup-container">
          <span className="login-modal-signup-prompt">
            {t('dontHaveAccount')}
          </span>
          <span className="login-modal-signup-action">{t('signup')}</span>
        </div>
      </div>
    </PopupModal>
  );
}
