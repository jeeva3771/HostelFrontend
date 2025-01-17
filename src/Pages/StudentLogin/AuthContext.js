import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isLogged, setIsLogged] = useState(false)

    const login = () => {
        setIsLogged(true)
        localStorage.setItem("isLogged", "true")
    }

    const logout = () => {
        setIsLogged(false)
        localStorage.removeItem("isLogged")
    }
    
    useEffect(() => {
        const loggedStatus = localStorage.getItem("isLogged") === "true"
        setIsLogged(loggedStatus)
    }, [])
    
    return (
        <AuthContext.Provider value={{ isLogged, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)