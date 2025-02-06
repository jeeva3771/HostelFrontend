import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider2 = ({children}) => {
    const [isStudentLogged, setIsStudentLogged] = useState(false)
    const [studentDetails,  setStudentDetails] = useState({})

    const setStudentLogged = (user, role) => {
        if (role === "student") {
            setIsStudentLogged(true)
            localStorage.setItem("isStudentLogged", "true")
        }
        setStudentDetails({ ...user, role })
        localStorage.setItem("studentDetails", JSON.stringify({ ...user, role }))
    }

    const setStudentLogout = () => {
        setIsStudentLogged(false)
        setStudentDetails({})
        localStorage.removeItem("isStudentLogged")
        localStorage.removeItem("studentDetails")
    }
    
    useEffect(() => {
        const loggedStatus = localStorage.getItem("isStudentLogged") === "true"
        setIsStudentLogged(loggedStatus)
        if (loggedStatus) {
            var user = localStorage.getItem("studentDetails")
            setStudentDetails(JSON.parse(user))
        } else {
            setStudentDetails({})
        }
    }, [])
    
    return (
        <AuthContext.Provider value={{ isStudentLogged, setStudentLogged, setStudentLogout, studentDetails}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)