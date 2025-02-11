import { Navigate } from "react-router-dom"
import { useAuth } from "../AuthContext"

export const StudentPrivateRoute = ({ children }) => {
    const { isStudentLogged } = useAuth()
    return isStudentLogged ? children : <Navigate to="/student/login/" />
}

 