function SignUpEmail({ checkEmail, email, setEmail, emailMsg, user }) {
    return (
        <form onSubmit={(event) => checkEmail(event)} className="flex items-center mt-10 ml-10">
            <div className="grid border-1 p-10 pb-5 w-100 g flex flex-wrap bg-white rounded-lg">
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
    )
}

export default SignUpEmail