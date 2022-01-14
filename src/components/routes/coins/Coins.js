import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Coins() {
  const { t, i18n } = useTranslation('common');
  document.title = `🤑 ${t('coins')} - Memesfr`;
  return (
    <div className="main-content">
      <span>{t('coins')}</span>
    </div>
  );
}
