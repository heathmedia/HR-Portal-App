import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

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
        <>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" required placeholder="Enter email address"
                    onChange={(event) => setEmail(event.target.value)} />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" required placeholder="Enter password"
                    onChange={(event) => setPassword(event.target.value)} />
                <fieldset>
                    <legend>User Role</legend>
                    <input type="radio" name="role" id="employeeRadio" value="employee"
                        onClick={(event)=>setRole(event.target.value)}/>
                    <label htmlFor="employeeRadio">Employee</label>
                    <input type="radio" name="role" id="hrRadio" value="hr"
                        onClick={(event)=>setRole(event.target.value)}/>
                    <label htmlFor="hrRadio">HR Admin</label>
                </fieldset>
                <input type="submit" value="Login" />
                <p id="message">{message}</p>
            </form>
        </>
    )
}

export default Login