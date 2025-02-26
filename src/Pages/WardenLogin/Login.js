import { Link, useNavigate } from "react-router-dom"
import { authentication } from "./Api"
import { useAuth } from "../AuthContext"

const { useState, useEffect } = require("react")

function WardenLogin() {
    const [email, setEmail] = useState('jeeva37710@gmail.com')
    const [password, setPassword] = useState('123123')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { userLogged } = useAuth()
    const navigate = useNavigate()
    const isFormValid = email.trim().length > 0 && password.trim().length > 0

    
    useEffect(() => {
        document.title = "Warden Login"
    }, [])

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    const loginUser = async () => {
        setIsLoading(true)
        try {
            const { response, error } = await authentication(email, password)

            if (error) {
                alert(error)
                return
            }

            if (response.status === 200) {
                const data = await response.json()
                userLogged(data, "warden")
                navigate('/home/')
            } else {
                alert(await response.text())
                setIsLoading(false)
            }
        } catch (error) {
            alert('Something went wrong.Please try later')
        }
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
                                <img src="/assets/img/logo.png" />
                                <span className="d-none d-lg-block">Hostel</span>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="pt-4 pb-2">
                                    <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                    <p className="text-center small">Enter your email & password to login</p>
                                </div>
                                <div 
                                    className="row g-3 needs-validation" 
                                    novalidate
                                >
                                <div className="col-12">
                                    <label 
                                        htmlFor="email" 
                                        className="form-label"
                                    >Email
                                    </label>
                                    <div className="input-group has-validation">
                                        <input 
                                            type="email" 
                                            name="email" 
                                            className="form-control" 
                                            id="email"
                                            value={email} 
                                            placeholder="Enter email"
                                            required 
                                            onChange={handleEmailChange}
                                        />
                                        <div className="invalid-feedback">Please enter your email.</div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label 
                                        htmlFor="password" 
                                        className="form-label"
                                    >Password
                                    </label>
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        name="password" 
                                        className="form-control" 
                                        id="password"
                                        placeholder="Enter password" 
                                        value={password} 
                                        required 
                                        onChange={handlePasswordChange}
                                    />
                                    <div className="invalid-feedback">Please enter your password!</div>
                                </div>

                            <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <input 
                                            className="form-check-input me-2" 
                                            type="checkbox" 
                                            name="remember" 
                                            id="rememberMe" 
                                            value="true"
                                            onChange={togglePasswordVisibility}
                                        />
                                        <label 
                                            className="form-check-label" 
                                            htmlFor="rememberMe" 
                                        >Remember me
                                        </label>
                                    </div>
                                    <small className="text">
                                        <Link to="/warden/resetpassword/">Forgotten password?</Link>
                                    </small>
                                </div>
                            </div>

                            <div className="col-12">
                                <button 
                                    className="btn btn-primary w-100" 
                                    type="submit"
                                    onClick={loginUser}
                                    disabled={!isFormValid || isLoading} 
                                >
                                    {isLoading ? "Logging in..." : "Login"}
                                </button>
                            </div>
                            <Link 
                                to="/student/login/" 
                                className="text-center small"
                            >Student login?
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="credits">
                    Designed by <a href="https://www.linkedin.com/in/jeeva377">Jeeva|Linkedin</a>
                </div>
            </div>
        </div>
    </div>
    </section>
    </div>
    </main>
    )
}

export default WardenLogin