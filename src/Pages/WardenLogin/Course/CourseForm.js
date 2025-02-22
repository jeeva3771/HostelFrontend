import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "../../Partials/Footer"
import Header from "../../Partials/Header"
import Breadcrumbs from "../../Partials/BreadCrumb"
import Sidebar from "../../Partials/Aside"
import { readCourseById, saveOrUpdateCourse } from "../Api"
import { useAuth } from "../../AuthContext"

function CourseForm() {
    const { userLogout } = useAuth()
    const [course, setCourse] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { courseId } = useParams()
    
    const breadcrumbData = [
        { name: 'Home', link: '/home/' },
        { name: 'Others', link: '' },
        { name: 'Course', link: '/course/' },
        { name: courseId ? "Edit" : "Add", link: "" }
    ]

    useEffect(() => {
        document.title = courseId ? "Edit Course" : "Add Course"
    }, [])

    useEffect(() => {
        if (!courseId) return
        handleReadCourseById(courseId)
    }, [courseId])

    const handleReadCourseById = async (courseId) => {
        try {
            const { response, error } = await readCourseById(courseId)
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
                const course = await response.json();
                setCourse(course.courseName)
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
            courseName: course
        }

        try {
            const { response, error } = await saveOrUpdateCourse(courseId, payload)
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
                navigate('/course/')
            } else {
                const responseData = await response.json()
                alert(Array.isArray(responseData) ? responseData[0] : responseData.error || responseData)
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
            <h1>Course Form</h1>
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
                                        htmlFor="courseName"
                                    >
                                        Course Name<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="courseName"
                                            value={course}
                                            onChange={(e) => setCourse(e.target.value )}
                                        />
                                    </div>
                                </div>

                                <div className="text-center">
                                    {!courseId && (
                                        <button type="reset" className="btn btn-secondary me-2" onClick={() => {
                                            setCourse('')
                                        }}>
                                            Reset
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSubmit}
                                        disabled={!course || loading}
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

export default CourseForm
