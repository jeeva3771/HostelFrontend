import { Navigate } from "react-router-dom"
import { useAuth } from "../AuthContext"
import { useState } from "react";

export const WardenPrivateRoute = ({ children }) => {
    const { isWardenLogged } = useAuth()
    return isWardenLogged ? children : <Navigate to="/login/" />
}

export const SuperAdminPrivateRoute = ({ children }) => {
    const { wardenDetails } = useAuth()
    return wardenDetails.superAdmin === 1 ? children : <Navigate to="/error/" />
}
