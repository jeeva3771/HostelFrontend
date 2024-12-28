import { useAuth  } from "./AuthContext"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/student/login')
    }

    return (
        <button onClick={handleLogout} style={{cursor:"pointer",margin:"10px"}}>
            Logout
        </button>
    )
}

export default Logout
