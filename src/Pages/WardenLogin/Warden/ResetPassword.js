import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { generateOtp, resetPassword } from "../Api"

function ResetPassword() {
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [otpError, setOtpError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [showOtpFields, setShowOtpFields] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const canSendOtp = email.length > 0
    const canSubmit =
        otp.length === 6 &&
        password.length >=  6 &&
        confirmPassword.length >= 6 &&
        password === confirmPassword

    const handleGenerateOtp = async () => {
        setLoading(true)
        setEmailError("")
        const payload = {
            emailId: email
        }
        try {
            const { response, error } = await generateOtp(payload)
            if (error) {
                alert(error)
                return
            }

            if (response.status === 200) {
                setShowOtpFields(true)
            } else {
                setEmailError(await response.text())
            }
        } catch (error) {
            alert("Something went wrong. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    // Reset Password API call
    const handleResetPassword = async () => {
        setLoading(true);
        setOtpError("");
        setPasswordError("");
        const payload = {
            otp: otp,
            password: password
        }

        try {
            const { response, error } = await resetPassword(payload)
            if (error) {
                alert(error)
                return
            }

            if (response.status === 200) {
                navigate('/login/')
            } else if (response.status === 400) {
                const errorData = await response.json()
                if (errorData.errorType === "OTP") {
                    setOtpError(errorData.message)
                } else {
                    setPasswordError(errorData.message || "Password must be at least 6 characters.")
                }
            } else {
                alert(await response.text())
                navigate('/login/')
            }
        } catch (error) {
            alert("Something went wrong. Please try again later.")
        } finally {
            setLoading(false)
        }
    }
    
    return (
    <main>
    <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center
            justify-content-center py-4">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                        <div className="d-flex justify-content-center py-4">
                            <a 
                                href="" 
                                className="logo d-flex align-items-center w-auto"
                            >
                                <img src="/assets/img/logo.png" alt="" />
                                <span className="d-none d-lg-block">Forgotten Password?</span>
                            </a>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body pt-4 pb-2">
                                <div className="row needs-validation" novalidate>
                                    {!showOtpFields && (
                                        <>
                                        <div className="col-12">
                                            <label htmlFor="emailId" className="form-label">Email</label>
                                                <div className="input-group has-validation">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Enter email"
                                                    value={email}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value)
                                                        setEmailError("")
                                                    }}
                                                />
                                                </div>
                                            </div>
                                            {emailError && <span className="text-danger small">{emailError}</span>}
                                            <div>
                                                <div className="col d-flex justify-content-center mt-3 mb-2">
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={handleGenerateOtp}
                                                        disabled={!canSendOtp || loading}
                                                    >
                                                        {loading ? "Sending OTP..." : "Generate OTP"}
                                                    </button>
                                                </div>
                                            </div>
                                            </>
                                    )}
                                    {showOtpFields && (
                                        <>
                                            <p><strong>Please enter the 6-digit code sent to your email.</strong></p>
                                            <div className="col-12">
                                                <label htmlFor="otp" className="form-label">OTP</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="OTP"
                                                    value={otp}
                                                    onChange={(e) => {
                                                        setOtp(e.target.value)
                                                        setOtpError("")
                                                    }}
                                                />
                                                
                                                <div className="position-relative">
                                                {otpError && <span className="text-danger small">{otpError}</span>}
                                                <button
                                                    type="button"
                                                    onClick={handleGenerateOtp}
                                                    className="position-absolute end-0 link-primary small border-0 bg-transparent text-decoration-none"
                                                >
                                                    Resend OTP
                                                </button>

                                                </div>
                                            </div>

                                            <div className="col-12 mt-3">
                                                <label htmlFor="password" className="form-label">New Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="New password"
                                                    value={password}
                                                    onChange={(e) => {
                                                        setPassword(e.target.value)
                                                        setPasswordError("")
                                                    }}
                                                />
                                            </div>

                                            <div className="col-12 mt-3">
                                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Confirm password"
                                                    value={confirmPassword}
                                                    onChange={(e) => {
                                                        setConfirmPassword(e.target.value)
                                                        setPasswordError("")
                                                    }}
                                                />
                                                {passwordError && <span className="text-danger">{passwordError}</span>}
                                            </div>

                                            <div className="col d-flex justify-content-center mt-4 mb-3">
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={handleResetPassword}
                                                    disabled={!canSubmit || loading}
                                                >
                                                    {loading && canSubmit ? "Processing..." : "Verify OTP & Save Password"}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="credits">
                            Designed by <a href="https://www.linkedin.com/in/jeeva377">Jeeva | LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    </main>
    )
}


export default ResetPassword