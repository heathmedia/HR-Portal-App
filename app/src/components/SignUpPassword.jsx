import { Link } from "react-router-dom"
function SignUpPassword({ isPasswordSaved, setPassword, savePassword, setShowDetails, user }) {
    return (
        <form onSubmit={savePassword} className="flex items-center mt-10 ml-10">
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
            </div>
        </form>
    )
}

export default SignUpPassword