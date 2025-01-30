const { useState } = require("react")

function WardenLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function loginUser() {
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
  
        const raw = JSON.stringify({
          "emailId": email,
          "password": password
        })
  
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw
        };
  
        fetch(`${process.env.REACT_WARDENAPP_API_URL}/api/login`, requestOptions)
        .then(async (response) => {
            if (response.status === 200) {
            } else {
                alert(await response.text())
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
                                <div className="pt-4 pb-2">
                                    <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                    <p className="text-center small">Enter your email & password to login</p>
                                </div>
                                <div className="row g-3 needs-validation" novalidate>
                                <div className="col-12">
                                    <label for="email" className="form-label">Email</label>
                                    <div className="input-group has-validation">
                                        <input type="email" name="email" className="form-control" id="email"
                                        value={email} placeholder="Enter email" required 
                                        onChange={(e)=>setEmail(e.target.value)}/>
                                        <div className="invalid-feedback">Please enter your email.</div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label for="password" className="form-label">Password</label>
                                    <input type="password" name="password" className="form-control" id="password"
                                        placeholder="Enter password" value={password} required 
                                        onChange={(e)=>setPassword(e.target.value)}/>
                                    <div className="invalid-feedback">Please enter your password!</div>
                                </div>

                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" name="remember" id="rememberMe" value="true"/>
                                    <label className="form-check-label me-2" for="rememberMe">Remember me</label>
                                    <small><a href="/warden/resetpassword/">Forgotten password?</a></small>
                                </div>
                            </div>

                            <div className="col-12">
                                <button className="btn btn-primary w-100" type="submit"
                                    onclick={loginUser}>Login</button>
                            </div>
                            <Link to="/student/login/" className="text-center small">
                                Student login?</Link>
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