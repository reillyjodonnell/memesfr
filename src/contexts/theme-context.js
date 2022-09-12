import React, { useContext, useState, useEffect, useCallback } from 'react';
import Doge from '../assets/buff-doge.jpg';

const ThemeContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [doge, setDoge] = useState(false);
  const [activeColor, setActiveColor] = useState(1);
  const [activeBackground, setActiveBackground] = useState(null);
  const [darkMode, setDarkMode] = useState(null);
  const [accentColor, setAccentColor] = useState('');

  const r = document.querySelector(':root');

  const handleLightMode = useCallback(() => {
    r.classList.remove('dark');
    r.classList.add('light');
    r.style.setProperty('--bg', 'var(--light-bg)');
    r.style.setProperty('--text-color', 'var(--dark-text)');
    r.style.setProperty('--line', 'var(--light-mode-line)');
    r.style.setProperty(
      '--secondary-text-color',
      'var(--light-text-secondary)'
    );
    r.style.setProperty('--shadow', 'var(--light-mode-shadow)');
    r.style.setProperty('--hover', 'var(--light-mode-hover)');
    r.style.setProperty(
      '--secondary-title-color',
      'var(--light-secondary-title-color)'
    );
    r.style.setProperty(
      '--bg-transparent',
      'var(--background-transparent-light)'
    );
    r.style.setProperty('--navigation', 'var(--light-mode-navigation)');
  }, [r]);

  const handleDarkMode = useCallback(() => {
    r.classList.remove('light');
    r.classList.add('dark');

    r.style.setProperty('--bg', 'var(--black-bg)');
    r.style.setProperty('--text-color', 'var(--light-text)');
    r.style.setProperty('--line', 'var(--dark-mode-hover)');
    r.style.setProperty('--secondary-text-color', 'var(--dark-text-secondary)');
    r.style.setProperty('--shadow', 'var(--dark-mode-shadow)');
    r.style.setProperty('--hover', 'var(--normal-mode-hover)');
    r.style.setProperty(
      '--secondary-title-color',
      'var(--dark-secondary-title-color)'
    );
    r.style.setProperty(
      '--bg-transparent',
      'var(--background-transparent-dark)'
    );
    r.style.setProperty('--navigation', 'var(--dark-mode-navigation)');
  }, [r]);

  const handleDefaultMode = useCallback(() => {
    r.style.setProperty('--bg', 'var(--dark-bg)');
    r.style.setProperty('--text-color', 'var(--light-text)');
    r.style.setProperty('--line', 'var(--dark-mode-line)');
    r.style.setProperty('--secondary-text-color', 'var(--dark-text-secondary)');
    r.style.setProperty('--shadow', 'var(--dark-mode-shadow)');
    r.style.setProperty('--hover', 'var(--dark-mode-hover)');
    r.style.setProperty(
      '--secondary-title-color',
      'var(--dark-secondary-title-color)'
    );
    r.style.setProperty(
      '--bg-transparent',
      'var(--background-transparent-dark)'
    );
    r.style.setProperty('--navigation', 'var(--dark-mode-navigation)');
  }, [r]);

  useEffect(() => {
    const darkModeJSON = localStorage.getItem('backgroundColor');
    // const darkModeValue = JSON.parse(darkModeJSON);
    switch (darkModeJSON) {
      case 'dark':
        handleDarkMode();
        setActiveBackground(0);
        break;
      case 'oldSchool':
        handleDefaultMode();
        setActiveBackground(1);
        break;
      case 'light':
        handleLightMode();
        setActiveBackground(2);
        break;
      default:
        handleLightMode();
        setActiveBackground(2);
        break;
    }
  }, [handleDarkMode, handleLightMode, setActiveBackground, handleDefaultMode]);

  useEffect(() => {
    const colorValue = localStorage.getItem('accentColor');
    const colorNumberJSON = localStorage.getItem('accentColorNumber');
    const colorNumber = JSON.parse(colorNumberJSON);
    if (colorNumber === null) {
      setAccentColor('purple');
      setActiveColor(1);
      handleSettingColor('purple');
    } else {
      setAccentColor(colorValue);
      setActiveColor(colorNumber);
      handleSettingColor(colorValue);
    }
  }, []);

  useEffect(() => {
    let mount = true;
    if (mount === true) {
      if (doge == true) {
        setDogeBackground();
      }
      if (doge == false) document.body.style.backgroundImage = '';
    }
    return () => (mount = false);
  }, [doge]);

  function updateDoge() {
    setDoge((prevDoge) => !prevDoge);
  }

  function setDogeBackground() {
    document.body.style.backgroundImage = `url(${Doge})`;
    document.body.style.backgroundSize = 'contain';
  }

  const handleBackgroundColor = (index) => {
    switch (index) {
      case 0:
        localStorage.setItem('backgroundColor', 'dark');
        handleDarkMode();
        setActiveBackground(0);
        break;
      case 1:
        localStorage.setItem('backgroundColor', 'oldSchool');
        handleDefaultMode();
        setActiveBackground(1);

        break;
      case 2:
        localStorage.setItem('backgroundColor', 'light');
        handleLightMode();
        setActiveBackground(2);

        break;
      default:
        break;
    }
  };
  const toggleDarkMode = () => {
    if (darkMode) {
      localStorage.setItem('backgroundColor', 'light');
      handleLightMode();
    } else {
      localStorage.setItem('backgroundColor', 'dark');
      handleDarkMode();
    }

    setDarkMode((prev) => !prev);
  };

  const handleStoringColor = (color, value) => {
    localStorage.setItem('accentColor', color);
    localStorage.setItem('accentColorNumber', value);
  };

  const handleSettingColor = (color) => {
    r.style.setProperty('--primary-accent', `var(--${color})`);
    r.style.setProperty('--highlight', `var(--${color}-highlight)`);
    r.style.setProperty('--light-highlight', `var(--${color}-light-highlight)`);
  };

  const SelectAnotherColor = (value, color) => {
    setActiveColor(value);
    handleStoringColor(color, value);
    handleSettingColor(color);
    setAccentColor(color);
  };

  const values = {
    setDogeBackground,
    updateDoge,
    doge,
    activeColor,
    setActiveColor,
    SelectAnotherColor,
    darkMode,
    handleBackgroundColor,
    accentColor,
    toggleDarkMode,
    activeBackground,
  };
  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}
