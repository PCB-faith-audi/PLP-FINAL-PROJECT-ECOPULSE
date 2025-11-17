import { useEffect, useState } from "react";

// Persist a value in localStorage with sane SSR/try/catch guards
export function useLocalStorage(key, initialValue) {
  const isBrowser = typeof window !== "undefined";
  const read = () => {
    if (!isBrowser) return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = React.useState(read);

  React.useEffect(() => {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value, isBrowser]);

  return [value, setValue];
}