import React, { useContext, useState, useEffect } from "react";
import Doge from "../Assets/doge.svg";

const ThemeContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [doge, setDoge] = useState(false);

  useEffect(() => {
    if (doge == true) {
      setDogeBackground();
    }
    if (doge == false) document.body.style.backgroundImage = "";
  }, [doge]);

  function updateDoge() {
    setDoge((prevDoge) => !prevDoge);
  }

  function setDogeBackground() {
    console.log("Activating doge");
    document.body.style.backgroundImage = `url(${Doge})`;
    document.body.style.backgroundSize = "cover";

    console.log(document.body.style.backgroundImage);
  }

  const values = {
    setDogeBackground,
    updateDoge,
  };
  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}
