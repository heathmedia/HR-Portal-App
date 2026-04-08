import { useEffect, useState } from "react"
import axios from "axios"

function Profile() {
    const API_URL = "http://localhost:3000/user/"
    const USER_ID = localStorage.getItem('userId')
    const USER_URL = API_URL + USER_ID

    const [user, setUser] = useState({})
    const [password, setPassword] = useState('')
    const [isPasswordSaved, setIsPasswordSaved] = useState(false)

    useEffect(() => {
        const getUser = async () => {
            const response = axios.get(USER_URL)
                .then(result => {
                    if (result.data.length === 0) {
                        // No user found
                        return
                    }
                    setUser(result.data)
                })
        }

        getUser()
    }, [])

    const savePassword = async (event) => {
        event.preventDefault()
        const reponse = await axios.patch(USER_URL, { password })
            .then(result => {
                setIsPasswordSaved(true)
            })
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Profile</h1>
            <div className="grid border-1 px-10 pt-6 pb-4 w-100 rounded-lg flex flex-wrap">
                <p hidden={!isPasswordSaved}
                    className="text-green-600 mb-2  text-center">Password updated</p>
                <div className="mb-3 grid grid-cols-1">
                    <p className="font-bold">Name</p>
                    <p>{user?.name}</p>
                </div>
                <div className="mb-3 grid grid-cols-1">
                    <p className="font-bold">Email</p>
                    <p>{user?.email}</p>
                </div>
                <div className="mb-3 grid grid-cols-1">
                    <p className="font-bold">Department</p>
                    <p>{user?.department}</p>
                </div>
                <div className="mb-3 grid grid-cols-1">
                    <p className="font-bold">Role</p>
                    <p>{user?.role}</p>
                </div>

                <form onSubmit={(event) => savePassword(event)} className="mb-3 grid grid-cols-1">
                    <label htmlFor="password" className="font-bold mb-2">New Password</label>
                    <input id="password" type="password"
                        required onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter password"
                        className="self-justify-end border-1 px-2 py-1 rounded disabled:bg-gray-100" />
                    <input type="submit" value="Save Password"
                        className="cursor-pointer bg-primary hover:bg-blue-700 text-white 
                                font-bold mt-4 py-2 px-4 rounded-full disabled:bg-gray-400" />
                </form>
            </div>
        </>
    )
}

export default Profile