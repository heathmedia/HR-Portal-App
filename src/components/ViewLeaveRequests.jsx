import { useEffect, useState } from "react"
import axios from "axios"

function ViewLeaveRequests() {
    const API_URL = "http://localhost:3000"
    const REQUEST_URL = API_URL + `/leaveRequest`
    const USER_ID = localStorage.getItem('userId')
    const TODAY = new Date().toLocaleDateString('en-CA');
    console.log("TODAY: ", TODAY)

    const statusStyles = {
        approved: "text-green-700 bg-green-100 border-green-500",
        pending: "text-yellow-700 bg-yellow-100 border-yellow-500",
        denied: "text-red-700 bg-red-100 border-red-500",
    };

    const StatusBadge = ({ status }) => {
        return (
            <span className={`capitalize rounded px-2 py-1 border-1 ${statusStyles[status]}`}>
                {status}
            </span>
        );
    };

    const [leaveRequests, setLeaveRequests] = useState([])
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [msg, setMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        const getLeaveRequests = async () => {
            console.log('Getting leave requests...')
            try {
                const result = await axios.get(REQUEST_URL, { params: { userId: USER_ID } })
                setLeaveRequests(result.data)
            } catch (error) {
                console.log('Error fetching employee leave requests: ', error)
            }
        }

        getLeaveRequests()
    }, [])

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-')
        return `${month}/${day}/${year}`
    }

    const submitRequest = async (event) => {
        event.preventDefault()
        console.log('submit request')
        setErrorMsg('')
        setMsg('')
        console.log('start date', startDate)
        console.log('end date', endDate)

        if (!startDate) { setErrorMsg('Select a start date'); return }
        if (!endDate) { setErrorMsg('Select an end date'); return }
        if (startDate > endDate) { setErrorMsg('Start date cannot be after end date'); return }

        const newRequest = {
            userId: USER_ID,
            startDate,
            endDate,
            createdDate: TODAY,
            status: "pending"
        }

        const reponse = await axios.post(REQUEST_URL, newRequest)
        console.log('Saved request: ', newRequest)
        setLeaveRequests([...leaveRequests, reponse.data])
        setMsg('Leave request saved!')
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

    return (
        <div>
            <h1 className="text-2xl font-bold mb-5">Leave Requests</h1>
            <div className="flex flex-wrap">
                <form onSubmit={submitRequest} className="flex flex-wrap mb-6 py-3">
                    <div className="flex flex-wrap pb-4 items-center">
                        <h2 className="text-left text-xl mb-2 w-full">Create New Request</h2>
                        <div className="mr-4">
                            <label htmlFor="startDate" className="mb-2 mr-2">Start Date</label>
                            <input id="startDate" type="date" min={TODAY}
                                onChange={(event) => setStartDate(event.target.value)}
                                className="self-justify-end border-1 px-2 py-1 rounded" />
                        </div>
                        <div className="mr-4">
                            <label htmlFor="endDate" className="mb-2 mr-2">End Date</label>
                            <input id="endDate" type="date" min={startDate ? startDate : TODAY}
                                onChange={(event) => setEndDate(event.target.value)}
                                className="self-justify-end border-1 px-2 py-1 rounded" />
                        </div>
                        <input type="submit" value="Submit Request"
                            className="cursor-pointer bg-blue-600 hover:bg-blue-700 
                                text-white font-bold rounded-full px-2 mr-4" />
                        <span id="errorMsg" hidden={!errorMsg}
                            className="text-red-500">{errorMsg}</span>
                        <span id="msg" hidden={!msg}
                            className="text-green-600">{msg}</span>
                    </div>
                </form>

                <table className="w-full border-collapse border-blue-50">
                    <caption className="text-left text-xl mb-2">Your Requests</caption>
                    <thead className="border-b-1">
                        <tr className="p-2 bg-blue-700 text-white">
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
                                    <td className="text-center border-b border-blue-100 p-2">{formatDate(request?.createdDate)}</td>
                                    <td className="text-center border-b border-blue-100 p-2">{formatDate(request?.startDate)}</td>
                                    <td className="text-center border-b border-blue-100 p-2">{formatDate(request?.endDate)}</td>
                                    <td className="text-center border-b border-blue-100 p-2">
                                        <StatusBadge status={request.status}></StatusBadge>
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
    )
}

export default ViewLeaveRequests