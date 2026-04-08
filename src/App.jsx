import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./components/Login"
import HRDashboard from "./components/HRDashboard"
import EmployeeDashboard from "./components/EmployeeDashboard"
import { useEffect } from "react"
import SignUp from "./components/SignUp"
import NavBar from "./components/NavBar"
import Logout from "./components/Logout"
import ViewAllEmployees from "./components/ViewAllEmployees"
import ViewAllLeaveRequests from "./components/ViewAllLeaveRequests"

function App() {

  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const role = localStorage.getItem('role')

  return (
    <>
      <NavBar userId={userId} role={role}></NavBar>
      <div>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="signup" element={<SignUp />} />

          <Route path="dashboard" element={<EmployeeDashboard />} />

          <Route path="hrdashboard" element={<HRDashboard />}>
            <Route path="viewAllLeaveRequests" element={<ViewAllLeaveRequests />}></Route>
            <Route path="viewEmployees" element={<ViewAllEmployees />}></Route>
          </Route>

          <Route path="logout" element={<Logout />} />
        </Routes>
      </div>
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