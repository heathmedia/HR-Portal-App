import { Link, Outlet } from "react-router-dom"
function HRDashboard() {

    return (
        <>
            <div>
                <nav className="w-full text-lg p-4 border-b-1">
                    <ul className="w-full flex flex-wrap">
                        <li className="mr-4"><Link to="viewEmployees">Employees</Link></li>
                        <li className="mr-4"><Link to="viewAllLeaveRequests">Leave Requests</Link></li>
                        <li className="mr-4"><Link to="profile">Profile</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="m-8">
                <Outlet />
            </div>
        </>
    )
}

export default HRDashboard