import React from 'react';
import '../../../CSS Components/routes/create/Create.css';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';

export default function Create() {
  const { t, i18n } = useTranslation('common');
  const { currentUser } = useAuth();

  document.title = `✏️ ${t('create')} - Memesfr`;

  return (
    <div className="create-post-container">
      <div className="create-post-container-title">
        <span className="create-post-title">{t('createPost')}</span>
        <span className="create-post-subtitle">{t('uploadDankMeme')}</span>
      </div>
      <div>content</div>
      <div>upload</div>
    </div>
  );
}
