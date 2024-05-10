import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../pages/home"
import { Auth, AuthAdm } from "./auth"
import { Signin } from "../pages/signin/Signin"
import { Users } from "../pages/Users"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Auth><Home /></Auth>} />
        <Route path="/users" element={<AuthAdm><Users /></AuthAdm>} />
        <Route path="/" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  )
}