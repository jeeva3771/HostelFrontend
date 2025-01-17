import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext"

const PrivateRoute = ({children}) => {
    const { isLogged } = useAuth()

    return isLogged ? children : <Navigate to='/student/login/' />
}

export default PrivateRoute