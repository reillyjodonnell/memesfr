import React, { useState, useEffect } from 'react';
import PopupModal from './templates/PopupModal';
import { useTranslation } from 'react-i18next';
import '../css-components/LoginModal.css';
import { useLanguage } from '../contexts/LanguageContext';
import { ReactComponent as BackArrow } from '../assets/icons/ChevronLeft.svg';
import { useAuth } from '../contexts/AuthContext';
import Firebase from 'firebase/app';

interface IProps {
  toggleLoginModal: Function;
}

export default function LoginModal({ toggleLoginModal }: IProps) {
  // const [detectedLoginType, setDetectedLoginType] = useState<String>('');
  const [smallerInput, setSmallerInput] = useState<Boolean>(true);
  const [nextButtonClicked, setNextButtonClicked] = useState<Boolean>(false);
  // const [phoneNumber, setPhoneNumber] = useState<Boolean>(false);
  const [validLoginInput, setValidLoginInput] = useState<Boolean>(false);
  const [enableSubmitButton, setEnableSubmitButton] = useState<Boolean>(false);

  const [passwordField, setPasswordField] = useState<
    string | number | readonly string[] | undefined
  >('');
  const [loginField, setLoginField] = useState<
    string | number | readonly string[] | undefined
  >('');

  const [error, setError] = useState<String>('');

  const { login } = useAuth();

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enableSubmitButton) {
      console.log(loginField, passwordField);
      try {
        await login(loginField, passwordField).then((user: Firebase.User) => {
          if (user) {
            window.location.reload();
          }
        });
      } catch (error: any) {
        setEnableSubmitButton(false);
        switch (error?.code) {
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

  const handlePaste = (type: string, e: React.ClipboardEvent) => {
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

  const handleInput = (type: string, e: React.FormEvent<HTMLInputElement>) => {
    if (type === 'login') {
      setLoginField((e.target as HTMLInputElement).value);
    } else {
      setPasswordField((e.target as HTMLInputElement).value);
    }
  };

  const { t } = useTranslation('common');

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

  const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    checkForInvalidInput((e.target as HTMLInputElement).value);
    setLoginField((e.target as HTMLInputElement).value);

    parseCategoryOfInput((e.target as HTMLInputElement).value);
  };

  const whiteSpaceIsPresent = /\s/;

  const checkForInvalidInput = (input: string) => {
    if (whiteSpaceIsPresent.test(input)) {
      setError('Invalid Input');
    } else {
      setError('');
    }
  };

  const areBothFieldsValid = () => {
    console.log(`Login is ${loginField} and pass is ${passwordField}`);
    if (
      typeof loginField === 'string' &&
      typeof passwordField === 'string' &&
      loginField.length > 5 &&
      passwordField?.length > 5
    ) {
      return true;
    } else {
      return false;
    }
  };

  function parseCategoryOfInput(passedValue: string) {
    if (formatPhoneNumber(passedValue) !== null && isOnlyNumbers(passedValue)) {
      const formattedNumber = formatPhoneNumber(passedValue);
      typeof formattedNumber === 'string' && setLoginField(formattedNumber);
      setValidLoginInput(true);
      // setDetectedLoginType('phone');
    } else if (passedValue.length > 4 && isOnlyNumbers(passedValue) === false) {
      setValidLoginInput(true);
      // setDetectedLoginType('username');
    } else {
      setValidLoginInput(false);
    }
  }

  function isOnlyNumbers(passedInput: string) {
    return /^\d+$/.test(passedInput);
  }

  function formatPhoneNumber(number: String) {
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
              value={typeof loginField === 'string' ? loginField : ''}
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
              value={t<string>('login')}
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
            onClick={validLoginInput ? handleNext : undefined}
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
