import { createContext, useContext, useState } from "react";
import { IProviderProps } from "../types/props";
import { LoadingScreen } from "../components/loadingScreen";


interface LoadingHookProps {
  isLoading: boolean,
  setIsLoading: (value: boolean) => void
}

const LoadingHook = createContext({} as LoadingHookProps)

export const LoadingHookProvider = ({children} : IProviderProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <LoadingHook.Provider value={{
      isLoading,
      setIsLoading
    }}>
      <LoadingScreen isLoading={isLoading} />
      {children}
    </LoadingHook.Provider>
  )
}

export const useLoading = () => useContext(LoadingHook)