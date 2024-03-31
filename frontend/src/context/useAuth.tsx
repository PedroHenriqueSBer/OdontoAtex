import { createContext, useContext, useMemo, useState } from "react";
import { IProviderProps } from "../types/props";
import { IUser } from "../types/models";
import { jwtDecode } from "jwt-decode";
import { ISigninInputModels, ISignupInputModels } from "../types/inputModels";
import { userController } from "../controllers/userController";
import { usePersistedState } from "../hooks/usePersistedState";


interface AuthContextProps {
  user: IUser
  isTokenValid: boolean
  signin: (input: ISigninInputModels) => Promise<string>
  signup: (input: ISignupInputModels) => Promise<string>
  logout: () => void
}

const AuthContext = createContext({} as AuthContextProps)

export const AuthContextProvider = ({children} : IProviderProps) => {

  const [user, setUser] = useState<IUser>({} as IUser)

  const [token, setToken] = usePersistedState<string | undefined>("data.token",undefined)
  const [refreshToken, setRefreshToken] = usePersistedState<string | undefined>("data.refreshToken",undefined)
  const isTokenValid = useMemo(
    () => (token ? (jwtDecode(token) as any).exp > Date.now() / 1000 : false),
    [token]
  );

  const signin = async (input: ISigninInputModels) => {
    try{
      const response = await userController.Login(input)

      if(typeof response === "string")
        return response
  
      setUser(response.user)
      setToken(response.token)
      setRefreshToken(response.refreshToken)
  
      return ""
    }
    catch{
      return ""
    }

  }

  const signup = async (input: ISignupInputModels) => {
    const response = await userController.Signup(input)

    if(typeof response === "string")
      return response

    setUser(response.user)
    setToken(response.token)
    setRefreshToken(response.refreshToken)
    return ""
  }

  const logout = () => {
    setToken(undefined)
    setRefreshToken(undefined)
    setUser({} as IUser)
    console.log()
  }



  return (
    <AuthContext.Provider value={{
      user,
      isTokenValid,
      signin,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)