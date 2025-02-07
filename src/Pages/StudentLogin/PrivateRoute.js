import { Navigate } from "react-router-dom"
import { useStudentAuth } from "./AuthContext"

export const StudentPrivateRoute = ({ children }) => {
    const { isStudentLogged } = useStudentAuth()
    return isStudentLogged ? children : <Navigate to="/student/login/" />
}

 