import { IProviderProps, LoadingHookProps } from "props";
import { createContext, useContext, useState } from "react";
import { Containter } from "./style";

const LoadingHook = createContext({} as LoadingHookProps)

export const LoadingHookProvider = ({children}: IProviderProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <LoadingHook.Provider value={{
      isLoading,
      setIsLoading
    }}>
      {isLoading &&
        <Containter>
          <span />
        </Containter>
      }
      {children}
    </LoadingHook.Provider>
  )
}

export const useLoading = () => useContext(LoadingHook)