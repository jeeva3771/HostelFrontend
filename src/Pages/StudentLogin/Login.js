import { useState } from 'react'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'

function StudentLogin() {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [isOtpGenerated, setIsOtpGenerated] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleOtpChange = (e) => {
        setOtp(e.target.value)
    }

    const handleGenerateOtp = async (e) => {
        e.preventDefault() 
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        var raw = JSON.stringify({
            "emailId": email 
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            credentials: 'include', // Ensure cookies are sent
            body: raw
        }

        fetch('http://localhost:1006/api/student/generateotp', requestOptions)
            .then(async (response) => {
                if (response.status === 200) {
                    alert('OTP has been sent to your email')
                    setIsOtpGenerated(true)
                } else {
                    alert(await response.text())
                }
            })

            .catch(() => {
                alert('Something went wrong.Please try later.')
            });
    }
        
    const handleVerifyOtpAndLogin = async (e) => {
        e.preventDefault()
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
                    alert('welcome')
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
        <div class="auth-wrapper">
            <div class="auth-content">
                <form className="container">
                    <h2 className="f-w-400">Student Sign In</h2>

                    {!isOtpGenerated && (
                        <div>
                            <div className="form-group mb-3">
                                <label for="formBasicEmail" class="form-label">Email</label>
                                <input
                                    className="form-control"
                                    label="Email"
                                    name="email"
                                    id="formBasicEmail"
                                    value={email}
                                    onChange={handleEmailChange}
                                    type="email"
                                />
                            </div>
                            <button onClick={handleGenerateOtp}>Generate OTP</button>
                        </div>
                    )}

                    {isOtpGenerated && (
                        <div>
                            <div className="form-group mb-4">
                                <label for="otp" class="form-label">OTP</label>
                                <input
                                    className="form-control"
                                    label="otp"
                                    name="otp"
                                    id="otp"
                                    value={otp}
                                    onChange={handleOtpChange}
                                    type="text"
                                />
                            </div>
                            <button onClick={handleVerifyOtpAndLogin}>Verify OTP & Login Report</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default StudentLogin