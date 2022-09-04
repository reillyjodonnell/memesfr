import React, { useState, useEffect, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import '../../css-components/login-modal.css';
import './register.css';
// import { useLanguage } from '../../contexts/language-context';
import { ReactComponent as BackArrow } from '../../assets/icons/chevron-left.svg';
// import { useAuth } from '../../contexts/auth-context';
// import Firebase from 'firebase/app';
import Fbook from '../../assets/brands/facebook.png';
import Google from '../../assets/brands/google.png';
import Twitter from '../../assets/brands/twitter.png';
import InputWithLabel from '../templates/input-with-label';
import { checkUsernameAvailability } from '../../services/firebase-api';
import { formatPhoneNumber, isOnlyNumbers, isValidEmail } from '../../helper';
type RegisterProps = {
  toggleLogin: MouseEventHandler<HTMLDivElement>;
};
export default function Register({ toggleLogin }: RegisterProps) {
  //   const [smallerInput, setSmallerInput] = useState<Boolean>(true);
  const [nextButtonClicked, setNextButtonClicked] = useState<Boolean>(false);
  //   const [validLoginInput, setValidLoginInput] = useState<Boolean>(false);
  const [enableSubmitButton, setEnableSubmitButton] = useState<Boolean>(false);
  const [phone, setPhone] = useState(true);

  const [usernameSpinner, setUsernameSpinner] = useState(false);
  const [validUsername, setValidUsername] = useState(true);
  const [usernameField, setUsernameField] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const [nameField, setNameField] = useState('');

  const [emailField, setEmailField] = useState('');
  const [emailError, setEmailError] = useState('');

  const [phoneField, setPhoneField] = useState('');

  const [error, setError] = useState<String>('');

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
  }, [usernameField]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enableSubmitButton) {
      try {
        // await login(loginField, passwordField).then((user: Firebase.User) => {
        //   if (user) {
        //     window.location.reload();
        //   }
        // });
        console.log(validUsername);
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

  //   const handleInputChange = () => {
  //     setError('');
  //     areBothFieldsValid()
  //       ? setEnableSubmitButton(true)
  //       : setEnableSubmitButton(false);
  //   };

  //   const handlePaste = (type: string, e: React.ClipboardEvent) => {
  //     e.preventDefault();
  //     const value = e.clipboardData.getData('Text');
  //     if (type === 'login') {
  //       setLoginField(value);
  //     } else {
  //       setPasswordField(value);
  //     }
  //     handleInputChange();
  //   };

  const { t } = useTranslation('common');

  //   const { languagePreference } = useLanguage();

  //   useEffect(() => {
  //     switch (languagePreference) {
  //       case 'English':
  //         setSmallerInput(false);
  //         break;
  //       default:
  //         setSmallerInput(true);
  //         break;
  //     }
  //   }, [languagePreference]);

  //   const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
  //     e.preventDefault();
  //     checkForInvalidInput((e.target as HTMLInputElement).value);
  //     setLoginField((e.target as HTMLInputElement).value);

  //     parseCategoryOfInput((e.target as HTMLInputElement).value);
  //   };

  //   const whiteSpaceIsPresent = /\s/;

  //   const checkForInvalidInput = (input: string) => {
  //     if (whiteSpaceIsPresent.test(input)) {
  //       setError('Invalid Input');
  //     } else {
  //       setError('');
  //     }
  //   };

  //   const areBothFieldsValid = () => {
  //     if (
  //       typeof loginField === 'string' &&
  //       typeof passwordField === 'string' &&
  //       loginField.length > 5 &&
  //       passwordField?.length > 5
  //     ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   };

  //   function parseCategoryOfInput(passedValue: string) {
  //     if (formatPhoneNumber(passedValue) !== null && isOnlyNumbers(passedValue)) {
  //       const formattedNumber = formatPhoneNumber(passedValue);
  //       typeof formattedNumber === 'string' && setLoginField(formattedNumber);
  //       setValidLoginInput(true);
  //       // setDetectedLoginType('phone');
  //     } else if (passedValue.length > 4 && isOnlyNumbers(passedValue) === false) {
  //       setValidLoginInput(true);
  //       // setDetectedLoginType('username');
  //     } else {
  //       setValidLoginInput(false);
  //     }
  //   }

  //   function isOnlyNumbers(passedInput: string) {
  //     return /^\d+$/.test(passedInput);
  //   }

  //   function formatPhoneNumber(number: String) {
  //     var match = number.match(/^(\d{3})(\d{3})(\d{4})$/);
  //     if (match) {
  //       return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  //     }
  //     return null;
  //   }

  const handleNext = () => {
    setNextButtonClicked((prevState) => !prevState);
  };

  const handleBack = () => {
    setNextButtonClicked((prevState) => !prevState);
    // clear the inputs
    setUsernameField('');
    setNameField('');
    setPhoneField('');
    setEmailField('');
  };

  const handlePhoneNumber = (number: string) => {
    const formattedNumber = formatPhoneNumber(number);

    if (isOnlyNumbers(number) && formattedNumber !== null) {
      setPhoneField(formattedNumber);
    } else {
      setPhoneField(number);
    }
  };

  const handleEmail = (email: string) => {
    const valid = isValidEmail(email);
    setEmailField(email);

    if (valid) {
      setEmailError('');
    } else {
      setEmailError(t('emailError'));
    }
  };

  return nextButtonClicked ? (
    <>
      <div onClick={handleBack} className="login-modal-back-button">
        <BackArrow />
      </div>
      <div className="login-modal-options-container">
        <div className="login-modal-login-container">
          <form className="" onSubmit={(e) => submitForm(e)}>
            <InputWithLabel
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
            <InputWithLabel
              name="name"
              label={t('name')}
              id={'name'}
              value={nameField}
              onChange={(e: any) => setNameField(e.target?.value ?? '')}
              //   onPaste={(e: any) => handlePaste('login', e)}
              type={'text'}
              placeholder={t('name')}
            />
            {phone ? (
              <InputWithLabel
                name="phone"
                label={t('phone')}
                id={'phone'}
                value={phoneField}
                onChange={(e: any) => handlePhoneNumber(e?.target?.value ?? '')}
                // onPaste={(e: any) => handlePaste('login', e)}
                type={'text'}
                placeholder={t('phone')}
              />
            ) : (
              <InputWithLabel
                error={emailError ? true : false}
                errorMessage={emailError}
                name="email"
                label={t('email')}
                id={'email'}
                value={emailField}
                onChange={(e: any) => handleEmail(e?.target?.value ?? '')}
                // onPaste={(e: any) => handlePaste('login', e)}
                type={'text'}
                placeholder={t('email')}
              />
            )}
            <div className="flex justify-start items-center ">
              <span
                className="text-primary-accent px-2 py-1 hover:bg-hover rounded"
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
              type={'submit'}
              value={t<string>('register')}
              className={`my-4
                ${
                  enableSubmitButton
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
      <div onClick={handleNext} className="auth-option-container my-1">
        <span className="login-modal-option-social-prompt">
          {t('usePhoneOrEmail')}
        </span>
      </div>
      <span className="login-modal-option">{t('or')}</span>
      <div className="login-modal-option-parent">
        <div className="auth-option-container mb-1">
          <img className="login-modal-option-social-icon" src={Fbook} />
          <span className="login-modal-option-social-prompt">
            {t('continueWithFacebook')}
          </span>
        </div>
        <div className="auth-option-container mb-1">
          <img className="login-modal-option-social-icon" src={Google} />
          <span className="login-modal-option-social-prompt">
            {t('continueWithGoogle')}
          </span>
        </div>
        <div className="auth-option-container mb-1">
          <img className="login-modal-option-social-icon" src={Twitter} />
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
