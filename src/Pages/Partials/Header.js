import { useState, useEffect } from "react"
import { useAuth } from "../AuthContext"
import { Link, useNavigate } from "react-router-dom" 
import { logout } from "../StudentLogin/Api"
import { studentAppUrl, wardenAppUrl } from "../../config"

function Header() {
    const [showBackToTop, setShowBackToTop] = useState(false)
    const { 
        userLogout, 
        studentDetails, 
        wardenDetails 
    } = useAuth() 
    const navigate = useNavigate()
    
    const [details, setDetails] = useState(wardenDetails?.role === "warden" ? wardenDetails : studentDetails)
    const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
        if (wardenDetails?.role === "warden") {
            setImageUrl(`${wardenAppUrl}/api/warden/${wardenDetails.wardenId}/avatar?date=${Date.now()}`)
        } else if (studentDetails) {
            setImageUrl(`${studentAppUrl}/student/api/student/image?date=${Date.now()}`)
        }
    }, [wardenDetails, studentDetails])

    useEffect(() => {
        setDetails(wardenDetails?.role === "warden" ? wardenDetails : studentDetails)
    }, [wardenDetails, studentDetails])

    const logoutHandler = async (role) => {
        try {
            const { response, error } = await logout(role)
            if  (error) {
                alert(error)
                return
            }

            if (response.status === 401) {
                sessionStorage.clear()
                userLogout(role)
                navigate(role === "warden" ? "/login/" : "/student/login/")
            }

            if (response && response.ok) {
                sessionStorage.clear()
                userLogout(role)
                navigate(role === "warden" ? "/login/" : "/student/login/")
            }
        } catch (error) {
            alert('Something went wrong.Please try later.')
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 200)
        }

        window.addEventListener("scroll", handleScroll)  
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const SidebarToggle = () => {
        const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    
        const toggleSidebar = () => {
            setIsSidebarOpen(!isSidebarOpen)
            document.body.classList.toggle("toggle-sidebar", !isSidebarOpen)
        }
    
        return (
            <i className="bi bi-list toggle-sidebar-btn" onClick={toggleSidebar}></i>
        )
    }
    
    return (
    <>
        <header 
            id="header" 
            className="header fixed-top d-flex align-items-center"  
        >

        <div className="d-flex align-items-center justify-content-between">
            <a 
                href="/home/" 
                className="logo d-flex align-items-center"
            >
                <img 
                    src="/assets/img/logo.png" 
                    alt=""
                />
                <span className="d-none d-lg-block">Hostel</span>
            </a>
            <SidebarToggle />
        </div>

        <div className="search-bar">
            <form 
                className="search-form d-flex align-items-center" 
                method="" 
                action="#"
            >
            <input 
                type="text" 
                name="query" 
                placeholder="Search" 
                title="Enter search keyword"
            />
            <button 
                type="button" 
                title="Search"
            >
                <i className="bi bi-search"></i>
            </button>
            </form>
        </div>
        <nav className="header-nav ms-auto">
            <ul className="d-flex align-items-center">

                <li className="nav-item d-block d-lg-none">
                    <a 
                        className="nav-link nav-icon search-bar-toggle" 
                        href="#"
                    >
                        <i className="bi bi-search"></i>
                    </a>
                </li>

                <li className="nav-item dropdown">
                    <a 
                        className="nav-link nav-icon" 
                        href="#" 
                        data-bs-toggle="dropdown"
                    >
                        <i className="bi bi-bell"></i>
                        <span className="badge bg-primary badge-number">4</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                        <li className="dropdown-header">
                            You have 4 new notifications
                            <a href="#">
                                <span className="badge rounded-pill bg-primary p-2 ms-2">View all</span>
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>

                        <li className="notification-item">
                            <i className="bi bi-exclamation-circle text-warning"></i>
                            <div>
                                <h4>Lorem Ipsum</h4>
                                <p>Quae dolorem earum veritatis oditseno</p>
                                <p>30 min. ago</p>
                            </div>
                        </li>

                        <li>
                            <hr className="dropdown-divider" />
                        </li>

                        <li className="notification-item">
                            <i className="bi bi-x-circle text-danger"></i>
                            <div>
                                <h4>Atque rerum nesciunt</h4>
                                <p>Quae dolorem earum veritatis oditseno</p>
                                <p>1 hr. ago</p>
                            </div>
                        </li>

                        <li>
                            <hr className="dropdown-divider" />
                        </li>

                        <li className="notification-item">
                            <i className="bi bi-check-circle text-success"></i>
                            <div>
                                <h4>Sit rerum fuga</h4>
                                <p>Quae dolorem earum veritatis oditseno</p>
                                <p>2 hrs. ago</p>
                            </div>
                        </li>

                        <li>
                            <hr className="dropdown-divider" />
                        </li>

                        <li className="notification-item">
                            <i className="bi bi-info-circle text-primary"></i>
                            <div>
                                <h4>Dicta reprehenderit</h4>
                                <p>Quae dolorem earum veritatis oditseno</p>
                                <p>4 hrs. ago</p>
                            </div>
                        </li>

                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li className="dropdown-footer">
                            <a href="#">Show all notifications</a>
                        </li>
                    </ul>
                </li>

                <li className="nav-item dropdown">
                    <a 
                        className="nav-link nav-icon" 
                        href="#" 
                        data-bs-toggle="dropdown"
                    >
                        <i className="bi bi-chat-left-text"></i>
                        <span className="badge bg-success badge-number">3</span>
                    </a>

                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                        <li className="dropdown-header">
                            You have 3 new messages
                            <a href="#">
                                <span className="badge rounded-pill bg-primary p-2 ms-2">View all</span>
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>

                        <li className="message-item">
                            <a href="#">
                            <img 
                                src="/assets/img/messages-1.jpg" 
                                alt="" 
                                className="rounded-circle"
                            />
                            <div>
                                <h4>Maria Hudson</h4>
                                <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                <p>4 hrs. ago</p>
                            </div>
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>

                        <li className="message-item">
                            <a href="#">
                            <img 
                                src="/assets/img/messages-2.jpg" 
                                alt="" 
                                className="rounded-circle" 
                            />
                            <div>
                                <h4>Anna Nelson</h4>
                                <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                <p>6 hrs. ago</p>
                            </div>
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>

                        <li className="message-item">
                            <a href="#">
                                <img 
                                    src="/assets/img/messages-3.jpg" 
                                    alt="" 
                                    className="rounded-circle" 
                                />
                                <div>
                                    <h4>David Muldon</h4>
                                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                    <p>8 hrs. ago</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>

                        <li className="dropdown-footer">
                            <a href="#">Show all messages</a>
                        </li>
                    </ul>
                </li>

                <li className="nav-item dropdown pe-3">
                    <a 
                        className="nav-link nav-profile d-flex align-items-center pe-0" 
                        href="#" 
                        data-bs-toggle="dropdown"
                    >
                        <img 
                            src={imageUrl} 
                            alt="Profile" 
                            className="rounded-circle" 
                        />
                        <span className="d-none d-md-block dropdown-toggle ps-2 upperCase">
                            {details.role === "warden" ? `${details.firstName}${details.lastName}` : details.name }
                        </span>
                    </a>

                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                        <li className="dropdown-header">
                            <h6 className="upperCase">
                                {details.role === "warden" ? `${details.firstName}${details.lastName}`: details.name}
                            </h6>
                            <span>{details.superAdmin === 1 
                                ? "Admin" 
                                : details.role === "warden" 
                                    ? "Warden" 
                                    : "Student"}</span>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>

                        <li>
                            <Link 
                                className="dropdown-item d-flex align-items-center" 
                                to={details.role === 'warden' ? "/warden/details/" : "/student/details/"}
                            >
                                <i className="bi bi-person"></i>
                                <span>User Details</span>
                            </Link>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        {details.role === "warden" && (
                            <>                        
                            <li>
                            <Link 
                                className="dropdown-item d-flex align-items-center" 
                                to="/faq/"
                            >
                                <i className="bi bi-question-circle"></i>
                                <span>Need Help?</span>
                            </Link>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        </>

                            )}
                        <li>
                        <Link 
                            onClick={() => {
                                logoutHandler(details.role === "warden" ? "warden" : "student")
                            }}
                            className="dropdown-item d-flex align-items-center"
                        >
                            <i className="bi bi-box-arrow-right"></i>
                            <span>Sign Out</span>
                        </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        </header>
        {showBackToTop && (
            <a 
                className="back-to-top d-flex align-items-center justify-content-center active" 
                onClick={scrollToTop}
            >
                <i className="bi bi-arrow-up-short"></i>
            </a>
        )}
    </>
    )
}

export default Header