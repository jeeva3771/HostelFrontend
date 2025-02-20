import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "../../Partials/Footer"
import Header from "../../Partials/Header"
import Breadcrumbs from "../../Partials/BreadCrumb"
import Sidebar from "../../Partials/Aside"
import { 
    readWardenById, 
    saveOrUpdateWarden,
} from "../Api"
import formatDate from "../DateFormat"
import { useAuth } from "../../AuthContext"


function WardenForm() {
    const { userLogout } = useAuth()
    const [warden, setWarden] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        isAdmin: null,
        emailId: '',
        image: '',
        password: '',
        confirmPassword: ''
    })


    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { wardenId } = useParams()
    
    const breadcrumbData = [
        { name: 'Home', link: '/home/' },
        { name: 'Warden', link: '/warden/' },
        { name: wardenId ? "Edit" : "Add", link: "" }
    ]

    useEffect(() => {
       document.title = wardenId ? "Edit Warden" : "Add Warden"
    }, [])

    useEffect(() => {
        if (!wardenId) return
        handleReadWardenById(wardenId)
    }, [wardenId])

    const handleReadWardenById = async (wardenId) => {
        try {
            const { response, error } = await readWardenById(wardenId)
            if (error) {
                alert(error)
                return
            }

            if (response.status === 401) {
                userLogout('warden')
                navigate('/login/')
                return
            }
            
            if (response.ok) {
                const warden = await response.json()
                setWarden({
                    firstName: warden.firstName,
                    lastName: warden.lastName,
                    dob: formatDate(warden.birth),
                    isAdmin: warden.superAdmin,
                    emailId: warden.emailId
                })
            } else {
                alert(await response.text())
            }
        } catch (error) {
            alert('Something went wrong.Please try later')
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        const payload = {
            firstName: warden.firstName,
            lastName: warden.lastName,
            dob: warden.dob,
            emailId: warden.emailId,
            superAdmin: warden.isAdmin,
            image: warden.image,
            password: warden.password
        }

        try {
            const { response, error } = await saveOrUpdateWarden(wardenId, payload)
            if (error) {
                alert(error)
                return
            }

            if (response.status === 401) {
                userLogout('warden')
                navigate('/login/')
                return
            }

            if ([200, 201].includes(response.status)) {
                navigate('/warden/')
            } else {
                const responseData = await response.json();
                if (Array.isArray(responseData)) {
                    const errorMessage = responseData.join('\n');
                    alert(errorMessage);
                } else {
                    alert(responseData.error || responseData);
                }
            }
        } catch (error) {
            alert("Something went wrong. Please try later.");
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
        <Header />
        <Sidebar />
        <main id="main">
        <div className="pagetitle">
            <h1>Warden Form</h1>
            <Breadcrumbs breadcrumb={breadcrumbData} />
        </div>
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <form>
                                <div className="row mb-3 mt-5">
                                    <label 
                                        className="col-sm-2 col-form-label" 
                                        for="fistName"
                                    >
                                        First Name<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fistName"
                                            value={warden.firstName}
                                            onChange={(e) => setWarden({ ...warden, firstName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        for="lastName" 
                                    >
                                        Last Name<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            value={warden.lastName}
                                            onChange={(e) => setWarden({ ...warden, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        for="dob" 
                                    >
                                        DOB<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="dob"
                                            value={warden.dob}
                                            onChange={(e) => setWarden({ ...warden, dob: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">
                                        Admin<span className="text-danger">*</span>
                                    </legend>
                                    <div className="col-sm-10">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="status"
                                                value="1"
                                                id="admin"
                                                checked={warden.isAdmin === 1}
                                                onChange={() => setWarden({ ...warden, isAdmin: 1 })}
                                            />
                                            <label 
                                                className="form-check-label" 
                                                for="admin"
                                            >Yes
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="status"
                                                value="0"
                                                id="notAdmin"
                                                checked={warden.isAdmin === 0}
                                                onChange={() => setWarden({ ...warden, isAdmin: 0 })}
                                            />
                                            <label 
                                                className="form-check-label" 
                                                for="notAdmin"
                                            >No
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>


                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        for="email" 
                                    >
                                        Email Id<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={warden.emailId}
                                            onChange={(e) => setWarden({ ...warden, emailId: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {!wardenId && (
                                <>
                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        for="password" 
                                    >
                                        Password<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={warden.password}
                                            onChange={(e) => setWarden({ ...warden, password: e.target.value })}
                                        />
                                    </div>
                                </div>
                                
                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        for="confirmPassword" 
                                    >
                                        Confirm Password<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            value={warden.confirmPassword}
                                            onChange={(e) => setWarden({ ...warden, confirmPassword: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        for="image" 
                                    >
                                        Image Upload
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="image"
                                            name="image"
                                            onChange={(e) => setWarden({ ...warden, image: e.target.files[0] })}
                                        />
                                    </div>
                                </div>
                                </>
                                )}

                                <div className="text-center">
                                    {!wardenId && (
                                        <button type="reset" className="btn btn-secondary me-2" onClick={() => {
                                            setWarden({
                                                firstName: '',
                                                lastName: '',
                                                dob: '',
                                                isAdmin: null,
                                                emailId: '',
                                                image: null,
                                                password: '',
                                                confirmPassword: ''
                                            })
                                        }}>
                                            Reset
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSubmit}
                                        disabled={
                                            !warden.firstName ||
                                            !warden.lastName ||
                                            !warden.dob ||
                                            !warden.emailId ||
                                            warden.isAdmin === null ||
                                            (!wardenId && (!warden.password || warden.password !== warden.confirmPassword)) ||
                                            warden.password.length <= 6 ||
                                            warden.confirmPassword.length <= 6 ||
                                            loading
                                        }
                                    >
                                        {loading ? "Submitting..." : "Submit"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <Footer />
    </>
    )
}

export default WardenForm
