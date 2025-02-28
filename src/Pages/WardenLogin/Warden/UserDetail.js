import Header from "../../Partials/Header"
import Breadcrumbs from "../../Partials/BreadCrumb"
import Sidebar from "../../Partials/Aside"
import Footer from "../../Partials/Footer"
import { 
    useEffect, 
    useState, 
    useRef 
} from "react"
import { 
    updateImage, 
    deleteImage, 
    readWardenDetails, 
    editUserData, 
    changePassword 
} from '../Api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../AuthContext"
import { appUrl } from "../../../config"
import formatDate from "../DateFormat"

function UserDetail() {
    const { wardenDetails, userLogout } = useAuth()
    const [details, setDetails] = useState(wardenDetails)
    const fileInputRef = useRef(null)
    const [imageUrl, setImageUrl] = useState(`${appUrl}/api/warden/${details.wardenId}/avatar/?date=${Date.now()}/`)
    const [isUploading, setIsUploading] = useState(false)
    const { navigate } = useNavigate()
    const [originalData, setOriginalData] = useState(null)
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        reEnterNewPassword: ''
    })

    const [updateData, setUpdateData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        email: ''
    })
    const isChanged = 
    originalData &&
    JSON.stringify(updateData) !== JSON.stringify(originalData)
    
    const breadcrumbData = [
        { name: 'Home', link: '/home/' },
        { name: 'User', link: '' },
        { name: 'UserDetils', link: '/warden/details/' }
    ]
    const fields = [
        { label: "Full Name", key: "firstName" },
        { label: "DOB", key: "birth" },
        { label: "Status", key: "superAdmin" },
        { label: "Email Id", key: "emailId" },
    ]

    useEffect(() => {
        document.title = "User Details"
        handleReadWardenDetails()
    }, [])

    useEffect(() => {
        const storedDetails = localStorage.getItem("wardenDetails")
        if (storedDetails) {
            setDetails(JSON.parse(storedDetails))
        }
    }, [wardenDetails])

    useEffect(() => {
        if (!isUploading) return

        const timeout = setTimeout(() => {
            setIsUploading(false)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [isUploading])

    const updateImageHandler = async (event) => {
        const file = event.target.files[0]

        if (!file) {
            alert("Please select an image first!")
            return
        }
        setIsUploading(true)

        try {
            const { response, error } = await updateImage(file, details.wardenId)

            if (error) {
                alert(error)
                return
            }

            if (response.status === 401) {
                userLogout('warden')
                navigate('/login/')
                return
            }

            if(response.ok) {
                setImageUrl(`${appUrl}/api/warden/${details.wardenId}/avatar/?date=${Date.now()}`)
                alert("Image updated successfully!")
            } else if (response.status === 400) {
                alert(await response.text())
            } 
        } catch (error) {
            setIsUploading(false)
            alert('Something went wrong.Please try later')
        }
    }

    const deleteImageHandler = async () => {
        try {
            const { response, error } = await deleteImage(details.wardenId)

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
                setImageUrl(`${appUrl}/api/warden/${details.wardenId}/avatar/?date=${Date.now()}/`)
            } else {
                alert('Not deleted')
            }
        } catch(error) {
            alert('Something went wrong.Please try later')
        }
    }

    const handleReadWardenDetails = async () => {
        try {
            const { response, error } = await readWardenDetails(details.wardenId)
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
                const dob = formatDate(warden.birth)
                const data = {
                    firstName: warden.firstName,
                    lastName: warden.lastName,
                    dob: dob,
                    email: warden.emailId
                }
                setUpdateData(data)
                setOriginalData(data) 
            } else {
                alert(await response.text())
            }
        } catch (error) {
            alert('Something went wrong.Please try later')
        }
    }

    const handleEditUserData = async () => {
        const payload = {
            firstName: updateData.firstName,
            lastName: updateData.lastName,
            dob: updateData.dob,
            emailId: updateData.email
        }
        try {
            const { response, error } = await editUserData(details.wardenId, payload)
            if (error) {
                alert(error)
                return
            }

            if (response.status === 401) {
                userLogout('warden')
                navigate('/login/')
                return
            }

            if (response.status === 200) {
                alert('Successfully changed!')
                setOriginalData(updateData)
                const storedDetails = localStorage.getItem("wardenDetails");
                    if (storedDetails) {
                        const wardenDetails = JSON.parse(storedDetails)
                        wardenDetails.firstName = updateData.firstName
                        wardenDetails.lastName = updateData.lastName
                        wardenDetails.birth = updateData.dob
                        wardenDetails.emailId = updateData.email
                        localStorage.setItem("wardenDetails", JSON.stringify(wardenDetails))
                        setDetails(wardenDetails)
                    }

            } else {
                const responseText = await response.json()
                if (Array.isArray(responseText)) {
                    const errorMessage = responseText.join('\n')
                    alert(errorMessage)
                } else {
                    alert(responseText.error || responseText)
                }
            }
        } catch (error) {
            alert('Something went wrong.Please try later')
        }
    }

    const handleChangePassword = async () => {
        try {
            const payload = {
                oldPassword: password.currentPassword,
                newPassword: password.newPassword
            }
            const { response, error } = await changePassword(details.wardenId, payload)
            if (error) {
                alert(error)
                return
            }

            if (response.status === 401) {
                userLogout('warden')
                navigate('/login/')
                return
            }

            if (response.status === 200) {
                alert('Password successfully changed!')
                setPassword({
                    currentPassword: '',
                    newPassword: '',
                    reEnterNewPassword: ''
                })
            } else {
                alert(await response.text())
            }
        } catch (error) {
            alert('Something went wrong.Please try later')
        }
    }

    return (
        <>
        <Header />
            <Sidebar />
            <main id="main">
                <div className="pagetitle">
                    <h1>User Details</h1>
                    <Breadcrumbs breadcrumb={breadcrumbData} />
                </div>
                <section className="section profile">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card">
                                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                                    <img 
                                        src={imageUrl} 
                                        alt="Profile" 
                                        className="rounded-circle"
                                        name="image"
                                    />
                                    <h2 className="upperCase">{details.firstName}{details.lastName}</h2>
                                    <h3>{details.superAdmin === 1 ? 'Admin' : 'Warden'}</h3>
                                    <div className="social-links mt-2">
                                        <a className="twitter"><i className="bi bi-twitter"></i></a>
                                        <a  className="facebook"><i className="bi bi-facebook"></i></a>
                                        <a className="instagram"><i className="bi bi-instagram"></i></a>
                                        <a  className="linkedin"><i className="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="card">
                                <div className="card-body pt-3">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button 
                                                className="nav-link active" 
                                                data-bs-toggle="tab"
                                                data-bs-target="#profile-overview"
                                            >Overview
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button 
                                                className="nav-link" 
                                                data-bs-toggle="tab" 
                                                data-bs-target="#profile-edit"
                                            >Edit User
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button 
                                                className="nav-link" 
                                                data-bs-toggle="tab" 
                                                data-bs-target="#profile-change-password"
                                            >Change Password</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content pt-2">
                                        <div 
                                            className="tab-pane fade show active profile-overview" 
                                            id="profile-overview"
                                        >
                                        <h5 className="card-title">User Details</h5>
                                        {details &&
                                            fields.map(({ label, key }) => (
                                                <div className="row" key={key}>
                                                    <div className="col-lg-3 col-md-4 label">{label}</div>
                                                    <div className="col-lg-9 col-md-8">                                                        
                                                        {key === "firstName"
                                                            ? `${details.firstName.charAt(0).toUpperCase()}${details.firstName.slice(1)}${details.lastName}`
                                                            : key === "superAdmin"
                                                            ? details.superAdmin === 1
                                                                ? "Admin"
                                                                : "Warden"
                                                            : details[key]}
                                                    </div>
                                                </div>
                                            ))
                                        } 
                                </div>
                                <div className="tab-pane fade profile-edit pt-3" id="profile-edit">

                                <div>
                                    <div className="row mb-3">
                                        <label 
                                            htmlFor="profileImage" 
                                            className="col-md-4 col-lg-3 col-form-label"
                                        >User Image
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                            <div >
                                                <span className="spinner-border text-secondary spinner2" id="spinner"></span>
                                                <img src={imageUrl} alt="Profile" />
                                            </div>                            
                                            <div className="pt-2">
                                                <div className="pt-2">
                                                    <a
                                                        className="btn btn-primary btn-sm me-1"
                                                        title="Upload new profile image"
                                                        onClick={()=> fileInputRef.current.click()}
                                                    >
                                                        <i className="bi bi-upload"></i>
                                                    </a>

                                                    <input
                                                        type="file"
                                                        className="none"
                                                        ref={fileInputRef}
                                                        onChange={updateImageHandler}
                                                        name="image"
                                                    />
                                                    <button 
                                                        className="btn btn-danger btn-sm" 
                                                        title="Remove my profile image"
                                                        onClick={deleteImageHandler}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label 
                                            htmlFor="firstName" 
                                            className="col-md-4 col-lg-3 col-form-label"
                                        >First Name
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                        <input 
                                            name="fullName" 
                                            type="text" 
                                            className="form-control" 
                                            id="firstName" 
                                            value={updateData.firstName}
                                            onChange={(e)=> setUpdateData((prevData) => ({
                                                ...prevData,
                                                firstName: e.target.value,
                                            }))}
                                        /> 
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label 
                                            htmlFor="lastName" 
                                            className="col-md-4 col-lg-3 col-form-label"
                                        >Last Name
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                            <input 
                                                name="fullName" 
                                                type="text" 
                                                className="form-control" 
                                                id="lastName" 
                                                value={updateData.lastName}
                                                onChange={(e)=> setUpdateData((prevData) => ({
                                                    ...prevData,
                                                    lastName: e.target.value,
                                                }))}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label 
                                            htmlFor="dob" 
                                            className="col-md-4 col-lg-3 col-form-label"
                                        >DOB
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                            <input 
                                                name="dob" 
                                                type="date" 
                                                className="form-control" 
                                                id="dob" 
                                                value={updateData.dob}
                                                onChange={(e)=> setUpdateData((prevData) => ({
                                                    ...prevData,
                                                    dob: e.target.value,
                                                }))}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="row mb-3">
                                        <label 
                                            htmlFor="email" 
                                            className="col-md-4 col-lg-3 col-form-label"
                                        >Email
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                            <input 
                                                name="email" 
                                                type="email" 
                                                className="form-control" 
                                                id="email" 
                                                value={updateData.email}
                                                onChange={(e)=> setUpdateData((prevData) => ({
                                                    ...prevData,
                                                    email: e.target.value,
                                                }))}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="text-center">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary"
                                            onClick={handleEditUserData}
                                            disabled={!isChanged}
                                        >Save Changes
                                        </button>
                                    </div>
                                    </div>                        
                                </div>

                                <div 
                                    className="tab-pane fade pt-3" 
                                    id="profile-change-password"
                                >
                                    <div>
                                        <div className="row mb-3">
                                            <label 
                                                htmlFor="currentPassword" 
                                                className="col-md-4 col-lg-3 col-form-label"
                                            >Current Password
                                            </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input 
                                                    name="password" 
                                                    type="password" 
                                                    className="form-control" 
                                                    id="currentPassword" 
                                                    value={password.currentPassword}
                                                    onChange={(e) => setPassword((prev) => ({
                                                        ...prev,
                                                        currentPassword: e.target.value
                                                    }))}
                                                />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label 
                                                htmlFor="newPassword" 
                                                className="col-md-4 col-lg-3 col-form-label"
                                            >New Password
                                            </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input 
                                                    name="newpassword" 
                                                    type="password" 
                                                    className="form-control" 
                                                    id="newPassword"
                                                    value={password.newPassword}
                                                    onChange={(e) => setPassword((prev) => ({
                                                        ...prev,
                                                        newPassword: e.target.value
                                                    }))}
                                                />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label 
                                                htmlFor="renewPassword" 
                                                className="col-md-4 col-lg-3 col-form-label"
                                            >Re-enter New Password
                                            </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input 
                                                    name="renewpassword" 
                                                    type="password" 
                                                    className="form-control" 
                                                    id="renewPassword"
                                                    value={password.reEnterNewPassword}
                                                    onChange={(e) => setPassword((prev) => ({
                                                        ...prev,
                                                        reEnterNewPassword: e.target.value
                                                    }))} 
                                                />
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <button 
                                                type="button" 
                                                className="btn btn-primary" 
                                                id="resetPassword" 
                                                onClick={handleChangePassword}
                                                disabled={
                                                    !password.currentPassword ||
                                                    password.newPassword.length < 6 ||
                                                    password.newPassword !== password.reEnterNewPassword
                                                }
                                            >Change Password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default UserDetail