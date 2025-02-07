import { Navigate } from "react-router-dom"
import { useWardenAuth } from "./AuthContext"

export const wardenPrivateRoute = ({ children }) => {
    const { isWardenLogged } = useWardenAuth()
    return isWardenLogged ? children : <Navigate to="/login/" />
}

