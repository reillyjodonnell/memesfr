import React, { useState, useEffect } from 'react';
import PopupModal from './templates/PopupModal';
import { useTranslation } from 'react-i18next';
import '../css-components/LoginModal.css';
import { useLanguage } from '../contexts/LanguageContext';
import { ReactComponent as BackArrow } from '../assets/icons/ChevronLeft.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginModal({ toggleLoginModal }) {
  const [detectedLoginType, setDetectedLoginType] = useState('');
  const [smallerInput, setSmallerInput] = useState(true);
  const [nextButtonClicked, setNextButtonClicked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [validLoginInput, setValidLoginInput] = useState(false);
  const [enableSubmitButton, setEnableSubmitButton] = useState(false);

  const [passwordField, setPasswordField] = useState('');
  const [loginField, setLoginField] = useState('');

  const [error, setError] = useState('');

  const { login } = useAuth();

  const submitForm = async (e) => {
    e.preventDefault();
    if (enableSubmitButton) {
      console.log(loginField, passwordField);
      try {
        await login(loginField, passwordField).then((user) => {
          window.location.reload();
        });
      } catch (error) {
        setEnableSubmitButton(false);
        switch (error.code) {
          case 'auth/invalid-email':
            setError('Invalid Email or Username');
            break;
          default:
            setError('Invalid Username or Password');
        }
      }
    } else return;
  };

  useEffect(() => {
    handleInputChange();
  }, [passwordField, loginField]);

  const handleInputChange = () => {
    setError('');
    areBothFieldsValid()
      ? setEnableSubmitButton(true)
      : setEnableSubmitButton(false);
  };

  const handlePaste = (type, e) => {
    e.preventDefault();
    const value = e.clipboardData.getData('Text');
    console.log(value);
    if (type === 'login') {
      setLoginField(value);
    } else {
      setPasswordField(value);
    }
    handleInputChange();
  };

  const handleInput = (type, e) => {
    if (type === 'login') {
      setLoginField(e.target.value);
    } else {
      setPasswordField(e.target.value);
    }
  };

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
    e.preventDefault();
    checkForInvalidInput(e.target.value);
    setLoginField(e.target.value);

    parseCategoryOfInput(e.target.value);
  };

  const whiteSpaceIsPresent = /\s/;

  const checkForInvalidInput = (input) => {
    if (whiteSpaceIsPresent.test(input)) {
      setError('Invalid Input');
    } else {
      setError('');
    }
  };

  const areBothFieldsValid = () => {
    console.log(`Login is ${loginField} and pass is ${passwordField}`);
    if (loginField?.length > 5 && passwordField?.length > 5) {
      return true;
    } else {
      return false;
    }
  };

  function parseCategoryOfInput(passedValue) {
    if (formatPhoneNumber(passedValue) !== null && isOnlyNumbers(passedValue)) {
      const formattedNumber = formatPhoneNumber(passedValue);
      setLoginField(formattedNumber);
      setValidLoginInput(true);
      setDetectedLoginType('phone');
    } else if (passedValue.length > 4 && isOnlyNumbers(passedValue) === false) {
      setValidLoginInput(true);
      setDetectedLoginType('username');
    } else {
      setValidLoginInput(false);
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
    if (nextButtonClicked === true) {
      setLoginField('');
    }
  };

  const handleBack = () => {
    setNextButtonClicked((prevState) => !prevState);
    setLoginField('');
  };

  return nextButtonClicked ? (
    <PopupModal title={t('login')} toggleState={toggleLoginModal}>
      <div onClick={handleBack} className="login-modal-back-button">
        <BackArrow />
      </div>
      <div className="login-modal-options-container">
        <div className="login-modal-login-container">
          <form onSubmit={(e) => submitForm(e)}>
            <input
              id="login"
              value={loginField}
              onChange={(e) => handleInput('login', e)}
              onPaste={(e) => handlePaste('login', e)}
              type={'text'}
              className="login-modal-option-username"
              placeholder={t('loginOptions')}
            ></input>
            <input
              value={passwordField}
              autoComplete={'current-password'}
              type={'password'}
              onChange={(e) => handleInput('password', e)}
              onPaste={(e) => handlePaste('password', e)}
              className="login-modal-option-username"
              placeholder={t('password')}
            ></input>

            <div className="login-modal-forgot-password-prompt">
              <span>{t('forgot')}</span>
              <span>{t('username')}</span>
              <span>{t('or')}</span>
              <span>{t('password')}</span>
            </div>
            {error && (
              <div className="login-modal-error">
                <span>{error}</span>
              </div>
            )}

            <input
              data-testid="submit-button"
              type={'submit'}
              value={t('login')}
              className={
                enableSubmitButton
                  ? 'login-modal-option-login-button-active'
                  : 'login-modal-option-login-button-inactive'
              }
            />
          </form>
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
    <PopupModal title={t('login')} toggleState={toggleLoginModal}>
      <div className="login-modal-options-container">
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

          {error && (
            <div className="login-modal-error">
              <span>{error}</span>
            </div>
          )}

          <div
            onClick={validLoginInput ? handleNext : null}
            className={
              validLoginInput
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
