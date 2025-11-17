// src/context/ThemeContext.jsx
import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const ThemeContext = createContext({ theme: "light", setTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("ecopulse_theme", "light");

  useEffect(() => {
    const el = document.documentElement;
    el.classList.remove("light", "dark");
    el.classList.add(theme === "dark" ? "dark" : "light");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
