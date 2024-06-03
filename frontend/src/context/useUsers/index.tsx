import { createContext, useContext, useEffect, useState } from "react";
import { userController } from "../../controllers";
import { IUser } from "models";
import { IProviderProps } from "props";

interface UsersContextProps {
  users: IUser[]
  setUsers: (value: IUser[]) => void
  update: () => void
}

const UsersContext = createContext({} as UsersContextProps)

export const UserContextProvider = ({children} : IProviderProps) => {

  const [users, setUsers] = useState<IUser[]>([])

  useEffect(()=>{
    update()
  },[])

  const update = () => {
    userController.GetAll().then(setUsers).catch(console.log)
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