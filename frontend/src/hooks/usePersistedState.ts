import { useEffect, useState } from "react";

export const usePersistedState = <T>(key: string, initialState: T) => {
  const [state, setState] = useState<T>(() => {
    let storageValue = localStorage.getItem(key);

    try {
      if (storageValue) {
        return JSON.parse(storageValue);
      }
    } catch (e) {}
    return initialState;
  });

  useEffect(() => {
    if (state === undefined) {
      localStorage.removeItem(key);
      return;
    }
    let storageValue = JSON.stringify(state);
    localStorage.setItem(key, storageValue);
  }, [key, state]);

  return [state, setState] as [T, React.Dispatch<React.SetStateAction<T>>];
};
