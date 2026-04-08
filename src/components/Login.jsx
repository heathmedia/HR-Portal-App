import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import bgImage from "../assets/bg-water-cooler.jpg"

function Login() {
    const USER_URL = "http://localhost:3000/user"
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [message, setMessage] = useState('')

    let handleSubmit = async (event) => {
        event.preventDefault()
        setMessage('')

        axios.get(USER_URL)
            .then(result => {
                let users = result.data
                let foundUser = users.find((user) => user.email === email)

                if (foundUser && foundUser?.password === password && foundUser?.role === role) {
                    setMessage('Login success!')
                    localStorage.setItem("userId", foundUser.id)
                    localStorage.setItem("role", foundUser.role)

                    switch (foundUser.role) {
                        case "hr":
                            navigate("/hrdashboard")
                            break
                        case "employee":
                            navigate("/dashboard")
                    }

                } else {
                    setMessage('Email, password or role is incorrect.')
                    return
                }
            })
            .catch(error => console.log(error.message))
    }

    return (
        // <div className="bg-fixed bg-center bg-cover h-full w-full" style={{ backgroundImage: `url(${bgImage})` }}>
        <div>
            <form onSubmit={handleSubmit} className="flex items-center mt-20 ml-10">
                <div className="grid border-1 p-10 pb-5 w-100 rounded-l flex flex-wrap">
                    <h1 className="text-center w-full text-2xl font-bold mb-5">Login</h1>
                    <div className="mb-3 grid grid-cols-1">
                        <label htmlFor="email" className="mb-1">Email</label>
                        <input id="email" type="email" required placeholder="Enter email address"
                            onChange={(event) => setEmail(event.target.value)}
                            className="self-justify-end border-1 px-2 py-1 rounded" />
                    </div>
                    <div className="mb-3 grid grid-cols-1">
                        <label htmlFor="password" className="mb-2">Password</label>
                        <input id="password" type="password" required placeholder="Enter password"
                            onChange={(event) => setPassword(event.target.value)}
                            className="self-justify-end border-1 px-2 py-1 rounded" />
                    </div>
                    <fieldset className="mb-4 text-center">
                        <legend className="mb-2 text-gray-500">User Role</legend>
                        <div className="flex gap-5 justify-center">

                            <label htmlFor="employeeRadio" className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    id="employeeRadio"
                                    value="employee"
                                    onClick={(event) => setRole(event.target.value)}
                                    className="appearance-none w-[18px] h-[18px] border-2 border-blue-600 rounded-full 
                   checked:bg-blue-600 checked:border-blue-800 checked:shadow-[inset_0_0_0_3px_white]
                   hover:border-blue-800 cursor-pointer transition-colors flex-shrink-0"
                                />
                                Employee
                            </label>

                            <label htmlFor="hrRadio" className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    id="hrRadio"
                                    value="hr"
                                    onClick={(event) => setRole(event.target.value)}
                                    className="appearance-none w-[18px] h-[18px] border-2 border-blue-600 rounded-full 
                   checked:bg-blue-600 checked:border-blue-800 checked:shadow-[inset_0_0_0_3px_white]
                   hover:border-blue-800 cursor-pointer transition-colors flex-shrink-0"
                                />
                                HR Admin
                            </label>

                        </div>
                    </fieldset>
                    <input type="submit" value="Login"
                        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" />
                    <p className="text-center mt-2 text-red-500" id="message">{message}</p>
                </div>
            </form>
        </div>
    )
}

export default Login