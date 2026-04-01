import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./Login"
import HRDashboard from "./HrDashboard"
import EmployeeDashboard from "./EmployeeDashboard"
import { useEffect } from "react"
import SignUp from "./SignUp"

function App() {

  const navigate = useNavigate()

  // if (localStorage.getItem("userId") && localStorage.getItem("role")) {
  //   switch (localStorage.getItem) {
  //     case "employee":
  //       break
  //     case "hr":
  //       navigate("/hrdashboard")
  //   }
  // } else {
  //   localStorage.removeItem("userId")
  //   localStorage.removeItem("role")
  //   navigate("/")
  // }

  return (
    <>
      <h1>HR Portal</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<EmployeeDashboard />} />
        <Route path="/hrdashboard" element={<HRDashboard />} />
      </Routes>
    </>
  )
}

export default App

/*
Requirements
- Login
-- email, password, user type (HR, Employee)
- Sign Up
-- Employee: name, email, password, role
- Employee Dashboard
-- CRUD leave request
- HR Dasboard
- Employee Detail
-- Employee view: CRUD name, email, password
-- HR view: CRUD name, email, password, role

Data
- One initial admin user in db.json that cannot be deleted
- CRUD employees: userId, name, email, password, role
- CRUD leave requests: requestId, createdById, startDate, endDate

Nav
- Logged out: Login
- Logged in:
-- Employee: Profile, Leave Requests
-- HR: Employees, Employee Details, All Leave Request

*/