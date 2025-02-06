import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider1 = ({children}) => { 
    const [isWardenLogged, setIsWardenLogged] = useState(false)
    const [wardenDetails, setWardenDetails] = useState({})

    const setWardenLogged = (user, role) => {
       if (role === "warden") {
            setIsWardenLogged(true)
            localStorage.setItem("isWardenLogged", "false")
        }
        setWardenDetails({ ...user, role })
        localStorage.setItem("wardenDetails", JSON.stringify({ ...user, role }))
    }

    const setWardenLogout = () => {
        setIsWardenLogged(false)
        setWardenDetails({})
        localStorage.removeItem("isWardenLogged")
        localStorage.removeItem("wardenDetails")
    }
    
    useEffect(() => {
        const loggedStatus = localStorage.getItem("isWardenLogged") === "true"
        setIsWardenLogged(loggedStatus)
        if (loggedStatus) {
            var user = localStorage.getItem("userDetails")
            setWardenDetails(JSON.parse(user))
        } else {
            setWardenDetails({})
        }
    }, [])
    
    return (
        <AuthContext.Provider value={{ isWardenLogged, setWardenLogged, setWardenLogout, wardenDetails, setWardenDetails}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)