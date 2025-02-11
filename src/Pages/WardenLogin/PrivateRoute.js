import { Navigate } from "react-router-dom"
import { useAuth } from "../AuthContext"

export const WardenPrivateRoute = ({ children }) => {
    const { isWardenLogged } = useAuth()
    return isWardenLogged ? children : <Navigate to="/login/" />
}

