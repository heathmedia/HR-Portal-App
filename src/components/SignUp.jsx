import { useState } from "react"
import axios from "axios"

function SignUp() {
    const USER_URL = "http://localhost:3000/user"

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [department, setDepartment] = useState('')

    const [message, setMessage] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [departmentMessage, setDepartmentMessage] = useState('')
    const [roleMessage, setRoleMessage] = useState('')

    let validateEmail = async () => {
        if (!email) {
            setEmailMessage('Email is required')
            return false
        }

        return axios.get(USER_URL + "?email=" + email)
            .then((result) => {
                console.log(result)
                if (result.data.length > 0) {
                    setEmailMessage('Email already taken')
                    return false
                } else {
                    setEmailMessage('')
                    return true
                }
            })
    }

let validatePassword = () => {
    if (!password) {
        setPasswordMessage('Password is required')
        return false
    }

    setPasswordMessage('')
    return true
}

let validateDepartment = () => {
    if (!department) {
        setDepartmentMessage('Department is required')
        return false
    }

    setDepartmentMessage('')
    return true
}

let validateRole = () => {
    if (!role) {
        setRoleMessage('Select a role')
        return false
    }

    setRoleMessage('')
    return true
}

let saveUser = async (event) => {
    event.preventDefault()
    let emailIsValid = await validateEmail()
    let passwordIsValid = validatePassword()
    let departmentIsValid = validateDepartment()
    let roleIsValid = validateRole()

    let formIsValid = emailIsValid && passwordIsValid && departmentIsValid && roleIsValid
    console.log('FormIsValid', emailIsValid, passwordIsValid, departmentIsValid, roleIsValid)

    if (formIsValid) { alert('SAVE USER!') 
        axios.post(USER_URL, {email: email, password: password, department: department, role: role})
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

return (
    <>
        <h2>Sign Up</h2>
        <p>Register a new account</p>
        <form onSubmit={saveUser}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Enter email address"
                onChange={(event) => setEmail(event.target.value)} />
            <span>{emailMessage}</span><br />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)} />
            <span>{passwordMessage}</span><br />
            <label htmlFor="department">Departmant</label>
            <input id="department" type="text" placeholder="Enter department"
                onChange={(event) => setDepartment(event.target.value)} />
            <span>{departmentMessage}</span><br />
            <fieldset>
                <legend>User Role</legend>
                <input type="radio" name="role" id="employeeRadio" value="employee"
                    onClick={(event) => setRole(event.target.value)} />
                <label htmlFor="employeeRadio">Employee</label>
                <input type="radio" name="role" id="hrRadio" value="hr"
                    onClick={(event) => setRole(event.target.value)} />
                <label htmlFor="hrRadio">HR Admin</label><br />
                <span>{roleMessage}</span>
            </fieldset><br />

            <input type="submit" value="Save" />
            <p id="message">{message}</p>
        </form>
    </>
)
}

export default SignUp