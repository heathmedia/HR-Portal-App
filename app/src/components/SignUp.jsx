import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

function SignUp() {
    const USER_URL = "http://localhost:3000/user"

    const [user, setUser] = useState({})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailMsg, setEmailMsg] = useState('')
    const [showDetails, setShowDetails] = useState(false)
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
                setShowDetails(true)
            })
    }

    const savePassword = async (event) => {
        event.preventDefault()
        const reponse = await axios.patch(USER_URL + `/${user.id}`, { password })
            .then(result => {
                setIsPasswordSaved(true)
            })
    }

    return (
        <div className="bg-[url('./assets/bg-water-cooler.jpg')] w-full h-full fixed bg-cover bg-center">
            {!showDetails ?
                <form onSubmit={(event) => checkEmail(event)} className="flex items-center mt-20 ml-10">
                    <div className="grid border-1 p-10 pb-5 w-100 g flex flex-wrap bg-white">
                        <h1 className="text-center w-full text-2xl font-bold mb-2">Sign Up</h1>
                        <p className="text-center mb-5">Enter your email to verify access</p>
                        <div className="mb-3 grid grid-cols-1">
                            <label htmlFor="email" className="mb-2">Email</label>
                            <input id="email" type="email" required placeholder="Enter work email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="self-justify-end border-1 px-2 py-1 rounded" />
                        </div>

                        <input type="submit" value="Check Email"
                            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" />
                        <p id="message" className="text-red-600 mt-5 text-center">{emailMsg}</p>
                    </div>
                </form>
                :
                <form onSubmit={savePassword} className="flex items-center mt-20 ml-10">

                    <div className="grid border-1 px-10 py-8 w-100 rounded-lg flex flex-wrap bg-white">
                        <div>
                            <button onClick={() => setShowDetails(false)}
                                className="cursor-pointer hover:underline text-primary" >
                                <i className="fa-solid fa-arrow-left"></i> Back
                            </button>
                        </div>

                        <h1 className="text-center w-full text-2xl font-bold mb-5">Sign Up</h1>
                        <p className="text-center mb-5">Verify your details</p>
                        <div className="mb-3 grid grid-cols-1">
                            <p className="font-bold">Email</p>
                            <p>{user?.email}</p>
                        </div>
                        <div className="mb-3 grid grid-cols-1">
                            <p className="font-bold">Name</p>
                            <p>{user?.name}</p>
                        </div>
                        <div className="mb-3 grid grid-cols-1">
                            <p className="font-bold">Department</p>
                            <p>{user?.department}</p>
                        </div>
                        <div className="mb-3 grid grid-cols-1">
                            <p className="font-bold">Role</p>
                            <p>{user?.role}</p>
                        </div>
                        <hr className="mt-3 mb-4" />
                        <div className="mb-3 grid grid-cols-1">
                            <p className="text-center mb-5">Choose your password</p>
                            <label htmlFor="password" className="mb-2">New Password</label>
                            <input id="password" type="password"
                                disabled={isPasswordSaved}
                                required
                                placeholder="Enter password"
                                onChange={(event) => setPassword(event.target.value)}
                                className="self-justify-end border-1 px-2 py-1 rounded disabled:bg-gray-100" />
                        </div>
                        <input type="submit" value="Save Password"
                            disabled={isPasswordSaved}
                            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white 
                                font-bold py-2 px-4 rounded-full disabled:bg-gray-400" />
                        <p className="text-green-600 mt-5 text-center"
                            hidden={!isPasswordSaved}>
                            Password saved! <Link to="/" className="underline">Login to your account <i className="fa-solid fa-arrow-right"></i></Link>
                        </p>
                    </div>
                </form>
            }
        </div>
    )
}

export default SignUp