"use client";

import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const tmode = localStorage.getItem("themeMode");
    if (tmode !== null) {
      setMode(tmode);
    }
  }, []);

  useEffect(() => {
    if (mode !== null) {
      localStorage.setItem("themeMode", mode);
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
