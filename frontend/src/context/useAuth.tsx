import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IProviderProps } from "../types/props";
import { IUser } from "../types/models";
import { jwtDecode } from "jwt-decode";
import { usePersistedState } from "../hooks/usePersistedState";
import { authController } from "../controllers/authController";


interface AuthContextProps {
  user: IUser
  setUser: (value: IUser) => void
  isTokenValid: boolean
  token: string | undefined
  setToken: (value: string | undefined) => void
  setRefreshToken: (value: string | undefined) => void
  logout: () => void
}

const AuthContext = createContext({} as AuthContextProps)

export const AuthContextProvider = ({children} : IProviderProps) => {

  const [user, setUser] = usePersistedState<IUser>('data.user',{} as IUser)

  const [token, setToken] = usePersistedState<string | undefined>("data.token",undefined)
  const [refreshToken, setRefreshToken] = usePersistedState<string | undefined>("data.refreshToken",undefined)
  const isTokenValid = useMemo(
    () => (token ? (jwtDecode(token) as any).exp > Date.now() / 1000 : false),
    [token]
  );

  const logout = () => {
    setToken(undefined)
    setRefreshToken(undefined)
    setUser({} as IUser)
  }

  useEffect(()=>{
    if(typeof refreshToken === 'string'){
      authController.RefreshToken(refreshToken).then((response) => {
        setUser(response.user)
        setToken(response.token)
        setRefreshToken(response.refreshToken)
      }).catch(()=>{
        logout()
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[refreshToken])



  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      token, 
      setToken,
      setRefreshToken,
      isTokenValid,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)