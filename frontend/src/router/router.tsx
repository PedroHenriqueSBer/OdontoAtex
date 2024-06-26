import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthAdm, Auth } from "./auth"
import { Home, Signin, Users,CreatePatients,Patients} from "../pages"

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