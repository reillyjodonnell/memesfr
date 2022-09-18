import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { checkUsernameAvailability } from '../services/firebase-api';
import InputWithLabel from './templates/input-with-label';
import PopupModal from './templates/popup-modal';
import Spacer from './templates/spacer';
import { ReactComponent as Picture } from '../assets/icons/add-image.svg';

export default function NewUser() {
  const [usernameSpinner, setUsernameSpinner] = useState(false);
  const [validUsername, setValidUsername] = useState(true);
  const [usernameField, setUsernameField] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const [avatar, setAvatar] = useState<File | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const { t } = useTranslation('common');

  async function checkUsername(username: string) {
    // show spinner
    setUsernameSpinner(true);

    // check if username is available
    const usernameIsValid = await checkUsernameAvailability(username);

    if (usernameIsValid) {
      setUsernameSpinner(false);
      setValidUsername(true);
      setUsernameError(``);
    } else {
      setValidUsername(false);
      setUsernameSpinner(false);
      setUsernameError(`${username} is unavailable`);
    }
  }

  async function handleUsername(username: string) {
    setUsernameField(username);
    if (username?.length > 3) {
      setUsernameError('');
      checkUsername(username);
    } else if (usernameField?.length > 0) {
      setValidUsername(false);
      setUsernameError(t('usernameMustBe4Characters'));
    }
  }

  function openFile() {
    setAvatar(null);
    fileRef.current?.click();
  }

  function handlePhoto(photo: File) {
    setAvatar(photo);
  }

  function enableCreateAccount() {
    return avatar && validUsername && usernameField?.length > 3;
  }

  return (
    <PopupModal hideClose title="createYourAccount">
      <>
        <div className="login-modal-options-container">
          <div className="login-modal-login-container">
            <form
              className="flex flex-col w-full justify-center items-start"
              //   onSubmit={(e) => submitForm(e)}
            >
              <Spacer styles={'w-full relative'}>
                <>
                  <input
                    onChange={(e) =>
                      e.target?.files ? handlePhoto(e.target?.files[0]) : {}
                    }
                    accept=".png, .jpeg, .jpg, .gif"
                    ref={fileRef}
                    type="file"
                    className="hidden inset-0 absolute w-full h-full "
                  />
                  <div className="flex flex-col justify-center items-center w-full h-full">
                    <div
                      onClick={openFile}
                      className="flex  overflow-hidden hover:bg-hover transition-all cursor-pointer justify-center items-center h-20 w-20 border-2 rounded-full border-line"
                    >
                      {avatar ? (
                        <img
                          alt="This is the avatar to represent your profile"
                          src={URL.createObjectURL(avatar)}
                        />
                      ) : null}
                      <Picture className="stroke-white flex cursor-pointer hover:brightness-110 transition-all justify-center items-center h-6 w-6 rounded-full bg-hover"></Picture>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        openFile();
                      }}
                      className="my-4 cursor-pointer mx-1 bg-transparent hover:bg-hover rounded-lg px-4 py-2 text-white border border-line hover:brightness-110 transition-all"
                    >
                      Update avatar
                    </button>
                  </div>
                </>
              </Spacer>
              <Spacer styles={'w-full'}>
                <InputWithLabel
                  showCheckmark={
                    validUsername &&
                    !usernameSpinner &&
                    usernameField !== '' &&
                    usernameField.length > 3
                  }
                  error={usernameError ? true : false}
                  errorMessage={usernameError}
                  spinner={usernameSpinner}
                  name="username"
                  label={t('username')}
                  id={'username'}
                  value={usernameField}
                  onChange={(e: any) => handleUsername(e.target?.value ?? '')}
                  //   onPaste={(e: any) => handlePaste('login', e)}
                  type={'text'}
                  placeholder={t('username')}
                />
              </Spacer>

              <input
                data-testid="submit-button"
                type={'submit'}
                value={t<string>('createAccount')}
                className={`my-4
                ${
                  enableCreateAccount()
                    ? 'login-modal-option-login-button-active'
                    : 'login-modal-option-login-button-inactive'
                }
              `}
              />
            </form>
          </div>
        </div>
      </>
    </PopupModal>
  );
}
