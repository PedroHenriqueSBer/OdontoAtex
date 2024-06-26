import { ReactNode, useEffect } from "react"
import { useAuth } from "../context/useAuth"
import { useNavigate } from "react-router-dom"
import { TypeUser } from "../types/enum"
import styled from "styled-components"

interface AuthProps {
  children: ReactNode
}

const AuthContainer = styled.div`
  width: 100%;
  height: 100vh;
`

export const Auth = ({children}: AuthProps) => {
  const { isTokenValid } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(!isTokenValid)
      navigate('/signin')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isTokenValid])
  
  return (
    <AuthContainer>
      {children}
    </AuthContainer>
  )
}


export const AuthAdm = ({children}: AuthProps) => {
  const { isTokenValid, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(!isTokenValid)
      navigate('/signin')
    if(user.type !== TypeUser.ADM)
      navigate('/')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isTokenValid])
  
  return (
    <AuthContainer>
      {children}
    </AuthContainer>
  )
}