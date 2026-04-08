import { Link } from "react-router-dom"
function SignUpSuccess() {
    return (
        <div className="flex items-center mt-10 ml-10">
            <div className="grid border-1 p-10 pb-5 w-100 g flex flex-wrap bg-white rounded-lg">
                <h1 className="text-center w-full text-2xl font-bold mb-2">Success!</h1>
                <p className="text-center mb-1">Your account is registered</p>
                <p className="text-green-600 mt-2 mb-3 text-center">
                    <Link to="/" className="underline">Login to your account <i className="fa-solid fa-arrow-right"></i></Link>
                </p>
            </div>
        </div>
    )
}

export default SignUpSuccess