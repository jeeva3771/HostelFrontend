import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isWardenLogged, setIsWardenLogged] = useState(false)
    const [isStudentLogged, setIsStudentLogged] = useState(false)
    const [userDetails, setUserDetails] = useState({})

    const setLogged = (user, role) => {
        if (role === "student") {
            setIsStudentLogged(true)
            // setIsWardenLogged(false)
            localStorage.setItem("isStudentLogged", "true")
            // localStorage.setItem("isWardenLogged", "false")
        } else if (role === "warden") {
            // setIsWardenLogged(true)
            setIsStudentLogged(false)
            localStorage.setItem("isWardenLogged", "true")
            // localStorage.setItem("isStudentLogged", "false")
        }
        setUserDetails({ ...user, role })
        localStorage.setItem("userDetails", JSON.stringify({ ...user, role }))
    }

    const setLogout = () => {
        setIsStudentLogged(false)
        setUserDetails({})
        localStorage.removeItem("isStudentLogged")
        localStorage.removeItem("userDetails")
    }
    
    useEffect(() => {
        const loggedStatus = localStorage.getItem("isStudentLogged") === "true"
        setIsStudentLogged(loggedStatus)
        if (loggedStatus) {
            var user = localStorage.getItem("userDetails")
            setUserDetails(JSON.parse(user))
        } else {
            setUserDetails({})
        }
    }, [])
    
    return (
        <AuthContext.Provider value={{ isWardenLogged, isStudentLogged, setLogged, setLogout, userDetails}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)