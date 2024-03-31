import { useEffect } from "react"
import { IProviderProps } from "../types/props"
import { useAuth } from "../context/useAuth"
import { useNavigate } from "react-router-dom"

export const Auth = ({children}: IProviderProps) => {
  const { isTokenValid } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(!isTokenValid)
      navigate('/')
  },[isTokenValid])
  
  return (
    <>
      {children}
    </>
  )
}