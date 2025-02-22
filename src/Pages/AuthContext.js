import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext  = createContext()

export const AuthProvider = ({children}) => {
    const [isStudentLogged, setIsStudentLogged] = useState(
        () => JSON.parse(localStorage.getItem("isStudentLogged")) || false
    )
    const [studentDetails, setStudentDetails] = useState(
        () => JSON.parse(localStorage.getItem("studentDetails")) || {}
    )
    const [isWardenLogged, setIsWardenLogged] = useState(
        () => JSON.parse(localStorage.getItem("isWardenLogged")) || false
    )
    const [wardenDetails, setWardenDetails] = useState(
        () => JSON.parse(localStorage.getItem("wardenDetails")) || {}
    )

    useEffect(() => {
        localStorage.setItem("studentDetails", JSON.stringify(studentDetails))
    }, [studentDetails])

    useEffect(() => {
        localStorage.setItem("wardenDetails", JSON.stringify(wardenDetails))
    }, [wardenDetails])

    useEffect(() => {
        localStorage.setItem("isWardenLogged", JSON.stringify(isWardenLogged))
    }, [isWardenLogged])

    useEffect(() => {
        localStorage.setItem("isStudentLogged", JSON.stringify(isStudentLogged))
    }, [isStudentLogged])

    const userLogged = (user, role) => {
        if (role === "student") {
            localStorage.removeItem("wardenDetails")
            localStorage.removeItem("isWardenLogged")
        } else if (role === "warden") {
            localStorage.removeItem("studentDetails")
            localStorage.removeItem("isStudentLogged")
        }
        
        if (role === "student") {
            setIsStudentLogged(true)
            localStorage.setItem("isStudentLogged", "true")
            setStudentDetails({ ...user, role })
            localStorage.setItem("studentDetails", JSON.stringify({ ...user, role }))
        } else if (role === "warden") {
            setIsWardenLogged(true)
            localStorage.setItem("isWardenLogged", "true")
            setWardenDetails({ ...user, role })
            localStorage.setItem("wardenDetails", JSON.stringify({ ...user, role }))
        }
    }

    const userLogout = (role) => {
        if (role === "student") {
            setIsStudentLogged(false)
            setStudentDetails({})
            localStorage.removeItem("isStudentLogged")
            localStorage.removeItem("studentDetails")
        } else if (role === "warden") {
            setIsWardenLogged(false)
            setWardenDetails({})
            localStorage.removeItem("isWardenLogged")
            localStorage.removeItem("wardenDetails")
        }
    }
    
    return (
        <AuthContext.Provider value={{ 
            isStudentLogged, 
            userLogged, 
            userLogout, 
            studentDetails, 
            isWardenLogged, 
            wardenDetails 
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)