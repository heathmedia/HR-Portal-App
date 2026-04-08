import { Link, Outlet } from "react-router-dom"

function EmployeeDashboard() {
    return (
        <>
            <div>
                <nav className="w-full text-lg p-4 border-b-1">
                    <ul className="w-full flex flex-wrap">
                        <li className="mr-4"><Link to="viewLeaveRequests">Leave Requests</Link></li>
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

export default EmployeeDashboard