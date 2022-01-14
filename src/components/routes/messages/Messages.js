import React from 'react';
import '../../../CSS Components/routes/messages/Messages.css';
import { useTranslation } from 'react-i18next';
export default function Messages() {
  const { t, i18n } = useTranslation('common');

  document.title = `✉️ ${t('messages')} - Memesfr`;

  return (
    <div className="main-content">
      <div className="messages-container">
        <div className="messages-header">
          <span>Here are the messages</span>
        </div>
        <div className="messages-sidebar">
          <span>Random user</span>
          <span>Random user</span>
          <span>Random user</span>
        </div>
        <div className="messages-main-content">
          <span>Messages go here</span>
        </div>
      </div>
    </div>
  );
}
