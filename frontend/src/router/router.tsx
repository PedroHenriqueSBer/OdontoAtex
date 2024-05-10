import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../pages/home"
import { Auth, AuthAdm } from "./auth"
import { Signin } from "../pages/signin/Signin"
import { Users } from "../pages/Users"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<AuthAdm><Users /></AuthAdm>} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  )
}