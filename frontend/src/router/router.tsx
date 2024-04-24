import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../pages/home"
import { Auth } from "./auth"
import { Signup } from "../pages/signup"
import { Signin } from "../pages/signin"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Auth><Home /></Auth>} />
        <Route path="/" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}