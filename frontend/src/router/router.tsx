import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../pages/home"
import { Auth, AuthAdm } from "./auth"
import { Signin } from "../pages/signin/Signin"
import { Users } from "../pages/users"
import { Patients } from "../pages/patients"
import { CreatePatients } from "../pages/createpatients"



export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<AuthAdm><Users /></AuthAdm>} />
        <Route path="/patients" element={<Auth><Patients /></Auth>} />
        <Route path="/CreatePatients" element={<Auth><CreatePatients/></Auth>} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  )
}