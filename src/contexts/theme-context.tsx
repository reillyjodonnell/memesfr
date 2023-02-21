import React, { useContext, useState, useEffect } from 'react';
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

  // Everything is in useEffect to prevent from running on Server
  useEffect(() => {
    const r = document.querySelector(':root');

    const handleLightMode = () => {
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
    };

    const handleDarkMode = () => {
      r.classList.remove('light');
      r.classList.add('dark');

      r.style.setProperty('--bg', 'var(--black-bg)');
      r.style.setProperty('--text-color', 'var(--light-text)');
      r.style.setProperty('--line', 'var(--dark-mode-hover)');
      r.style.setProperty(
        '--secondary-text-color',
        'var(--dark-text-secondary)'
      );
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
    };

    const handleDefaultMode = () => {
      r.style.setProperty('--bg', 'var(--dark-bg)');
      r.style.setProperty('--text-color', 'var(--light-text)');
      r.style.setProperty('--line', 'var(--dark-mode-line)');
      r.style.setProperty(
        '--secondary-text-color',
        'var(--dark-text-secondary)'
      );
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
    };

    const handleTheme = () => {
      const backgroundColor = localStorage.getItem('backgroundColor');
      const userPrefersDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      if (userPrefersDarkMode || backgroundColor === 'dark') {
        handleDarkMode();
        setActiveBackground(0);
        return;
      }
      if (backgroundColor === 'oldSchool') {
        handleDefaultMode();
        setActiveBackground(1);
        return;
      }

      handleLightMode();
      setActiveBackground(2);
    };
    handleTheme();
  }, [setActiveBackground]);

  useEffect(() => {
    const r = document.querySelector(':root');

    const handleSettingColor = (color) => {
      r.style.setProperty('--primary-accent', `var(--${color})`);
      r.style.setProperty('--highlight', `var(--${color}-highlight)`);
      r.style.setProperty(
        '--light-highlight',
        `var(--${color}-light-highlight)`
      );
    };
    const colorValue = localStorage.getItem('accentColor');
    const colorNumberJSON = localStorage.getItem('accentColorNumber');
    const colorNumber = JSON.parse(colorNumberJSON);
    if (!colorNumber) {
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
    if (mount) {
      if (doge) {
        setDogeBackground();
      }
      if (doge === false) document.body.style.backgroundImage = '';
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
