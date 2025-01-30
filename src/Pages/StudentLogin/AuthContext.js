import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isLogged, setIsLogged] = useState(false)
    const [userDetails, setUserDetails] = useState({})

    const setLogged = (user) => {
        setIsLogged(true)
        setUserDetails(user)
        localStorage.setItem("isLogged", "true")
        localStorage.setItem("userDetails", JSON.stringify(user))
    }

    const setLogout = () => {
        setIsLogged(false)
        setUserDetails({})
        localStorage.removeItem("isLogged")
        localStorage.removeItem("userDetails")
    }
    
    useEffect(() => {
        const loggedStatus = localStorage.getItem("isLogged") === "true"
        setIsLogged(loggedStatus)
        if (loggedStatus) {
            var user = localStorage.getItem("userDetails")
            setUserDetails(JSON.parse(user))
        } else {
            setUserDetails({})
        }
    }, [])
    
    return (
        <AuthContext.Provider value={{ isLogged, setLogged, setLogout, userDetails}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)