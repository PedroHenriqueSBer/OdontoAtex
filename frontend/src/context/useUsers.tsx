import { createContext, useContext, useEffect, useState } from "react";
import { IProviderProps } from "../types/props";
import { IUser } from "../types/models";

interface UsersContextProps {
  users: IUser[]
  setUsers: (value: IUser[]) => void
}

const UsersContext = createContext({} as UsersContextProps)

export const UserContextProvider = ({children} : IProviderProps) => {

  const [users, setUsers] = useState<IUser[]>([])

  useEffect(()=>{
  },[])

  return (
    <UsersContext.Provider value={{
      users,
      setUsers,
    }}>
      {children}
    </UsersContext.Provider>
  )
}

export const useUser = () => useContext(UsersContext)