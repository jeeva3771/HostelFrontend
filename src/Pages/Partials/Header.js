import { useState, useEffect } from "react"
import { useAuth } from "../AuthContext"
import { Link, useNavigate } from "react-router-dom" 
import { logout } from "../StudentLogin/Api"
import { studentAppUrl, wardenAppUrl } from "../../config"

function Header() {
    const [showBackToTop, setShowBackToTop] = useState(false)
    const [details, setDetails] = useState({
        image: '',
        role: ''
    })
    const { userLogout } = useAuth() 
    
    useEffect(() => {
        let auth = ''
        let wardenId = ''
        let parsedStudent = null
        let parsedWarden = null
        
        try {
            const studentData = localStorage.getItem("studentDetails")
            if (studentData) {
                parsedStudent = JSON.parse(studentData)
                if (parsedStudent.role) {
                    auth = parsedStudent.role
                }
            }

            const wardenData = localStorage.getItem("wardenDetails")
            if (wardenData) {
                parsedWarden = JSON.parse(wardenData)
                if (parsedWarden.role) {
                    auth = parsedWarden.role
                    wardenId = parsedWarden.wardenId
                }
            }
        } catch (error) {
            console.error("Error parsing local storage data:", error)
        }

        const imageUrl = auth === "warden"
            ? `${wardenAppUrl}/api/warden/${wardenId}/avatar?date=${Date.now()}`
            : `${studentAppUrl}/api/student/image?date=${Date.now()}`

        setDetails({
            image: imageUrl,
            role: auth === "warden" ? "warden" : "student",
            studentInfo: parsedStudent,
            wardenInfo: parsedWarden
        })
    }, [])

    const navigate = useNavigate()

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
            class="header fixed-top d-flex align-items-center"  
        >

        <div class="d-flex align-items-center justify-content-between">
            <a 
                href="/home/" 
                class="logo d-flex align-items-center"
            >
                <img 
                    src="/assets/img/logo.png" 
                    alt=""
                />
                <span class="d-none d-lg-block">Hostel</span>
            </a>
            <SidebarToggle />
        </div>

        <div class="search-bar">
            <form 
                class="search-form d-flex align-items-center" 
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
                <i class="bi bi-search"></i>
            </button>
            </form>
        </div>
        <nav class="header-nav ms-auto">
            <ul class="d-flex align-items-center">

                <li class="nav-item d-block d-lg-none">
                    <a 
                        class="nav-link nav-icon search-bar-toggle" 
                        href="#"
                    >
                        <i class="bi bi-search"></i>
                    </a>
                </li>

                <li class="nav-item dropdown">
                    <a 
                        class="nav-link nav-icon" 
                        href="#" 
                        data-bs-toggle="dropdown"
                    >
                        <i class="bi bi-bell"></i>
                        <span class="badge bg-primary badge-number">4</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                        <li class="dropdown-header">
                            You have 4 new notifications
                            <a href="#">
                                <span class="badge rounded-pill bg-primary p-2 ms-2">View all</span>
                            </a>
                        </li>
                        <li>
                            <hr class="dropdown-divider" />
                        </li>

                        <li class="notification-item">
                            <i class="bi bi-exclamation-circle text-warning"></i>
                            <div>
                                <h4>Lorem Ipsum</h4>
                                <p>Quae dolorem earum veritatis oditseno</p>
                                <p>30 min. ago</p>
                            </div>
                        </li>

                        <li>
                            <hr class="dropdown-divider" />
                        </li>

                        <li class="notification-item">
                            <i class="bi bi-x-circle text-danger"></i>
                            <div>
                                <h4>Atque rerum nesciunt</h4>
                                <p>Quae dolorem earum veritatis oditseno</p>
                                <p>1 hr. ago</p>
                            </div>
                        </li>

                        <li>
                            <hr class="dropdown-divider" />
                        </li>

                        <li class="notification-item">
                            <i class="bi bi-check-circle text-success"></i>
                            <div>
                                <h4>Sit rerum fuga</h4>
                                <p>Quae dolorem earum veritatis oditseno</p>
                                <p>2 hrs. ago</p>
                            </div>
                        </li>

                        <li>
                            <hr class="dropdown-divider" />
                        </li>

                        <li class="notification-item">
                            <i class="bi bi-info-circle text-primary"></i>
                            <div>
                                <h4>Dicta reprehenderit</h4>
                                <p>Quae dolorem earum veritatis oditseno</p>
                                <p>4 hrs. ago</p>
                            </div>
                        </li>

                        <li>
                            <hr class="dropdown-divider" />
                        </li>
                        <li class="dropdown-footer">
                            <a href="#">Show all notifications</a>
                        </li>
                    </ul>
                </li>

                <li class="nav-item dropdown">
                    <a 
                        class="nav-link nav-icon" 
                        href="#" 
                        data-bs-toggle="dropdown"
                    >
                        <i class="bi bi-chat-left-text"></i>
                        <span class="badge bg-success badge-number">3</span>
                    </a>

                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                        <li class="dropdown-header">
                            You have 3 new messages
                            <a href="#">
                                <span class="badge rounded-pill bg-primary p-2 ms-2">View all</span>
                            </a>
                        </li>
                        <li>
                            <hr class="dropdown-divider" />
                        </li>

                        <li class="message-item">
                            <a href="#">
                            <img 
                                src="/assets/img/messages-1.jpg" 
                                alt="" 
                                class="rounded-circle"
                            />
                            <div>
                                <h4>Maria Hudson</h4>
                                <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                <p>4 hrs. ago</p>
                            </div>
                            </a>
                        </li>
                        <li>
                            <hr class="dropdown-divider" />
                        </li>

                        <li class="message-item">
                            <a href="#">
                            <img 
                                src="/assets/img/messages-2.jpg" 
                                alt="" 
                                class="rounded-circle" 
                            />
                            <div>
                                <h4>Anna Nelson</h4>
                                <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                <p>6 hrs. ago</p>
                            </div>
                            </a>
                        </li>
                        <li>
                            <hr class="dropdown-divider" />
                        </li>

                        <li class="message-item">
                            <a href="#">
                                <img 
                                    src="/assets/img/messages-3.jpg" 
                                    alt="" 
                                    class="rounded-circle" 
                                />
                                <div>
                                    <h4>David Muldon</h4>
                                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                    <p>8 hrs. ago</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <hr class="dropdown-divider" />
                        </li>

                        <li class="dropdown-footer">
                            <a href="#">Show all messages</a>
                        </li>
                    </ul>
                </li>

                <li class="nav-item dropdown pe-3">
                    <a 
                        class="nav-link nav-profile d-flex align-items-center pe-0" 
                        href="#" 
                        data-bs-toggle="dropdown"
                    >
                        <img 
                            src={details.image} 
                            alt="Profile" 
                            class="rounded-circle" 
                        />
                        <span class="d-none d-md-block dropdown-toggle ps-2 upperCase">
                            {details.role === "warden" ? `${details.wardenInfo.firstName}${details.wardenInfo?.lastName}` : details.studentInfo?.name }
                        </span>
                    </a>

                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                        <li class="dropdown-header">
                            <h6 className="upperCase">{details.role === "warden" ? `${details.wardenInfo.firstName}${details.wardenInfo?.lastName}`: details.studentInfo?.name}</h6>
                            <span>{details.role === "warden" ? "Warden" : "Student"}</span>
                        </li>
                        <li>
                            <hr class="dropdown-divider" />
                        </li>

                        <li>
                            <a 
                                class="dropdown-item d-flex align-items-center" 
                                href="/warden/details/"
                            >
                                <i class="bi bi-person"></i>
                                <span>User Details</span>
                            </a>
                        </li>
                        <li>
                            <hr class="dropdown-divider" />
                        </li>

                        <li>
                            <a 
                                class="dropdown-item d-flex align-items-center" 
                                href="/faq/"
                            >
                                <i class="bi bi-question-circle"></i>
                                <span>Need Help?</span>
                            </a>
                        </li>
                        <li>
                            <hr class="dropdown-divider" />
                        </li>

                        <li>
                        <Link 
                            onClick={() => {
                                logoutHandler(details.role === "warden" ? "warden" : "student")
                            }}
                            className="dropdown-item d-flex align-items-center"
                        >
                            <i class="bi bi-box-arrow-right"></i>
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