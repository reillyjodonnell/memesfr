import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Help() {
  const { t, i18n } = useTranslation('common');
  document.title = `？${t('help')} - Memesfr`;
  return (
    <div className="main-content">
      <span>This is the help page</span>
    </div>
  );
}
