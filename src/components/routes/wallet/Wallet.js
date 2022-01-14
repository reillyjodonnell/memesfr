import React from 'react';
import { useTranslation } from 'react-i18next';
export default function Wallet() {
  const { t, i18n } = useTranslation('common');

  document.title = `🔒 ${t('wallet')} - Memesfr`;
  return (
    <div className="main-content">
      <span>This is the wallet</span>
    </div>
  );
}
