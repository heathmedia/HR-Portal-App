import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import SignUpEmail from "./SignUpEmail"
import SignUpPassword from "./SignUpPassword"
import SignUpSuccess from "./SignUpSuccess"

function SignUp() {
    const USER_URL = "http://localhost:3000/user"

    const [user, setUser] = useState({})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailMsg, setEmailMsg] = useState('')
    const [showDetails, setShowDetails] = useState(false)
    const [currentPage, setCurrentPage] = useState('email')
    const [isPasswordSaved, setIsPasswordSaved] = useState(false)

    let validateEmail = async () => {
        if (!email) {
            setEmailMsg('Email is required')
            return false
        }

        return axios.get(USER_URL + "?email=" + email)
            .then((result) => {
                if (result.data.length > 0) {
                    setEmailMsg('Email already taken')
                    return
                } else {
                    setEmailMsg('')
                    return
                }
            })
    }

    const checkEmail = async (event) => {
        event.preventDefault()
        setEmailMsg('')
        const reponse = axios.get(USER_URL + "?email=" + email)
            .then(result => {
                // Accounts must have been previously created by an admin
                if (result.data.length === 0) {
                    setEmailMsg('Email is not associated with an account')
                    return
                }
                const user = result.data[0]
                // Only accounts without passwords are eligible for sign up
                if (user.password) {
                    setEmailMsg('Email is already registered')
                    return
                }
                setUser(user)
                setIsPasswordSaved(false)
                //setShowDetails(true)
                setCurrentPage('password')
            })
    }

    const savePassword = async (event) => {
        event.preventDefault()
        const reponse = await axios.patch(USER_URL + `/${user.id}`, { password })
            .then(result => {
                setIsPasswordSaved(true)
                setCurrentPage('success')
            })
    }

    return (
        <div>
            {/* {!showDetails?
                <SignUpEmail email={email} setEmail={setEmail}
                    checkEmail={checkEmail} emailMsg={emailMsg}></SignUpEmail>
                :<SignUpPassword password={password} setPassword={setPassword}
                    savePassword={savePassword} user={user}
                    setShowDetails={setShowDetails}></SignUpPassword>
            } */}
            {/* {PAGES[currentPage]} */}
            {(() => {
                switch (currentPage) {
                    case 'email': return <SignUpEmail email={email} setEmail={setEmail}
                            checkEmail={checkEmail} emailMsg={emailMsg}></SignUpEmail>;
                    case 'password': return <SignUpPassword password={password} setPassword={setPassword}
                            savePassword={savePassword} user={user}
                            setShowDetails={setShowDetails}></SignUpPassword>;
                    case 'success': return <SignUpSuccess></SignUpSuccess>
                }
            })()}
        </div>
    )
}

export default SignUp