import React, { useState, useEffect, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import '../../css-components/login-modal.css';
import './register.css';
import { ReactComponent as BackArrow } from '../../assets/icons/chevron-left.svg';
import Fbook from '../../assets/brands/facebook.png';
import Google from '../../assets/brands/google.png';
import Twitter from '../../assets/brands/twitter.png';
import InputWithLabel from '../templates/input-with-label';
import { checkUsernameAvailability } from '../../services/firebase-api';
import {
  formatPhoneNumber,
  isOnlyNumbers,
  isValidEmail,
  isValidPassword,
} from '../../helper';
import {
  continueWithFacebook,
  continueWithGoogle,
  continueWithTwitter,
  requestCaptcha,
  sendCodeToPhone,
} from './auth-helpers';
import Spacer from '../templates/spacer';
import ErrorMessage from '../templates/error-message';
import { Navigate } from 'react-router-dom';

type RegisterProps = {
  toggleLogin: MouseEventHandler<HTMLDivElement>;
  closeModal: Function;
};

export default function Register({ toggleLogin, closeModal }: RegisterProps) {
  const [nextButtonClicked, setNextButtonClicked] = useState<Boolean>(false);
  const [phone, setPhone] = useState(true);

  const [usernameSpinner, setUsernameSpinner] = useState(false);
  const [validUsername, setValidUsername] = useState(true);
  const [usernameField, setUsernameField] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const [passwordField, setPasswordField] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [validPassword, setValidPassword] = useState(false);

  const [emailField, setEmailField] = useState('');
  const [emailError, setEmailError] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [phoneField, setPhoneField] = useState('');
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [error, setError] = useState('');

  const { t } = useTranslation('common');

  //   const { login } = useAuth();

  function toggleUsePhone() {
    setPhone((prev) => !prev);
  }

  useEffect(() => {
    async function checkUsername() {
      // show spinner
      setUsernameSpinner(true);

      // check if username is available
      const usernameIsValid = await checkUsernameAvailability(usernameField);

      if (usernameIsValid) {
        setUsernameSpinner(false);
        setValidUsername(true);
        setUsernameError(``);
      } else {
        setValidUsername(false);
        setUsernameSpinner(false);
        setUsernameError(`${usernameField} is unavailable`);
      }
    }

    if (usernameField?.length > 3) {
      checkUsername();
    } else if (usernameField?.length > 0) {
      setValidUsername(false);
      setUsernameError(t('usernameMustBe4Characters'));
    }
  }, [usernameField, t]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validAccount()) {
      try {
      } catch (error: any) {
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

  const handleNext = () => {
    setNextButtonClicked((prevState) => !prevState);
  };

  const handleBack = () => {
    setNextButtonClicked((prevState) => !prevState);
    // clear the inputs
    setUsernameField('');
    setPhoneField('');
    setEmailField('');
  };

  const handlePhoneNumber = (number: string) => {
    const formattedNumber = formatPhoneNumber(number);

    if (isOnlyNumbers(number) && formattedNumber !== null) {
      setPhoneField(formattedNumber);
      setValidPhoneNumber(true);
    } else {
      setPhoneField(number);
      setValidPhoneNumber(false);
    }
  };

  const handleEmail = (email: string) => {
    const valid = isValidEmail(email);
    setEmailField(email);

    if (valid) {
      setEmailError('');
      setValidEmail(true);
    } else {
      setEmailError(t('emailError'));
      setValidEmail(false);
    }
  };

  const handlePassword = (password: string) => {
    const valid = isValidPassword(password);
    setPasswordField(password);

    if (valid) {
      setPasswordError('');
      setValidPassword(true);
    } else {
      setPasswordError(t('passwordError'));
      setValidPassword(false);
    }
  };

  function loginWithPhone() {
    requestCaptcha({
      elementId: 'request-code',
      callback: (a: any) => {
        console.log(a);
      },
    });
    const appVerifier = window.recaptchaVerifier;
    const unformattedNumber = phoneField.replace(/\D/g, '');
    const number = unformattedNumber.toString();
    sendCodeToPhone({
      phoneNumber: number,
      appVerifier,
      displayErrorMessage: setErrorMessage,
    });
  }

  function validAccount() {
    const isPhoneSuppliedAndConfirmed = validPhoneNumber ?? false;
    const isEmailAndPasswordSuppliedAndValid = validPassword && validEmail;
    if (
      validUsername && phone
        ? isPhoneSuppliedAndConfirmed
        : isEmailAndPasswordSuppliedAndValid
    ) {
      return true;
    } else return false;
  }

  return nextButtonClicked ? (
    <>
      <div onClick={handleBack} className="login-modal-back-button">
        <BackArrow />
      </div>
      <div className="login-modal-options-container">
        <div className="login-modal-login-container">
          <form
            className="flex flex-col justify-center items-center w-full"
            onSubmit={(e) => submitForm(e)}
          >
            <Spacer styles={'w-full'}>
              <InputWithLabel
                showCheckmark={
                  validUsername && !usernameSpinner && usernameField !== ''
                }
                error={usernameError ? true : false}
                errorMessage={usernameError}
                spinner={usernameSpinner}
                name="username"
                label={t('username')}
                id={'username'}
                value={usernameField}
                onChange={(e: any) => setUsernameField(e.target?.value ?? '')}
                //   onPaste={(e: any) => handlePaste('login', e)}
                type={'text'}
                placeholder={t('username')}
              />
            </Spacer>

            {/* <InputWithLabel
              name="name"
              label={t('name')}
              id={'name'}
              value={nameField}
              onChange={(e: any) => setNameField(e.target?.value ?? '')}
              //   onPaste={(e: any) => handlePaste('login', e)}
              type={'text'}
              placeholder={t('name')}
            /> */}
            {phone ? (
              <>
                <Spacer styles={'w-full'}>
                  <InputWithLabel
                    name="phone"
                    label={t('phone')}
                    id={'phone'}
                    value={phoneField}
                    onChange={(e: any) =>
                      handlePhoneNumber(e?.target?.value ?? '')
                    }
                    // onPaste={(e: any) => handlePaste('login', e)}
                    type={'text'}
                    placeholder={t('phone')}
                  />
                </Spacer>
                <Spacer styles={'w-full'}>
                  <div className="flex items-center">
                    <input
                      //   type={'number'}
                      className={`rounded-round-tl rounded-round-bl box-border p-1 px-2 flex w-full border-2 text-text-color text-base min-h-[50px] bg-bg 
                     `}
                      placeholder="enter6DigitCode"
                    />
                    <button
                      id="request-code"
                      disabled={!validPhoneNumber}
                      onClick={loginWithPhone}
                      className={`flex font-semibold justify-center items-center px-4 py-2  min-h-[50px] border-2 rounded-round-tr rounded-round-br border-line bg-line
                      ${
                        validPhoneNumber
                          ? 'text-black'
                          : 'text-gray-500 cursor-not-allowed'
                      }
                      `}
                    >
                      {t('sendCode')}
                    </button>
                  </div>
                </Spacer>
              </>
            ) : (
              <>
                <Spacer styles={'w-full'}>
                  <InputWithLabel
                    error={emailError ? true : false}
                    errorMessage={emailError}
                    name="email"
                    label={t('email')}
                    id={'email'}
                    value={emailField}
                    onChange={(e: any) => handleEmail(e?.target?.value ?? '')}
                    // onPaste={(e: any) => handlePaste('login', e)}
                    type={'email'}
                    placeholder={t('email')}
                  />
                </Spacer>
                <Spacer styles={'w-full'}>
                  <InputWithLabel
                    autoComplete={'current-password'}
                    error={passwordError ? true : false}
                    errorMessage={passwordError}
                    name="password"
                    label={t('password')}
                    id={'password'}
                    value={passwordField}
                    onChange={(e: any) =>
                      handlePassword(e?.target?.value ?? '')
                    }
                    // onPaste={(e: any) => handlePaste('login', e)}
                    type={'password'}
                    placeholder={t('password')}
                  />
                </Spacer>
              </>
            )}
            <div className="flex w-full justify-start items-center ">
              <span
                className="text-primary-accent px-2 py-1 hover:bg-hover rounded-round"
                onClick={toggleUsePhone}
              >
                {phone ? t('useEmailInstead') : t('usePhoneNumberInstead')}
              </span>
            </div>

            {error && (
              <div className="login-modal-error">
                <span>{error}</span>
              </div>
            )}

            <input
              data-testid="submit-button"
              disabled={validAccount()}
              type={'submit'}
              value={t<string>('register')}
              className={`my-4
                ${
                  validAccount()
                    ? 'login-modal-option-login-button-active'
                    : 'login-modal-option-login-button-inactive'
                }
              `}
            />
          </form>
        </div>

        <div onClick={toggleLogin} className="login-modal-signup-container">
          <span className="login-modal-signup-prompt">
            {t('alreadyHaveAccount')}
          </span>
          <span className="login-modal-signup-action">{t('login')}</span>
        </div>
      </div>
    </>
  ) : (
    <div className="login-modal-options-container">
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}

      <div onClick={handleNext} className="auth-option-container my-1">
        <span className="login-modal-option-social-prompt">
          {t('usePhoneOrEmail')}
        </span>
      </div>
      <span className="login-modal-option">{t('or')}</span>
      <div className="login-modal-option-parent">
        <div
          onClick={() =>
            continueWithFacebook({
              displayErrorMessage: setErrorMessage,
              redirect: () => Navigate({ to: '/' }),
            })
          }
          className="auth-option-container mb-1"
        >
          <img
            alt="Facebook's icon, the lowercase blue f, to register with Facebook"
            className="login-modal-option-social-icon"
            src={Fbook}
          />
          <span className="login-modal-option-social-prompt">
            {t('continueWithFacebook')}
          </span>
        </div>
        <div
          onClick={() =>
            continueWithGoogle({
              displayErrorMessage: setErrorMessage,
              redirect: () => Navigate({ to: '/' }),
            })
          }
          className="auth-option-container mb-1"
        >
          <img
            alt="Google's icon, the uppercase multicolor 'G', to register with Google"
            className="login-modal-option-social-icon"
            src={Google}
          />
          <span className="login-modal-option-social-prompt">
            {t('continueWithGoogle')}
          </span>
        </div>
        <div
          onClick={() =>
            continueWithTwitter({
              displayErrorMessage: setErrorMessage,
              redirect: () => Navigate({ to: '/' }),
            })
          }
          className="auth-option-container mb-1"
        >
          <img
            alt="Twitter's icon, the blue bird, to register with Twitter"
            className="login-modal-option-social-icon"
            src={Twitter}
          />
          <span className="login-modal-option-social-prompt">
            {t('continueWithTwitter')}
          </span>
        </div>
      </div>

      <div onClick={toggleLogin} className="login-modal-signup-container">
        <span className="login-modal-signup-prompt">
          {t('alreadyHaveAccount')}
        </span>
        <span className="login-modal-signup-action">{t('login')}</span>
      </div>
    </div>
  );
}
