import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  checkUsernameAvailability,
  // createUserProfile,
} from '../services/firebase-api';
import InputWithLabel from './templates/input-with-label';
import PopupModal from './templates/popup-modal';
import Spacer from './templates/spacer';
import { ReactComponent as Picture } from '../assets/icons/add-image.svg';
import { useAuth } from '../contexts/auth-context';
import LoadingSpinner from './loading-spinner';

export default function NewUser() {
  const [usernameSpinner, setUsernameSpinner] = useState(false);
  const [validUsername, setValidUsername] = useState(true);
  const [usernameField, setUsernameField] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { t } = useTranslation('common');

  const { currentUser, setNewUser } = useAuth();

  async function createProfile(e: any) {
    setLoading(true);
    const username = usernameField;
    const userId = currentUser?.uid ?? null;

    // we need to send over the username, uid, and avatar to generate the profile
    try {
      if (username && userId && avatar) {
        // await createUserProfile({ userId, avatar, username });
        setLoading(false);
        setNewUser(false);
      } else {
        setLoading(false);
        setError('Oh no - try again!');
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError('Uh oh something went wrong! 💔 Try again!');
    }
  }

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
    setError('');
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
    setError('');
    setAvatar(null);
    fileRef.current?.click();
  }

  function handlePhoto(photo: File) {
    setAvatar(photo);
  }

  function enableCreateAccount() {
    return !!(avatar && validUsername && usernameField?.length > 3);
  }

  return (
    <PopupModal hideClose title="createYourAccount">
      <>
        <div className="login-modal-options-container">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="login-modal-login-container">
              <form
                onSubmit={(e) => createProfile(e)}
                className="flex flex-col w-full justify-center items-start"
              >
                {error ? (
                  <Spacer styles="w-full flex justify-center items-center  ">
                    <span className="flex px-4 py-2  bg-[#ff00004d]  rounded-round justify-center bg-[red-500] items-center text-red-500">
                      {error}
                    </span>
                  </Spacer>
                ) : null}

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
                            className="flex w-full h-full object-cover"
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
                  disabled={!enableCreateAccount()}
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
          )}
        </div>
      </>
    </PopupModal>
  );
}
