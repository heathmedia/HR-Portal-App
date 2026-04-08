import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./components/Login"
import HRDashboard from "./components/HRDashboard"
import EmployeeDashboard from "./components/EmployeeDashboard"
import SignUp from "./components/SignUp"
import NavBar from "./components/NavBar"
import ViewAllEmployees from "./components/ViewAllEmployees"
import ViewAllLeaveRequests from "./components/ViewAllLeaveRequests"
import ViewLeaveRequests from "./components/ViewLeaveRequests"
import Profile from "./components/Profile"

function App() {

  const userId = localStorage.getItem('userId')
  const role = localStorage.getItem('role')

  return (
    <>
      <NavBar userId={userId} role={role}></NavBar>
      <div>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="signup" element={<SignUp />} />

          <Route path="dashboard" element={<EmployeeDashboard />}>
            <Route path="viewLeaveRequests" element={<ViewLeaveRequests />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="hrdashboard" element={<HRDashboard />}>
            <Route path="viewAllLeaveRequests" element={<ViewAllLeaveRequests />}></Route>
            <Route path="viewEmployees" element={<ViewAllEmployees />}></Route>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App