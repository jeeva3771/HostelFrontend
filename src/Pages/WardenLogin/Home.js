import Footer from "../WardenPartials/Footer"
import Siderbar from "../WardenPartials/Aside"
import Header from "../WardenPartials/Header"
import Breadcrumbs from "../WardenPartials/BreadCrumb"
import './App.css'
import { 
        readBlockCount,
        readBlockFloorCount,
        readRoomCount,
        readStudentCount,
        readWardenCount,
        readCourseCount
} from "./Api"
import { 
    useEffect,
    useState 
} from "react"


function Home() {
    const [state, setState] = useState({
        blockCount: '',
        isBlockLoad: false,
        floorCount: '',
        isFloorLoad: false,
        roomCount: '',
        isRoomLoad: false,
        studentCount: '',
        isStudentLoad: false,
        wardenCount: '',
        isWardenLoad: false,
        courseCount: '',
        isCourseLoad: false
    })

    const breadcrumbData = [
        { name: 'Home', link: '' },
        { name: 'Dashboard', link: '' }
    ]

    useEffect(() => {
        document.title = "Home"
    }, [])

    useEffect(() => {
        fetchCounts()
    }, [])

    const fetchCounts = async () => {
        await Promise.all([
            handleBlockCount(), 
            handleBlockFloorCount(),  
            handleRoomCount(),
            handleStudentCount(),
            handleWardenCount(),
            handleCourseCount()
        ])
    }

    const handleBlockCount = async () => {
        try {
            setState(prev => ({ ...prev, isBlockLoad: true }))            
            const { response, error } = await readBlockCount()

            if (error) {
                alert(error)
                return
            }

            if(response.ok) {
                const block = await response.json()
                setState(prev => ({ ...prev, blockCount: block.totalBlockCount }))
            } else if (response.status === 404) {
                alert(await response.text())
            } 

        } catch (error) {
            alert('Something went wrong.Please try later')
        } finally {
            setState(prev => ({ ...prev, isBlockLoad: false }));
        }
    }

    const handleBlockFloorCount = async () => {
        try {
            setState(prev => ({ ...prev, isFloorLoad: true }))
            const { response, error } = await readBlockFloorCount()

            if (error) {
                alert(error)
                return
            }
            
            if(response.ok) {
                const blockFloor = await response.json()
                setState( prev => ({ ...prev, floorCount: blockFloor.totalFloorCount}))
            } else if (response.status === 404) {
                alert(await response.text())
            } 

        } catch (error) {
            alert('Something went wrong.Please try later')
        } finally {
            setState(prev => ({ ...prev, isFloorLoad: false }))        
        }
    }

    const handleRoomCount = async () => {
        try {
            setState(prev => ({ ...prev, isRoomLoad: true }))
            const { response, error } = await readRoomCount()

            if (error) {
                alert(error)
                return
            }
            
            if(response.ok) {
                const room = await response.json()
                setState( prev => ({ ...prev, roomCount: room.totalRoomCount}))
            } else if (response.status === 404) {
                alert(await response.text())
            } 

        } catch (error) {
            alert('Something went wrong.Please try later')
        } finally {
            setState(prev => ({ ...prev, isRoomLoad: false }))        
        }
    }

    const handleStudentCount = async () => {
        try {
            setState(prev => ({ ...prev, isStudentLoad: true }))
            const { response, error } = await readStudentCount()

            if (error) {
                alert(error)
                return
            }
            
            if(response.ok) {
                const student = await response.json()
                setState( prev => ({ ...prev, studentCount: student.totalStudentCount}))
            } else if (response.status === 404) {
                alert(await response.text())
            } 

        } catch (error) {
            alert('Something went wrong.Please try later')
        } finally {
            setState(prev => ({ ...prev, isStudentLoad: false }))        
        }
    }

    const handleWardenCount = async () => {
        try {
            setState(prev => ({ ...prev, isWardenLoad: true }))
            const { response, error } = await readWardenCount()

            if (error) {
                alert(error)
                return
            }
            
            if(response.ok) {
                const warden = await response.json()
                setState( prev => ({ ...prev, wardenCount: warden.totalWardenCount}))
            } else if (response.status === 404) {
                alert(await response.text())
            } 
        } catch (error) {
            alert('Something went wrong.Please try later')
        } finally {
            setState(prev => ({ ...prev, isWardenLoad: false }))        
        }
    }

    const handleCourseCount = async () => {
        try {
            setState(prev => ({ ...prev, isCourseLoad: true }))
            const { response, error } = await readCourseCount()

            if (error) {
                alert(error)
                return
            }
            
            if(response.ok) {
                const course = await response.json()
                setState( prev => ({ ...prev, courseCount: course.totalCourseCount}))
            } else if (response.status === 404) {
                alert(await response.text())
            } 

        } catch (error) {
            alert('Something went wrong.Please try later')
        } finally {
            setState(prev => ({ ...prev, isCourseLoad: false }))        
        }
    }


    return (
        <>
        <Header />
        <Siderbar activeMenu={'Dashboard'} />
        <main className="main" id="main">
            <div className="pagetitle">
                <h1>Dashboard</h1>
                <Breadcrumbs 
                    breadcrumb={breadcrumbData} 
                />
            </div>
            <section className="section dashboard">
            <div className="row">
                <div className="col-lg-8">
                     <div className="row">
                        <div className="col-xxl-4 col-md-6">
                            <div className="card info-card sales-card">
                                <div className="filter">
                                    <a 
                                        className="icon"
                                        href="#" 
                                        data-bs-toggle="dropdown"
                                    >
                                        <i className="bi bi-three-dots"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Option</h6>
                                        </li>
                                        <li>
                                            <a 
                                                className="dropdown-item" 
                                                href="/block/"
                                            >Block
                                            </a>
                                        </li>
                                        <li>
                                            <a 
                                                className="dropdown-item" 
                                                href="/block/add/"
                                            >Add Block
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="card-body mt-4">
                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="ri-bank-line"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6>Block</h6>
                                            <span className="text-success small pt-1 fw-bold">
                                            <span className="text-success small pt-1 fw-bold">
                                                {state.isBlockLoad ? (
                                                    <span className="spinner-border text-secondary spinner1"></span>
                                                ) : (
                                                    state.blockCount
                                                )}
                                            </span>
                                            </span> 
                                            <span className="text-muted small pt-2 ps-1">Block(s)</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-xxl-4 col-md-6">
                            <div className="card info-card revenue-card">
                                <div className="filter">
                                    <a 
                                        className="icon"    
                                        href="" 
                                        data-bs-toggle="dropdown"
                                    >
                                        <i className="bi bi-three-dots"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Option</h6>
                                        </li>

                                        <li>
                                            <a 
                                                className="dropdown-item" 
                                                href="/blockfloor/"
                                            >Block floor
                                            </a>
                                        </li>
                                        <li>
                                            <a 
                                                className="dropdown-item" 
                                                href="/blockfloor/add/"
                                            >Add Block floor
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="card-body mt-4">
                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="ri-building-4-line"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6>Block Floor</h6>
                                            <span className="text-success small pt-1 fw-bold">
                                                {state.isFloorLoad ? (
                                                    <span className="spinner-border text-secondary spinner1"></span>
                                                ) : (
                                                    state.floorCount
                                                )}
                                            </span> 
                                            <span className="text-muted small pt-2 ps-1">Block Floor(s)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-xl-6">
                            <div className="card info-card customers-card">
                                <div className="filter">
                                    <a className="icon" href="" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                        <h6>Option</h6>
                                        </li>

                                        <li><a className="dropdown-item" href="/room/">Room</a></li>
                                        <li><a className="dropdown-item" href="/room/add/">Add Room</a></li>
                                    </ul>
                                </div>

                                <div className="card-body mt-4">
                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-house-fill"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6>Room</h6>
                                            <span className="text-success small pt-1 fw-bold">
                                                {state.isRoomLoad ? (
                                                    <span className="spinner-border text-secondary spinner1"></span>
                                                ) : (
                                                    state.roomCount
                                                )}
                                            </span> 
                                            <span className="text-muted small pt-2 ps-1">Room(s)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-xxl-4 col-xl-6">
                            <div className="card info-card customers-card">
                                <div className="filter">
                                    <a 
                                        className="icon" 
                                        href="#" 
                                        data-bs-toggle="dropdown"
                                    >
                                        <i className="bi bi-three-dots"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Option</h6>
                                        </li>
                                        <li>
                                            <a 
                                                className="dropdown-item" 
                                                href="/student/"
                                            >Student
                                            </a>
                                        </li>
                                        <li>
                                            <a 
                                                className="dropdown-item" 
                                                href="/student/add/"
                                            >Add Student
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="card-body mt-4">
                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-people"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6>Student</h6>
                                            <span className="text-success small pt-1 fw-bold">
                                                {state.isStudentLoad ? (
                                                    <span className="spinner-border text-secondary spinner1"></span>
                                                ) : (
                                                    state.studentCount
                                                )}
                                            </span> 
                                            <span className="text-muted small pt-2 ps-1">Student(s)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-xl-6">
                            <div className="card info-card customers-card">
                                <div className="filter">
                                    <a 
                                        className="icon" 
                                        href="" 
                                        data-bs-toggle="dropdown"
                                    >
                                        <i className="bi bi-three-dots"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Option</h6>
                                        </li>

                                        <li>
                                            <a 
                                                className="dropdown-item" 
                                                href="/warden/"
                                            >Warden
                                            </a>
                                        </li>
                                        <li>
                                            <a 
                                                className="dropdown-item" 
                                                href="/warden/add/"
                                            >Add Warden
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="card-body mt-4">
                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-person-fill"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6>Warden</h6>
                                            <span className="text-success small pt-1 fw-bold">
                                                {state.isWardenLoad ? (
                                                    <span className="spinner-border text-secondary spinner1"></span>
                                                ) : (
                                                    state.wardenCount
                                                )}
                                            </span> 
                                            <span className="text-muted small pt-2 ps-1">Warden(s)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-xxl-4 col-xl-6">
                            <div className="card info-card customers-card">
                                <div className="filter">
                                    <a 
                                        className="icon" 
                                        href="#" 
                                        data-bs-toggle="dropdown"
                                    >
                                        <i className="bi bi-three-dots"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Option</h6>
                                        </li>

                                        <li>
                                            <a 
                                                className="dropdown-item" 
                                                href="/course/"
                                            >Course
                                            </a>
                                        </li>
                                        <li>
                                            <a 
                                                className="dropdown-item" 
                                                href="/course/add/"
                                            >Add Course
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="card-body mt-4">
                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-mortarboard"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6>Course</h6>
                                            <span className="text-success small pt-1 fw-bold">
                                                {state.isCourseLoad ? (
                                                    <span className="spinner-border text-secondary spinner1"></span>
                                                ) : (
                                                    state.courseCount
                                                )}
                                            </span> 
                                            <span className="text-muted small pt-2 ps-1">Course(s)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

            
                        <div className="col-12">
                            <div className="card recent-sales overflow-auto">
                                <div className="filter">
                                    <a 
                                        className="icon" 
                                        href="#" 
                                        data-bs-toggle="dropdown"
                                    >
                                        <i className="bi bi-three-dots"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>

                                        <li>
                                            <a 
                                                className="dropdown-item" 
                                                href="#"
                                            >Today
                                            </a>
                                        </li>
                                        <li>
                                            <a 
                                                className="dropdown-item" 
                                                href="#"
                                            >This Month
                                            </a>
                                        </li>
                                        <li>
                                            <a 
                                                className="dropdown-item" 
                                                href="#"
                                            >This Year
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="card-body">
                                    <h5 className="card-title">Recent Sales <span>| Today</span></h5>

                                    <table className="table table-borderless datatable">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Customer</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">
                                                    <a href="">#2457</a>
                                                </th>
                                                <td>Brandon Jacob</td>
                                                <td>
                                                    <a 
                                                        href="" 
                                                        className="text-primary"
                                                    >At praesentium minu
                                                    </a>
                                                </td>
                                                <td>$64</td>
                                                <td>
                                                    <span className="badge bg-success">Approved</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <a href="#">#2147</a>
                                                </th>
                                                <td>Bridie Kessler</td>
                                                <td>
                                                    <a 
                                                        href="#" 
                                                        className="text-primary"
                                                    >Blanditiis dolor omnis similique
                                                    </a>
                                                </td>
                                                <td>$47</td>
                                                <td>
                                                    <span className="badge bg-warning">Pending</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <a href="#">#2049</a>
                                                </th>
                                                <td>Ashleigh Langosh</td>
                                                <td>
                                                    <a 
                                                        href="#" 
                                                        className="text-primary"
                                                    >At recusandae consectetur
                                                    </a>
                                                </td>
                                                <td>$147</td>
                                                <td>
                                                    <span className="badge bg-success">Approved</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <a href="#">#2644</a>
                                                </th>
                                                <td>Angus Grady</td>
                                                <td>
                                                    <a 
                                                        href="#" 
                                                        className="text-primar"
                                                    >Ut voluptatem id earum et</a>
                                                </td>
                                                <td>$67</td>
                                                <td>
                                                    <span className="badge bg-danger">Rejected</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <a href="#">#2644</a>
                                                </th>
                                                <td>Raheem Lehner</td>
                                                <td>
                                                    <a 
                                                        href="#" 
                                                        className="text-primary"
                                                    >Sunt similique distinctio
                                                    </a>
                                                </td>
                                                <td>$165</td>
                                                <td>
                                                    <span className="badge bg-success">Approved</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card top-selling overflow-auto">
                                <div className="filter">
                                    <a 
                                        className="icon" 
                                        href="#" 
                                        data-bs-toggle="dropdown"
                                    >
                                        <i className="bi bi-three-dots"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>

                                        <li>
                                            <a 
                                                className="dropdown-item" 
                                                href="#">Today
                                            </a>
                                        </li>
                                        <li>
                                            <a 
                                                className="dropdown-item" 
                                                href="#"
                                            >This Month
                                            </a>
                                        </li>
                                        <li>
                                            <a 
                                                className="dropdown-item" 
                                                href="#"
                                            >This Year
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="card-body pb-0">
                                    <h5 className="card-title">Top Selling <span>| Today</span></h5>

                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th scope="col">Preview</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Sold</th>
                                                <th scope="col">Revenue</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">
                                                    <a href="#">
                                                        <img 
                                                            src="iassets/img/product-1.jpg" 
                                                            alt="" 
                                                        />
                                                    </a>
                                                </th>
                                                <td>
                                                    <a 
                                                        href="#" 
                                                        className="text-primary fw-bold">Ut inventore ipsa voluptas nulla
                                                    </a>
                                                </td>
                                                <td>$64</td>
                                                <td className="fw-bold">124</td>
                                                <td>$5,828</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <a href="#">
                                                        <img 
                                                            src="iassets/img/product-2.jpg" 
                                                            alt="" 
                                                        />
                                                    </a>
                                                </th>
                                                <td>
                                                    <a 
                                                        href="#" 
                                                        className="text-primary fw-bold"
                                                    >Exercitationem similique doloremque
                                                    </a>
                                                </td>
                                                <td>$46</td>
                                                <td className="fw-bold">98</td>
                                                <td>$4,508</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <a href="#">
                                                        <img 
                                                            src="iassets/img/product-3.jpg" 
                                                            alt="" 
                                                        />
                                                    </a>
                                                </th>
                                                <td>
                                                    <a 
                                                        href="#" 
                                                        className="text-primary fw-bold"
                                                    >Doloribus nisi exercitationem
                                                    </a>
                                                </td>
                                                <td>$59</td>
                                                <td className="fw-bold">74</td>
                                                <td>$4,366</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <a href="#">
                                                        <img 
                                                            src="iassets/img/product-4.jpg" 
                                                            alt=""
                                                        />
                                                    </a>
                                                </th>
                                                <td>
                                                    <a 
                                                        href="#" 
                                                        className="text-primary fw-bold"
                                                    >Officiis quaerat sint rerum error
                                                    </a>
                                                </td>
                                                <td>$32</td>
                                                <td className="fw-bold">63</td>
                                                <td>$2,016</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <a href="#">
                                                        <img 
                                                            src="iassets/img/product-5.jpg" 
                                                            alt=""
                                                        />
                                                    </a>
                                                </th>
                                                <td>
                                                    <a 
                                                        href="#" 
                                                        className="text-primary fw-bold"
                                                    >Sit unde debitis delectus repellendus
                                                    </a>
                                                </td>
                                                <td>$79</td>
                                                <td className="fw-bold">41</td>
                                                <td>$3,239</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card">
                        <div className="filter">
                        <a 
                            className="icon" 
                            href="#" 
                            data-bs-toggle="dropdown"
                        >
                            <i className="bi bi-three-dots"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                                <h6>Filter</h6>
                            </li>
                            <li>
                                <a 
                                    className="dropdown-item" 
                                    href="#"
                                >Today
                                </a>
                            </li>
                            <li>
                                <a 
                                    className="dropdown-item" 
                                    href="#"
                                >This Month
                                </a>
                            </li>
                            <li>
                                <a 
                                    className="dropdown-item" 
                                    href="#"
                                >This Year
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="card-body">
                        <h5 className="card-title">Recent Activity <span>| Today</span></h5>
                            <div className="activity">
                                <div className="activity-item d-flex">
                                    <div className="activite-label">32 min</div>
                                    <i className='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                                    <div className="activity-content">
                                        Quia quae rerum 
                                        <a 
                                            href="#" 
                                            className="fw-bold text-dark"
                                        >explicabo officiis
                                        </a> beatae
                                    </div>
                                </div>

                                <div className="activity-item d-flex">
                                    <div className="activite-label">56 min</div>
                                    <i className='bi bi-circle-fill activity-badge text-danger align-self-start'></i>
                                    <div className="activity-content">
                                        Voluptatem blanditiis blanditiis eveniet
                                    </div>
                                </div>

                                <div className="activity-item d-flex">
                                    <div className="activite-label">2 hrs</div>
                                    <i className='bi bi-circle-fill activity-badge text-primary align-self-start'></i>
                                    <div className="activity-content">
                                        Voluptates corrupti molestias voluptatem
                                    </div>
                                </div>

                                <div className="activity-item d-flex">
                                    <div className="activite-label">1 day</div>
                                    <i className='bi bi-circle-fill activity-badge text-info align-self-start'></i>
                                    <div className="activity-content">
                                        Tempore autem saepe 
                                        <a 
                                            href="#" 
                                            className="fw-bold text-dark"
                                        >occaecati voluptatem
                                        </a> tempore
                                    </div>
                                </div>

                                <div className="activity-item d-flex">
                                    <div className="activite-label">2 days</div>
                                    <i className='bi bi-circle-fill activity-badge text-warning align-self-start'></i>
                                    <div className="activity-content">
                                        Est sit eum reiciendis exercitationem
                                    </div>
                                </div>

                                <div className="activity-item d-flex">
                                    <div className="activite-label">4 weeks</div>
                                    <i className='bi bi-circle-fill activity-badge text-muted align-self-start'></i>
                                    <div className="activity-content">
                                        Dicta dolorem harum nulla eius. Ut quidem quidem sit quas
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="filter">
                            <a 
                                className="icon" 
                                href="#" 
                                data-bs-toggle="dropdown"
                            >
                                <i className="bi bi-three-dots"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <li className="dropdown-header text-start">
                                    <h6>Filter</h6>
                                </li>
                                <li>
                                    <a 
                                        className="dropdown-item" 
                                        href="#">Today
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        className="dropdown-item" 
                                        href="#">This Month
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        className="dropdown-item" 
                                        href="#">This Year
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="card-body pb-0">
                            <h5 className="card-title">Budget Report <span>| This Month</span></h5>
                            <div 
                                id="budgetChart" 
                                style={{minheight: '400px'}}
                                className="echart"
                            >
                            </div>
                        </div>
                    </div>

                    
                    <div className="card">
                        <div className="filter">
                            <a 
                                className="icon"
                                href="#" 
                                data-bs-toggle="dropdown"
                            >
                                <i className="bi bi-three-dots"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <li className="dropdown-header text-start">
                                    <h6>Filter</h6>
                                </li>
                                <li>
                                    <a 
                                        className="dropdown-item" 
                                        href="#">Today
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        className="dropdown-item" 
                                        href="#">This Month
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        className="dropdown-item" 
                                        href="#">This Year
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body pb-0">
                            <h5 className="card-title">Website Traffic <span>| Today</span></h5>

                            <div 
                                id="trafficChart" 
                                style={{minheight: '400px'}}
                                className="echart">
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="filter">
                            <a 
                                className="icon" 
                                href="#" 
                                data-bs-toggle="dropdown"
                            >
                                <i className="bi bi-three-dots"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <li className="dropdown-header text-start">
                                    <h6>Filter</h6>
                                </li>
                                <li>
                                    <a 
                                        className="dropdown-item" 
                                        href="#">Today
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        className="dropdown-item" 
                                        href="#"
                                        >This Month
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        className="dropdown-item" 
                                        href="#">This Year
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="card-body pb-0">
                            <h5 className="card-title">News &amp; Updates <span>| Today</span></h5>
                            <div className="news">
                                <div className="post-item clearfix">
                                    <img 
                                        src="iassets/img/news-1.jpg" 
                                        alt="" 
                                    />
                                    <h4>
                                        <a href="#">Nihil blanditiis at in nihil autem</a>
                                    </h4>
                                    <p>Sit recusandae non aspernatur laboriosam. Quia enim eligendi sed ut harum...</p>
                                </div>

                                <div className="post-item clearfix">
                                    <img 
                                        src="iassets/img/news-2.jpg" 
                                        alt="" 
                                    />
                                    <h4>
                                        <a href="#">Quidem autem et impedit</a>
                                    </h4>
                                    <p>Illo nemo neque maiores vitae officiis cum eum turos elan dries werona nande...</p>
                                </div>

                                <div className="post-item clearfix">
                                    <img 
                                        src="iassets/img/news-3.jpg" 
                                        alt="" 
                                    />
                                    <h4>
                                        <a href="#">Id quia et et ut maxime similique occaecati ut</a>
                                    </h4>
                                    <p>Fugiat voluptas vero eaque accusantium eos. Consequuntur sed ipsam et totam...</p>
                                </div>

                                <div className="post-item clearfix">
                                    <img 
                                        src="iassets/img/news-4.jpg" 
                                        alt="" 
                                    />
                                    <h4>
                                        <a href="#">Laborum corporis quo dara net para</a>
                                    </h4>
                                    <p>Qui enim quia optio. Eligendi aut asperiores enim repellendusvel rerum cuder...</p>
                                </div>

                                <div className="post-item clearfix">
                                    <img 
                                        src="iassets/img/news-5.jpg" 
                                        alt="" 
                                    />
                                    <h4>
                                        <a href="#">Et dolores corrupti quae illo quod dolor</a>
                                    </h4>
                                    <p>Odit ut eveniet modi reiciendis. Atque cupiditate libero beatae dignissimos eius...</p>
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

export default Home