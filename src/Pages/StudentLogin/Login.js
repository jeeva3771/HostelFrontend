import { useState } from 'react'
import './Login.css'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'

function StudentLogin() {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleOtpChange = (e) => {
        setOtp(e.target.value)
    }

    const handleGenerateOtp = async () => { 
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        var raw = JSON.stringify({
            "emailId": email 
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        }

        fetch('http://localhost:1006/api/student/generateotp', requestOptions)
            .then(async (response) => {
                if (response.status === 200) {
                    alert('OTP has been sent to your email')
                } else {
                    alert(await response.text())
                }
            })

            .catch(() => {
                alert('Something went wrong.Please try later.')
            });
    }
        

    const handleVerifyOtpAndLogin = async () => {
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        var raw = JSON.stringify({
            "otp": otp
        })

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            credentials: 'include'
        }

        fetch('http://localhost:1006/api/student/verifyotp/authentication', requestOptions)
            .then(async (response) => {
                if (response.status === 200) {
                    login()
                    navigate('/home')
                    // window.location = 'https://localhost:1006/student/attendance/report'
                } else if (response.status === 400) {
                    const errorData = await response.json()
                    if (errorData.errorType === 'OTP') {
                       alert(errorData.message)
                    } 
                } else if ([401, 404].includes(response.status)) {
                    const errorMessage = await response.text()
                    alert(errorMessage)
                    // window.location = 'https://localhost:1006/student/emailverify/generateotp'
                }
            }) 
            .catch(() => alert('Something went wrong.Please try later.'))
    }


    return (
        
        <div className="container">
            <h2>Student Login</h2>
            <div>
                <label className="labelSection">Email</label>
                <input type="email" value={email}  onChange={handleEmailChange} required/>
            </div>
            <button onClick={handleGenerateOtp}>Generate OTP</button>
            <div>
                <label className="labelSection">OTP</label>
                <input type="text" value={otp} onChange={handleOtpChange} required/>
            </div>
            <button onClick={handleVerifyOtpAndLogin}>VerifyOtp&Login</button>

        </div>
    )
}

export default StudentLogin