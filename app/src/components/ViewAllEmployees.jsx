import axios from "axios"
import { useEffect, useState } from "react"
import PrimarySubmitButton from "./PrimarySubmitButton"

function ViewAllEmployees() {
    const API_URL = "http://localhost:3000"
    const USER_URL = API_URL + "/user"

    const [employees, setEmployees] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
    const [msg, setMsg] = useState('')

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [department, setDepartment] = useState('')
    const [role, setRole] = useState('employee')

    useEffect(() => {
        const getAllEmployees = async () => {
            try {
                axios.get(USER_URL)
                    .then((result) => {
                        setEmployees(result.data.filter(employee => employee.id !== '1234'))
                        return
                    })
            } catch (error) {
                console.log('Error fetching employees: ', error)
            }
        }

        getAllEmployees()
    }, [])

    const addEmployee = async (event) => {
        event.preventDefault()
        setErrorMsg('')
        setMsg('')
        const newEmployee = {
            name,
            email,
            department,
            role
        }
        const duplicateEmailCheck = employees.filter(user => user.email === newEmployee.email)
        console.log('dupe check', duplicateEmailCheck)
        if (duplicateEmailCheck.length > 0) {
            setErrorMsg('Email is already taken')
            return
        }
        const response = await axios.post(USER_URL, newEmployee)
        setMsg('Employee added')
        setEmployees([...employees, response.data])
        setName('')
        setEmail('')
        setDepartment('')
        setRole('employee')
    }

    const deleteEmployee = async (id) => {
        try {
            const response = await axios.delete(USER_URL + "/" + id)
            setEmployees(employees.filter(item => item.id !== id))
        } catch (error) {
            console.log('Error deleting employee', error)
        }
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Employees</h1>

            <div>
                {/* Being Add Employee Form */}
                <h2 className="text-xl mb-5">Add Employee</h2>
                <form onSubmit={(event) => addEmployee(event)} className="flex flex-wrap mb-2">
                    <div className="flex flex-wrap w-full pb-4 items-center">
                        <div className="mr-5 mb-3">
                            <label htmlFor="name" className="mb-2 mr-2">Name</label>
                            <input id="name" type="text" placeholder="First and last name"
                                required value={name}
                                onChange={(event) => setName(event.target.value)}
                                className="self-justify-end border-1 px-2 py-1 rounded" />
                        </div>
                        <div className="mr-5 mb-3">
                            <label htmlFor="email" className="mb-2 mr-2">Email</label>
                            <input id="email" type="email" placeholder="name@email.com"
                                required value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="self-justify-end border-1 px-2 py-1 rounded" />
                        </div>
                        <div className="mr-5 mb-3">
                            <label htmlFor="department" className="mb-2 mr-2">Department</label>
                            <input id="department" type="text" placeholder="e.g. IT, Engineering, etc."
                                required value={department}
                                onChange={(event) => setDepartment(event.target.value)}
                                className="self-justify-end border-1 px-2 py-1 rounded" />
                        </div>
                        <div className="mr-5 mb-3">
                            <label htmlFor="role" className="mb-2 mr-2">Role</label>
                            <select onChange={(event) => setRole(event.target.value)} value={role}
                                className="border-1 rounded p-1.5">
                                <option value='employee'>Employee</option>
                                <option value='hr'>HR</option>
                            </select>
                        </div>
                        <PrimarySubmitButton value="Add Employee"></PrimarySubmitButton>
                        <p id="errorMsg" hidden={!errorMsg}
                            className="text-red-500 mb-3">{errorMsg}</p>
                        <p id="msg" hidden={!msg}
                            className="text-green-600 mb-3">{msg}</p>
                    </div>
                </form>
                {/* End Add Employee Form */}

                {/* Begin All Employees Table */}
                <h2 className="text-xl mb-5">All Employees</h2>
                <div className="flex flex-wrap">
                    <table className="w-full border-collapse border-blue-50">
                        <thead className="border-b-1">
                            <tr className="p-2 bg-primary text-white">
                                <th className="text-center p-2">Employee ID</th>
                                <th className="text-center p-2">Name</th>
                                <th className="text-left p-2">Email</th>
                                <th className="text-center p-2">Department</th>
                                <th className="text-center p-2">Role</th>
                                <th className="text-center p-2">Registered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.length === 0 ?
                                    <tr className="text-center"><td colSpan="7" className="p-2">No employees to display</td></tr> : ''}
                            {
                                employees.map((user, index) => (
                                    <tr key={user?.id}
                                        className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                                        <td className="text-center border-b border-blue-100 p-2">{user?.id}</td>
                                        <td className="border-b border-blue-100 p-2">{user?.name}</td>
                                        <td className="border-b border-blue-100 p-2">{user?.email}</td>
                                        <td className="text-center border-b border-blue-100 p-2">{user?.department}</td>
                                        <td className="text-center border-b border-blue-100 p-2">{user?.role}</td>
                                        <td className="text-center border-b border-blue-100 p-2">
                                            {user?.password ? <i className="text-green-500 fa-solid fa-check"></i> : '-'}</td>
                                        <td className="text-center border-b border-blue-100 p-2">
                                            <button onClick={() => deleteEmployee(user.id)}
                                                title="Delete"
                                                aria-label="Delete request"
                                                className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {/* End All Employees Table */}
                </div>
            </div>
        </>
    )
}

export default ViewAllEmployees