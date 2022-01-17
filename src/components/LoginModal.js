import React, { useState, useEffect } from 'react';
import PopupModal from './templates/PopupModal';
import { useTranslation } from 'react-i18next';
import '../CSS Components/LoginModal.css';
import { useLanguage } from '../contexts/LanguageContext';
import { ReactComponent as BackArrow } from '../Assets/Icons/ChevronLeft.svg';
export default function LoginModal({ login }) {
  const [loginField, setLoginField] = useState('');
  const [detectedActionType, setDetectedActionType] = useState('');
  const [smallerInput, setSmallerInput] = useState(true);
  const [nextButtonClicked, setNextButtonClicked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [validInput, setValidInput] = useState(false);
  const [enumNextType, setEnumNextType] = useState(null);
  const [actionType, setActionType] = useState('login');

  const { t, i18n } = useTranslation('common');

  const { languagePreference } = useLanguage();

  useEffect(() => {
    switch (detectedActionType) {
      case 'loginWithUsername':
        setEnumNextType(0);
        break;
      case 'loginWithPhone':
        setEnumNextType(1);
        break;
      default:
        break;
    }
  }, [detectedActionType]);

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
    e.preventDefault();
    setLoginField(e.target.value);
    parseCategoryOfInput(e.target.value);
  };

  function parseCategoryOfInput(passedValue) {
    console.log(isOnlyNumbers(passedValue));
    if (formatPhoneNumber(passedValue) !== null && isOnlyNumbers(passedValue)) {
      const formattedNumber = formatPhoneNumber(passedValue);
      setLoginField(formattedNumber);
      setValidInput(true);
      setDetectedActionType('loginWithPhone');
    } else if (passedValue.length > 4 && isOnlyNumbers(passedValue) === false) {
      setValidInput(true);
      setDetectedActionType('loginWithUsername');
    } else {
      setValidInput(false);
    }
  }

  function isOnlyNumbers(passedInput) {
    return /^\d+$/.test(passedInput);
  }

  function formatPhoneNumber(number) {
    var match = number.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }

  const handleNext = () => {
    setNextButtonClicked((prevState) => !prevState);
  };

  useEffect(() => {
    console.log(actionType);
  }, [actionType]);

  const NextScreen = () => {
    return enumNextType === 0 ? (
      <>
        <div className="login-modal-type">
          <span>{t('usernameOrEmail')}</span>
          <span className="login-clickable" onClick={() => setEnumNextType(1)}>
            {t('phone')}
          </span>
        </div>
        <input
          value={loginField}
          onChange={(e) => handleForm(e)}
          type={'text'}
          className={
            smallerInput
              ? 'login-modal-option-username-small'
              : 'login-modal-option-username'
          }
          placeholder={t('usernameOrEmail')}
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
      </>
    ) : enumNextType === 1 ? (
      <>
        <div className="login-modal-type">
          <span>Phone</span>
          <span className="login-clickable" onClick={() => setEnumNextType(0)}>
            {t('usernameOrEmail')}
          </span>
        </div>

        <input
          value={loginField}
          onChange={(e) => handleForm(e)}
          type={'text'}
          className={
            smallerInput
              ? 'login-modal-option-username-small'
              : 'login-modal-option-username'
          }
          placeholder={t('phoneNumber')}
        ></input>
        <div className="login-modal-option-send-code">
          <input
            onChange={(e) => handleForm(e)}
            className={
              smallerInput
                ? 'login-modal-option-username-small'
                : 'login-modal-option-username'
            }
            placeholder={t('enter4DigitCode')}
          ></input>
          <div className="login-modal-option-send-code-prompt-container">
            <span className="login-modal-option-send-code-prompt">
              {t('sendCode')}
            </span>
          </div>
        </div>
      </>
    ) : null;
  };

  const SignupScreen = () => {
    return (
      <>
        <div className="login-modal-type">
          <span>Phone</span>
          <span className="login-clickable" onClick={() => setEnumNextType(0)}>
            {t('usernameOrEmail')}
          </span>
        </div>

        <input
          value={loginField}
          onChange={(e) => handleForm(e)}
          type={'text'}
          className={
            smallerInput
              ? 'login-modal-option-username-small'
              : 'login-modal-option-username'
          }
          placeholder={t('phoneNumber')}
        ></input>
        <div className="login-modal-option-send-code">
          <input
            onChange={(e) => handleForm(e)}
            className={
              smallerInput
                ? 'login-modal-option-username-small'
                : 'login-modal-option-username'
            }
            placeholder={t('enter4DigitCode')}
          ></input>
          <div className="login-modal-option-send-code-prompt-container">
            <span className="login-modal-option-send-code-prompt">
              {t('sendCode')}
            </span>
          </div>
        </div>
      </>
    );
  };

  const goToSignup = () => {
    handleNext();
    setActionType('signup');
  };

  return nextButtonClicked ? (
    <PopupModal title={t('loginToMemesfr')} toggleState={login}>
      <div onClick={handleNext} className="login-modal-back-button">
        <BackArrow />
      </div>
      <div className="login-modal-options-container">
        <div className="login-modal-login-container">
          <NextScreen />
          <div className="login-modal-forgot-password-container">
            <div className="login-modal-forgot-password-prompt">
              <span>{t('forgot')}</span>
              <span>{t('username')}</span>
              <span>{t('or')}</span>
              <span>{t('password')}</span>
            </div>
          </div>

          <div className={'login-modal-option-next-login'}>
            <span className="login-modal-option">{t('login')}</span>
          </div>
        </div>

        <div className="login-modal-signup-container">
          <span className="login-modal-signup-prompt">
            {t('dontHaveAccount')}
          </span>
          <span onClick={goToSignup} className="login-modal-signup-action">
            {t('signup')}
          </span>
        </div>
        <div className="login-modal-signup-container">
          <span className="login-modal-signup-prompt login-modal-need-help">
            {t('needHelp?')}
          </span>
        </div>
      </div>
    </PopupModal>
  ) : (
    <PopupModal
      title={actionType === 'login' ? t('login') : t('signup')}
      toggleState={login}
    >
      {login}
      <div className="login-modal-options-container">
        {actionType === 'login' ? (
          <>
            <div className="login-modal-login-container">
              <input
                value={loginField}
                onChange={(e) => handleForm(e)}
                className={
                  smallerInput
                    ? 'login-modal-option-username-small'
                    : 'login-modal-option-username'
                }
                placeholder={t('loginOptions')}
              ></input>

              <div
                onClick={validInput ? handleNext : null}
                className={
                  validInput
                    ? 'login-modal-option-next-button-active'
                    : 'login-modal-option-next-button-inactive'
                }
              >
                <span className="login-modal-option">{t('next')}</span>
              </div>
            </div>
            <span className="login-modal-option">{t('or')}</span>

            <div className="login-modal-option-container">
              <span className="login-modal-option">
                {t('continueWithGoogle')}
              </span>
            </div>
            <div className="login-modal-option-container">
              <span className="login-modal-option">
                {t('continueWithFacebook')}
              </span>
            </div>
            <div className="login-modal-option-container">
              <span className="login-modal-option">
                {t('continueWithTwitter')}
              </span>
            </div>
            <div className="login-modal-option-container">
              <span className="login-modal-option">
                {t('continueWithApple')}
              </span>
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
              <span onClick={goToSignup} className="login-modal-signup-action">
                {t('signup')}
              </span>
            </div>
          </>
        ) : (
          <>
            {/* <div className="login-modal-login-container">
              <input
                value={loginField}
                onChange={(e) => handleForm(e)}
                className={
                  smallerInput
                    ? 'login-modal-option-username-small'
                    : 'login-modal-option-username'
                }
                placeholder={t('loginOptions')}
              ></input>

              <div
                onClick={validInput ? null : null}
                className={
                  validInput
                    ? 'login-modal-option-next-button-active'
                    : 'login-modal-option-next-button-inactive'
                }
              >
                <span
                  onClick={handleNext('login')}
                  className="login-modal-option"
                >
                  {t('next')}
                </span>
              </div>
            </div>
            <span className="login-modal-option">{t('or')}</span> */}

            <div className="login-modal-option-container">
              <span className="login-modal-option">{t('usePhoneOrEmail')}</span>
            </div>

            <div className="login-modal-option-container">
              <span className="login-modal-option">
                {t('continueWithGoogle')}
              </span>
            </div>
            <div className="login-modal-option-container">
              <span className="login-modal-option">
                {t('continueWithFacebook')}
              </span>
            </div>
            <div className="login-modal-option-container">
              <span className="login-modal-option">
                {t('continueWithTwitter')}
              </span>
            </div>
            <div className="login-modal-option-container">
              <span className="login-modal-option">
                {t('continueWithApple')}
              </span>
            </div>
            <div className="login-modal-option-container">
              <span className="login-modal-option">
                {t('continueWithInstagram')}
              </span>
            </div>
            <div className="login-modal-signup-container">
              <span className="login-modal-signup-prompt">
                {t('alreadyHaveAccount')}
              </span>
              <span
                onClick={() => setActionType('login')}
                className="login-modal-signup-action"
              >
                {t('login')}
              </span>
            </div>
          </>
        )}
      </div>
    </PopupModal>
  );
}
