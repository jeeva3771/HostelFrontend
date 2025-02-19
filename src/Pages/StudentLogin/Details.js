import { useEffect, useState, useRef } from "react"
import Header from "../Partials/Header"
import Sidebar from "../Partials/Aside"
import Footer from "../Partials/Footer"
import { useAuth } from "../AuthContext"
import Breadcrumbs from '../Partials/BreadCrumb'
import { studentAppUrl } from '../../config/index'
import { updateImage, deleteImage } from './Api'
import { useNavigate } from 'react-router-dom'
import './App.css'

function Details() {
    const { studentDetails, userLogout } = useAuth()
    const [details, setDetails] = useState(studentDetails)
    const fileInputRef = useRef(null)
    const [imageUrl, setImageUrl] = useState(`${studentAppUrl}/api/student/image?date=${Date.now()}`)
    const [isUploading, setIsUploading] = useState(false)
    const { navigate } = useNavigate()
    const breadcrumbData = [
        { name: 'Pages', link: '' },
        { name: 'Student', link: '' }
    ]
    const fields = [
        { label: "Name", key: "name" },
        { label: "Register Number", key: "registerNumber" },
        { label: "DOB", key: "birth" },
        { label: "Course", key: "courseName" },
        { label: "Email Id", key: "emailId" },
        { label: "Phone Number", key: "phoneNumber" },
        { label: "Father Name", key: "fatherName" },
        { label: "Father Number", key: "fatherNumber" },
        { label: "Address", key: "address" },
        { label: "Block Code", key: "blockCode" },
        { label: "Floor Number", key: "floorNumber" },
        { label: "Room Number", key: "roomNumber" },
        { label: "Joined Date", key: "joinDate" },
    ]

    useEffect(() => {
        document.title = "Student Details"
    }, [])
    
    useEffect(() => {
        const storedDetails = localStorage.getItem("studentDetails")
        if (storedDetails) {
            setDetails(JSON.parse(storedDetails))
        }
    }, [studentDetails])
    
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
            const { response, error } = await updateImage(file)

            if (error) {
                alert(error)
                return
            }

            if (response.status === 401) {
                userLogout('student')
                navigate('/student/login/')
                return
            }

            if(response.ok) {
                setImageUrl(`${studentAppUrl}/api/student/image?date=${Date.now()}`)
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
            const { response, error } = await deleteImage()

            if (error) {
                alert(error)
                return
            }

            if (response.status === 401) {
                userLogout('student')
                navigate('/student/login/')
                return
            }

            if (response.ok) {
                setImageUrl(`${studentAppUrl}/api/student/image?date=${Date.now()}`)
            } else {
                alert('Not deleted')
            }
        } catch(error) {
            alert('Something went wrong.Please try later')
        }
    }

    return (
        <>
        <Header />
        <Sidebar />
        <main 
            className="main" 
            id="main"
        >
            <div className="pagetitle">
                <h1>Student Details</h1>
                <Breadcrumbs 
                    breadcrumb={breadcrumbData} 
                />
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
                            />
                            <h2 className="upperCase">{studentDetails.name}</h2>
                            <h3>Student</h3>
                            <div className="social-links mt-2">
                                <a 
                                    href="" 
                                    className="twitter"
                                >
                                    <i className="bi bi-twitter"></i>
                                </a>
                                <a 
                                    href="" 
                                    className="facebook"
                                >
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a 
                                    href="" 
                                    className="instagram"
                                >
                                    <i className="bi bi-instagram"></i>
                                </a>
                                <a 
                                    href="" 
                                    className="linkedin"
                                >
                                    <i className="bi bi-linkedin"></i>
                                </a>
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
                                    >Edit Image
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content pt-2">
                                <div 
                                    className="tab-pane fade show active profile-overview" 
                                    id="profile-overview">
                                    <h5 className="card-title">Student Details</h5>
                                    {details &&
                                        fields.map(({ label, key }) => (
                                            <div 
                                                className="row" 
                                                key={key}
                                            >
                                                <div className="col-lg-3 col-md-4 label">{label}</div>
                                                <div className="col-lg-9 col-md-8">
                                                    {details[key]}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div 
                                    className="tab-pane fade profile-edit pt-3" 
                                    id="profile-edit"
                                >
                                    <div className="row mb-3">
                                        <label 
                                            for="profileImage" 
                                            className="col-md-4 col-lg-3 col-form-label"
                                        >Student Image
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                            <div 
                                                className="d-inline-block position-relative">
                                                {isUploading  &&
                                                    <span className="spinner-border text-secondary spinner"></span>
                                                }
                                                <img src={imageUrl} 
                                                    alt="Profile"
                                                />
                                            </div>                            
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
                                                    class="btn btn-danger btn-sm" 
                                                    title="Remove my profile image"
                                                    onClick={deleteImageHandler}
                                                >
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </div>
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

export default Details
