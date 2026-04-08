import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

localStorage.removeItem('userId')
localStorage.removeItem('role')

function Logout() {
    const navigateTo = useNavigate()

    console.log("userId", localStorage.getItem('userId'))
    
    useEffect(() => {
        return () => {
            navigateTo('/login')
        }
    }, [])
    return (
        <>Logging out...</> 
    )
}

export default Logout