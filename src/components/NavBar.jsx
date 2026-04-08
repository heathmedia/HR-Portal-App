import { Link } from "react-router-dom"
import logo from "../assets/hrportal-logo.png"

function NavBar({ userId, role }) {
    return (
        <header className="flex items-center border-b-1 h-18 h-center drop-shadow-sm p-2 justify-between bg-blue-200">
            <img src={logo} alt="HR Portal" className="h-10 ml-2" />
            <nav className="">
                <ul className="flex flex-wrap">
                    {!userId ? <li className="mr-2"><Link to='/signup'>Sign Up</Link></li> : ''}
                    {!userId ? <li className="mr-2"><Link to='/'>Login</Link></li> : ''}

                    {userId && role === 'hr' ? <li className="mr-2"><Link to='/signup'>Leave Requests</Link></li> : ''}
                    {userId && role === 'hr' ? <li className="mr-2"><Link to='/signup'>Employees</Link></li> : ''}
                    {userId ? <li className="mr-2"><a href='/logout'>Logout</a></li> : ''}
                </ul>
            </nav>
        </header>
    )
}

export default NavBar