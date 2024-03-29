import React, { useState, useEffect, useContext } from 'react';
import { I18nextProvider } from 'react-i18next';

import { useTranslation } from 'react-i18next';
const languageContext = React.createContext();

export function useLanguage() {
  return useContext(languageContext);
}

export default function LanguageProvider({ children }) {
  const [languagePreference, setLanguagePreference] = useState('');
  const [languageChanged, setLanguageChanged] = useState(false);

  // t must be here otherwise translations fail
  // eslint-disable-next-line no-unused-vars
  const [t, i18n] = useTranslation();

  useEffect(() => {
    const languageJSON = window.localStorage.getItem('language');
    setLanguagePreference(languageJSON);
    if (!languageJSON) {
      const languageValue = navigator.languages[0];
      const firstTwoLettersOfLanguage = languageValue.slice(0, 2);
      switch (firstTwoLettersOfLanguage) {
        case 'en':
          setLanguagePreference('English');
          break;
        case 'fr':
          setLanguagePreference('French');
          break;
        case 'de':
          setLanguagePreference('German');
          break;
        case 'zh':
          setLanguagePreference('Chinese');
          break;
        case 'ar':
          setLanguagePreference('Arabic');
          break;
        case 'es':
          setLanguagePreference('Spanish');
          break;
        case 'ru':
          setLanguagePreference('Russian');
          break;
        case 'pt':
          setLanguagePreference('Portuguese');
          break;
        case 'ja':
          setLanguagePreference('Japanese');
          break;
        // case 'it':
        //   setLanguagePreference('Italian');
        //   break;
        // case 'ja':
        //   setLanguagePreference('Japanese');
        //   break;
        // case 'hi':
        //   setLanguagePreference('Hindi');
        //   break;
        default:
          setLanguagePreference('English');
      }
    }
    // }
  }, []);

  useEffect(() => {
    setLanguageChanged(false);
  }, [languagePreference, languageChanged]);

  useEffect(() => {
    switch (languagePreference) {
      case 'English':
        i18n.changeLanguage('en');
        window.localStorage.setItem('language', 'English');

        break;
      case 'Spanish':
        i18n.changeLanguage('es');
        window.localStorage.setItem('language', 'Spanish');

        break;
      case 'French':
        i18n.changeLanguage('fr');
        window.localStorage.setItem('language', 'French');

        break;
      case 'German':
        i18n.changeLanguage('de');
        window.localStorage.setItem('language', 'German');

        break;
      case 'Chinese':
        i18n.changeLanguage('zh');
        window.localStorage.setItem('language', 'Chinese');

        break;
      case 'Arabic':
        i18n.changeLanguage('ar');
        window.localStorage.setItem('language', 'Arabic');

        break;
      case 'Russian':
        i18n.changeLanguage('ru');
        window.localStorage.setItem('language', 'Russian');

        break;
      case 'Portuguese':
        i18n.changeLanguage('pt');
        window.localStorage.setItem('language', 'Portuguese');

        break;
      case 'Japanese':
        i18n.changeLanguage('ja');
        window.localStorage.setItem('language', 'Japanese');

        break;
      default:
    }
  }, [languagePreference, i18n]);

  const setLanguageToSpanish = () => {
    setLanguagePreference('Spanish');
    i18n.changeLanguage('es');
    setLanguageChanged(true);
  };
  const setLanguageToChinese = () => {
    setLanguagePreference('Chinese');
    i18n.changeLanguage('zh');
    setLanguageChanged(true);
  };
  const setLanguageToFrench = () => {
    setLanguagePreference('French');
    i18n.changeLanguage('fr');
    setLanguageChanged(true);
  };
  const setLanguageToEnglish = () => {
    setLanguagePreference('English');
    i18n.changeLanguage('en');
    setLanguageChanged(true);
  };
  const setLanguageToGerman = () => {
    setLanguagePreference('German');
    i18n.changeLanguage('de');
    setLanguageChanged(true);
  };
  const setLanguageToArabic = () => {
    setLanguagePreference('Arabic');
    i18n.changeLanguage('ar');
    setLanguageChanged(true);
  };
  const setLanguageToRussian = () => {
    setLanguagePreference('Russian');
    i18n.changeLanguage('ru');
    setLanguageChanged(true);
  };
  const setLanguageToPortuguese = () => {
    setLanguagePreference('Portuguese');
    i18n.changeLanguage('pt');
    setLanguageChanged(true);
  };
  const setLanguageToJapanese = () => {
    setLanguagePreference('Japanese');
    i18n.changeLanguage('ja');
    setLanguageChanged(true);
  };

  const values = {
    languagePreference,
    setLanguageToSpanish,
    setLanguageToChinese,
    setLanguageToGerman,
    setLanguageToEnglish,
    setLanguageToFrench,
    setLanguageToArabic,
    setLanguageToRussian,
    setLanguageToPortuguese,
    setLanguageToJapanese,
  };

  return (
    <I18nextProvider i18n={i18n}>
      <languageContext.Provider value={values}>
        {children}
      </languageContext.Provider>
    </I18nextProvider>
  );
}
