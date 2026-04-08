import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/hrportal-logo-white.png"

function NavBar({ userId, onLogout }) {

    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('userId')
        localStorage.removeItem('role')
        onLogout() // Callback to App to clear userId so nav reverts to logged out state
        navigate("/")
    }

    useEffect(() => {
        if (!localStorage.getItem('userId')) {
            logout()
        }
    }, [])


    return (
        <header className="flex items-center border-b-1 h-18 h-center drop-shadow-sm 
            p-2 justify-between bg-primary-dark">
            <img src={logo} alt="HR Portal" className="h-6 ml-2" />
            <nav className="text-white">
                <ul className="flex flex-wrap">
                    {!userId ?
                        <>
                            <li className="mr-4 hover:underline"><Link to='/signup'>Sign Up</Link></li>
                            <li className="mr-4 hover:underline"><Link to='/'>Login</Link></li>
                        </>
                        : <button className="mr-4 cursor-pointer hover:underline" onClick={() => logout()}>Logout</button>}
                </ul>
            </nav>
        </header>
    )
}

export default NavBar