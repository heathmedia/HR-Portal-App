import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import HRDashboard from "./components/HRDashboard"
import EmployeeDashboard from "./components/EmployeeDashboard"
import SignUp from "./components/SignUp"
import NavBar from "./components/NavBar"
import ViewAllEmployees from "./components/ViewAllEmployees"
import ViewAllLeaveRequests from "./components/ViewAllLeaveRequests"
import ViewLeaveRequests from "./components/ViewLeaveRequests"
import Profile from "./components/Profile"
import { useState } from "react"

function App() {

  const [userId, setUserId] = useState(localStorage.getItem('userId')?localStorage.getItem('userId'):'')

  const onLogin = (id) => {
    console.log('onlogin: ', id)
    localStorage.setItem(userId, id)
    setUserId(id)
  }

  const onLogout = () => {
    setUserId('')
  }

  return (
    <div className={`${!userId ? "bg-[url('./assets/bg-water-cooler.jpg')]" : ''} w-full h-full absolute bg-cover bg-center`}>
      <NavBar userId={userId} onLogout={onLogout} ></NavBar>
      <div>
        <Routes>
          <Route path="" element={<Login onLogin={onLogin} />} />
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
    </div>
  )
}

export default App