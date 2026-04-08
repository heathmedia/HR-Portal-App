import axios from "axios"
import { useEffect, useState } from "react"

function ViewAllLeaveRequests() {
    const API_URL = "http://localhost:3000"
    const REQUEST_URL = API_URL + "/leaveRequest"
    const USER_URL = API_URL + "/user"

    const [leaveRequests, setLeaveRequests] = useState([])
    const [employeeNames, setEmployeeNames] = useState([])
    const [msg, setMsg] = useState('')

    const statusStyles = {
        approved: "text-green-700 bg-green-100 border-green-500",
        pending: "text-yellow-700 bg-yellow-100 border-yellow-500",
        denied: "text-red-700 bg-red-100 border-red-500",
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-')
        return `${month}/${day}/${year}`
    }

    const updateStatus = async (id, newStatus) => {
        const response = await axios.patch(REQUEST_URL+'/'+id, {
            status: newStatus
        })
        setLeaveRequests(leaveRequests.map(request => {
            if(id === request.id) request.status = newStatus
            return request
        }))
        console.log("updated status: ", response)
    }

    const deleteRequest = async (id) => {
        console.log('delete request: ', id)
        try {
            const response = await axios.delete(REQUEST_URL + "/" + id)
            setLeaveRequests(leaveRequests.filter(item => item.id !== id))
            console.log('deleted request: ', response)
        } catch (error) {
            console.log('Error deleting request', error)
        }
    }

    useEffect(() => {
        let getAllLeaveRequests = async () => {
            console.log('Getting all requests...')
            try {
                axios.get(REQUEST_URL)
                    .then((result) => {
                        if (result.data.length > 0) {
                            console.log('leave requests: ', result)
                            let requests = result.data
                            setLeaveRequests(result.data)

                            // Fetch the employee names associated with each request to display in table
                            const queryParams = requests.map(request => `id=${request.userId}`).join('&')
                            try {
                                axios.get(USER_URL + '?' + queryParams)
                                    .then((result) => {
                                        console.log('employees: ', result)
                                        setEmployeeNames(result.data)
                                        return true
                                    })
                                return true
                            } catch (error) {
                                console.log('Error fetching employee names: ', error)
                                return false
                            }
                        } else {
                            setMsg('No open requests.')
                        }
                    })
            } catch (error) {
                console.log('Error fetching leave requests: ', error)
            }
        }

        getAllLeaveRequests()
    }, [])
    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Leave Requests</h1>
            <div>
                <h2 className="text-xl mb-5">All Requests</h2>
                <div className="flex flex-wrap">
                    <table className="w-full bg-blue-500 border-collapse border-blue-50">
                        <thead className="border-b-1">
                            <tr className="p-2 text-white">
                                <th className="text-center p-2">ID</th>
                                <th className="text-center p-2">Name</th>
                                <th className="text-center p-2">Created On</th>
                                <th className="text-center p-2">Start Date</th>
                                <th className="text-center p-2">End Date</th>
                                <th className="text-center p-2">Status</th>
                                <th className="text-center p-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leaveRequests.length === 0 ?
                                    <tr className="text-center"><td colSpan="4" className="p-2">No leave requests to display</td></tr> : ''}
                            {
                                leaveRequests.map((request, index) => (
                                    <tr key={request?.id}
                                        className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                                        <td className="text-center border-b border-blue-100 p-2">{request?.userId}</td>
                                        <td className=" border-b border-blue-100 p-2">{employeeNames.find(user => user.id === request.userId)?.name}</td>
                                        <td className="text-center border-b border-blue-100 p-2">{formatDate(request?.createdDate)}</td>
                                        <td className="text-center border-b border-blue-100 p-2">{formatDate(request?.startDate)}</td>
                                        <td className="text-center border-b border-blue-100 p-2">{formatDate(request?.endDate)}</td>
                                        <td className="text-center border-b border-blue-100 p-2">
                                            <select name="status" id="status" onChange={(event) => updateStatus(request.id, event.target.value)}
                                                className={`${statusStyles[request.status]} border-1 capitalize rounded px-1 py-1`} value={request.status}>
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                                <option value="denied">Denied</option>
                                            </select>
                                            {/* <span className="capitalize rounded bg-yellow-500 text-yellow-100 px-2 py-1">{request?.status}</span> */}
                                        </td>
                                        <td className="text-center border-b border-blue-100 p-2">
                                            <button onClick={() => deleteRequest(request.id)}
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
                </div>
            </div>
        </>
    )
}

export default ViewAllLeaveRequests