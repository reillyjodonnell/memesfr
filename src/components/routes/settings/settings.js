import React, { useState, useEffect } from 'react';
import { ReactComponent as SettingsIcon } from '../../../assets/svg/settings.svg';
import '../../../css-components/routes/settings/settings.css';
import { ReactComponent as CheckMark } from '../../../assets/icons/checkmark.svg';
import { useTheme } from '../../../contexts/theme-context';
import { ReactComponent as DisplayIcon } from '../../../assets/icons/palette.svg';
import { ReactComponent as Lock } from '../../../assets/svg/lock.svg';
import { ReactComponent as Trash } from '../../../assets/svg/trash.svg';
import { ReactComponent as User } from '../../../assets/svg/user.svg';
import { ReactComponent as Camera } from '../../../assets/icons/image.svg';
import { ReactComponent as Pencil } from '../../../assets/svg/pencil.svg';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HelpOutlineRounded } from '@material-ui/icons';

export default function Settings() {
  const [activeMenu, setActiveMenu] = useState(0);
  const {
    activeColor,
    SelectAnotherColor,
    darkMode,
    activeBackground,
    handleBackgroundColor,
  } = useTheme();

  const { t, i18n } = useTranslation('common');

  const ActiveColor = () => {
    return (
      <div className="color-container-active">
        <CheckMark className="color-container-active-icon" />
      </div>
    );
  };

  const handleBackgroundIndex = (index) => {
    handleBackgroundColor(index);
  };

  return (
    <div className="settings-main-content">
      <div className="settings-header-column">
        <div
          onClick={() => setActiveMenu(0)}
          className={`settings-header-option ${
            activeMenu === 0 && 'settings-header-option-active'
          }`}
        >
          <SettingsIcon className="settings-header-option-icon" />
          <span className="settings-header-option-text">{t('settings')}</span>
        </div>
        <div
          onClick={() => setActiveMenu(1)}
          className={`settings-header-option ${
            activeMenu === 1 && 'settings-header-option-active'
          }`}
        >
          <DisplayIcon className="settings-header-option-icon" />
          <span className="settings-header-option-text">{t('display')}</span>
        </div>
        <div
          onClick={() => setActiveMenu(2)}
          className={`settings-header-option ${
            activeMenu === 2 && 'settings-header-option-active'
          }`}
        >
          <HelpOutlineRounded className="settings-header-option-icon" />
          <span className="settings-header-option-text">{t('help')}</span>
        </div>
      </div>
      <div className="settings-dropdown-column">
        {activeMenu === 0 && (
          <>
            <div className="setting-dropdown-title">
              <span>{t('accountAndPrivacy')}</span>
            </div>
            <div className="settings-main-section">
              <div className="settings-option">
                <div className="settings-header-option">
                  <Lock className="settings-option-icon" />
                  <span className="settings-option-text">
                    {t('changeYourPassword')}
                  </span>
                </div>
              </div>
              <div className="settings-option">
                <div className="settings-header-option">
                  <User className="settings-option-icon" />
                  <span className="settings-option-text">
                    {t('viewAccountInformation')}
                  </span>
                </div>
              </div>
              <div className="settings-option">
                <div className="settings-header-option">
                  <Camera className="settings-option-icon" />
                  <span className="settings-option-text">
                    {t('changeProfilePic')}
                  </span>
                </div>
              </div>
              <div className="settings-option">
                <div className="settings-header-option">
                  <Pencil className="settings-option-icon" />
                  <span className="settings-option-text">
                    {t('changeUsername')}
                  </span>
                </div>
              </div>
              <div className="settings-option">
                <div className="settings-header-option">
                  <Trash className="settings-option-icon" />
                  <span className="settings-option-text">
                    {t('deleteYourAccount')}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
        {activeMenu === 1 && (
          <>
            <div className="setting-dropdown-title">
              <span>{t('accentColor')}</span>
            </div>
            <div className="select-accent-color">
              <div
                className="accent-color-1"
                onClick={() => SelectAnotherColor(1, 'purple')}
              >
                <div className="color-container color-container-1">
                  {activeColor === 1 && <ActiveColor />}
                </div>
              </div>
              <div
                className="accent-color-2"
                onClick={() => SelectAnotherColor(2, 'red')}
              >
                <div className="color-container color-container-2">
                  {activeColor === 2 && <ActiveColor />}
                </div>
              </div>
              <div
                className="accent-color-3"
                onClick={() => SelectAnotherColor(3, 'secondary-blue')}
              >
                <div className="color-container color-container-3">
                  {activeColor === 3 && <ActiveColor />}
                </div>
              </div>
              <div
                className="accent-color-4"
                onClick={() => SelectAnotherColor(4, 'green')}
              >
                <div className="color-container color-container-4">
                  {activeColor === 4 && <ActiveColor />}
                </div>
              </div>
              <div
                className="accent-color-5"
                onClick={() => SelectAnotherColor(5, 'orange')}
              >
                <div className="color-container color-container-5">
                  {activeColor === 5 && <ActiveColor />}
                </div>
              </div>
            </div>
            <div className="setting-dropdown-title">
              <span>{t('backgroundColor')}</span>
            </div>
            <div className="select-accent-color">
              <div
                className="accent-color-1"
                onClick={
                  activeBackground !== 0 ? () => handleBackgroundIndex(0) : null
                }
              >
                <div
                  className={`color-container-expanded dark-mode-container ${
                    activeBackground === 0 && 'color-container-expanded-active'
                  }`}
                >
                  {t('darkMode')}
                </div>
              </div>
              <div
                className="accent-color-1"
                onClick={
                  activeBackground !== 1 ? () => handleBackgroundIndex(1) : null
                }
              >
                <div
                  className={`color-container-expanded default-mode-container ${
                    activeBackground === 1 && 'color-container-expanded-active'
                  }`}
                >
                  {t('defaultMode')}
                </div>
              </div>
              <div
                className="accent-color-1"
                onClick={
                  activeBackground !== 2 ? () => handleBackgroundIndex(2) : null
                }
              >
                <div
                  className={`color-container-expanded light-mode-container ${
                    activeBackground === 2 && 'color-container-expanded-active'
                  }`}
                >
                  {t('lightMode')}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
