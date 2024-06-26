import { createContext, useContext, useEffect, useState } from "react";
import { userController } from "../../controllers";
import { IUser } from "models";
import { IProviderProps } from "props";
import { useLoading } from "../useLoading";
import { useAuth } from "../useAuth";
import { TypeUser } from "../../types/enum";

interface UsersContextProps {
  users: IUser[]
  setUsers: (value: IUser[]) => void
  update: () => void
}

const UsersContext = createContext({} as UsersContextProps)

export const UserContextProvider = ({children} : IProviderProps) => {

  const { setIsLoading } = useLoading()
  const { isTokenValid, user } = useAuth()

  const [users, setUsers] = useState<IUser[]>([])

  useEffect(()=>{
    if(isTokenValid && [TypeUser.ADM].includes(user.type))
      update()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isTokenValid])

  const update = () => {
    setIsLoading(true)
    userController.GetAll()
      .then(setUsers)
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }

  return (
    <UsersContext.Provider value={{
      users,
      setUsers,
      update
    }}>
      {children}
    </UsersContext.Provider>
  )
}

export const useUser = () => useContext(UsersContext)