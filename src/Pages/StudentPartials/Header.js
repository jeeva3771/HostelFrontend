import { useStudentAuth } from "../StudentLogin/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { studentAppUrl } from '../../config/index'
import { logout } from '../StudentLogin/Api'

function Header() {
    const { setStudentLogout, studentDetails } = useStudentAuth()  
    const navigate = useNavigate()

    const logoutHandler = async () => {
      try {
        const { response, error } = await logout()
        if  (error) {
          alert(error)
          return
        }

        if (response && response.ok) {
          sessionStorage.clear()
          setStudentLogout()
          navigate('/student/login/')
        }
      } catch (error) {
        alert('Something went wrong.Please try later.')
      }
    }
    
    return (
      <header 
        id="header" 
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link 
            to="/student/report/" 
            className="logo d-flex align-items-center"
          >
            <img src="/assets/img/logo.png" />
            <span className="d-none d-lg-block">Hostel</span>
          </Link>
          <i className="bi bi-list toggle-sidebar-btn"></i>
        </div>
        
        <div className="search-bar">
          <form className="search-form d-flex align-items-center">
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
              <button className="nav-link nav-icon search-bar-toggle">
                <i className="bi bi-search"></i>
              </button>
            </li>
        
            <li className="nav-item dropdown">
        
              <button
                className="nav-link nav-icon" 
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">4</span>
              </button>
        
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  You have 4 new notifications
                  <button><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></button>
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
                  <button>Show all notifications</button>
                </li>
        
              </ul>
        
            </li>
        
            <li className="nav-item dropdown">
        
              <button
                className="nav-link nav-icon" 
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-chat-left-text"></i>
                <span className="badge bg-success badge-number">3</span>
              </button>
        
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                  You have 3 new messages
                  <button><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
        
                <li className="message-item">
                  <button>
                    <img 
                      src="/assets/img/messages-1.jpg"
                      className="rounded-circle" />
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                      <p>4 hrs. ago</p>
                    </div>
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
        
                <li className="message-item">
                  <button>
                    <img
                        src="/assets/img/messages-2.jpg"
                        className="rounded-circle" />
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                      <p>6 hrs. ago</p>
                    </div>
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
        
                <li className="message-item">
                  <button>
                    <img 
                      src="/assets/img/messages-3.jpg" 
                      className="rounded-circle" 
                    />
                    <div>
                      <h4>David Muldon</h4>
                      <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                      <p>8 hrs. ago</p>
                    </div>
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
        
                <li className="dropdown-footer">
                  <button>Show all messages</button>
                </li>
        
              </ul>
        
            </li>
        
            <li className="nav-item dropdown pe-3">
        
              <button
                className="nav-link nav-profile d-flex align-items-center pe-0" 
                data-bs-toggle="dropdown">
                <img 
                  src={`${studentAppUrl}/api/student/image?date=${Date.now()}`} 
                  alt="Profile" 
                  className="rounded-circle"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2 upperCase">
                  {studentDetails.name}
                </span>
              </button>
        
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6 className="upperCase">{studentDetails.name}</h6>
                  <span>Student</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link 
                    to="/student/details/" 
                    className="dropdown-item d-flex align-items-center"
                  >
                      <i className="bi bi-person"></i>
                      <span>Student Details</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link 
                    onClick={() => {
                      logoutHandler()
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
    )
}

export default Header