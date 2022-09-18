import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Login from './login';
import PopupModal from '../templates/popup-modal';
import Register from './register';

interface IProps {
  toggleLoginModal: Function;
}

export default function UserAuth({ toggleLoginModal }: IProps) {
  const [login, setLogin] = useState(true);
  const { t } = useTranslation('common');

  return (
    <PopupModal
      toggleState={toggleLoginModal}
      title={login ? t('login') : t('register')}
    >
      {login ? (
        <Login
          closeModal={toggleLoginModal}
          toggleLogin={() => setLogin((prev) => !prev)}
        />
      ) : (
        <Register
          closeModal={toggleLoginModal}
          toggleLogin={() => setLogin((prev) => !prev)}
        />
      )}
    </PopupModal>
  );
}
