import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthAdm } from "./auth"
import { Home, Signin, Users } from "../pages"

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