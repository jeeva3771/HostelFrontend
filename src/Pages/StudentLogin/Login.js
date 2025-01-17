import { useState } from 'react'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'

function StudentLogin() {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [isOtpGenerated, setIsOtpGenerated] = useState(false)
    const [isEmailButtonEnabled, setIsEmailButtonEnabled] = useState(false)
    const [isOtpButtonEnabled, setIsOtpButtonEnabled] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleEmailChange = (e) => {
        const value = e.target.value
        setEmail(value)
        setIsEmailButtonEnabled(value.length > 0)
    }

    const handleOtpChange = (e) => {
        const value = e.target.value
        setOtp(value)
        setIsOtpButtonEnabled(value.length > 0)
    }

    const handleGenerateOtp = async (e) => {
        e.preventDefault()
        setIsEmailButtonEnabled(false)
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
                    setIsOtpGenerated(true)
                } else {
                    alert(await response.text())
                    setIsEmailButtonEnabled(true)
                }
            })

            .catch((error) => {
                alert('Something went wrong.Please try later.')
            });
    }
        
    const handleVerifyOtpAndLogin = async (e) => {
        e.preventDefault()
        setIsOtpButtonEnabled(false)
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
                    navigate('/student/report/')
                } else if (response.status === 400) {
                    const errorData = await response.json()
                    if (errorData.errorType === 'OTP') {
                       alert(errorData.message)
                    } 
                    setIsOtpButtonEnabled(true)
                } else if ([401, 404].includes(response.status)) {
                    const errorMessage = await response.text()
                    alert(errorMessage)
                    navigate('/student/login/')
                }
            }) 
            .catch(() => alert('Something went wrong.Please try later.'))
    }

    return (
    <main>
        <div className="container">
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                        <div className="d-flex justify-content-center py-4">
                            <div className="logo d-flex align-items-center w-auto"> 
                                <img src="/assets/img/logo.png" alt="" />
                                <span className="d-none d-lg-block">Hostel</span>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="pt-2">
                                    <h5 className="card-title text-center pb-0 fs-4">Student Sign In</h5>
                                    <p className="text-center small"></p>
                                </div>
                                <div className="row g-3 needs-validation" novalidate>
                                {!isOtpGenerated && (
                                    <>
                                        <div className="col-12">
                                            <label for="email" className="form-label">Email</label>
                                            <div className="input-group has-validation">
                                                <input type="email" name="email" className="form-control" 
                                                    id="email" placeholder="Enter email" value={email}
                                                    onChange={handleEmailChange} required />
                                                <div className="invalid-feedback" id="emailError"></div>
                                            </div>
                                        </div>
                                        <div className="col-12 text-center">
                                            <button className="btn btn-primary" type="submit" id="sendOtp"
                                                onClick={handleGenerateOtp} disabled={!isEmailButtonEnabled}>
                                                Generate OTP</button>
                                        </div>
                                    </>
                                )}
                                {isOtpGenerated && (
                                    <>
                                        <div className="col-12">
                                            <label for="otp" className="form-label">OTP</label>
                                            <input type="text" name="otp" className="form-control" id="otp"
                                                placeholder="Enter OTP" value={otp} onChange={handleOtpChange} required />
                                            <div className="invalid-feedback" id="otpError"></div>
                                        </div>
                                        <div className="col-12 text-center">
                                            <button type="button" className="btn btn-primary" id="submit"
                                                onClick={handleVerifyOtpAndLogin} disabled={!isOtpButtonEnabled}>
                                                Verify OTP & Login Report</button>
                                        </div>
                                    </>
                                )}
                                </div>
                            </div>
                        </div>
                        <div className="credits">
                            Designed by <a to="https://www.linkedin.com/in/jeeva377">Jeeva|Linkedin</a>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </div>
    </main>
    )
}

export default StudentLogin