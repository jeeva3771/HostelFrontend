import { useEffect, useState } from "react"
import Header from "../Partials/Header"
import Siderbar from "../Partials/Aside"
import Footer from "../Partials/Footer"

function Details() {
    const [details, setDetails] = useState(null)
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
        const studentDetails = async() => {
            try {
                const response = await fetch('http://localhost:1006/api/student/details', {
                    method: 'GET',
                    credentials: 'include'
                })
                const student = await response.json()
                setDetails(student)
            } catch (error) {
                alert('Something went wrong.Please try later.')
            }
        }
        studentDetails()
    }, [])

    return (
        <>
        <Header />
        <Siderbar activeMenu={'Student'} />
        <main>
            <div className="pagetitle">
                <h1>Attendance Report</h1>
            </div>
            <section className="section profile">
            <div className="row">
                <div className="col-xl-4">
                    <div className="card">
                        <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                            <img src="" alt="Profile" className="rounded-circle" id="image" name="image" />
                            <h2></h2>
                            <h3>Student</h3>
                            <div className="social-links mt-2">
                                <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                                <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="card">
                        <div className="card-body pt-3">
                            <ul className="nav nav-tabs nav-tabs-bordered">
                                <li className="nav-item">
                                <button className="nav-link active" data-bs-toggle="tab"
                                    data-bs-target="#profile-overview">Overview</button>
                                </li>
                                <li className="nav-item">
                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Image</button>
                                </li>
                            </ul>
                            <div className="tab-content pt-2">
                                <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                    <h5 className="card-title">Student Details</h5>
                                        {details ? (
                                        fields.map(({ label, key }) => (
                                            <div className="row" key={key}>
                                                <div className="col-lg-3 col-md-4 label">{label}</div>
                                                <div className="col-lg-9 col-md-8">
                                                    {details[key]}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div>Loading...</div>
                                    )}
                                    
                                </div>
                                <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                                    <div>
                                        <div className="row mb-3">
                                            <label for="profileImage" className="col-md-4 col-lg-3 col-form-label">Student Image</label>
                                            <div className="col-md-8 col-lg-9">
                                                <div>
                                                    <span className="spinner-border text-secondary spinner2" id="spinner"></span>
                                                    <img src="" alt="Profile" id="editProfile" />
                                                </div>                            
                                                <div className="pt-2">
                                                    <a className="btn btn-primary btn-sm" title="Upload new profile image">
                                                        <input className="form-control" type="file" id="changeImage" 
                                                        name="image" />
                                                        <i className="bi bi-upload"></i></a>
                                                    <a href="javascript:void(0);" className="btn btn-danger btn-sm" title="Remove my profile image"
                                                    ><i className="bi bi-trash"></i></a>
                                                </div>
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
