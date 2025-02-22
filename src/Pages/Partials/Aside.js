import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {
  const location = useLocation()
  const [activeMenu, setActiveMenu] = useState(null)
  const [mainMenu, setMainMenu] = useState([])

  useEffect(() => {
    let role = "";
    let studentDetails = localStorage.getItem("studentDetails")
    let wardenDetails = localStorage.getItem("wardenDetails")

    try {
      if (studentDetails) {
        const parsedStudent = JSON.parse(studentDetails)
        if (parsedStudent.role) {
          role = parsedStudent.role
        }
      }

      if (!role && wardenDetails) {
        const parsedWarden = JSON.parse(wardenDetails)
        if (parsedWarden.role) {
          role = parsedWarden.role
        }
      }
    } catch (error) {
        alert('Something went wrong.Please try later')
    }

    const wardenMenu = [
      { name: "Dashboard", url: "/home/", icon: "bi bi-grid" },
      { name: "Attendance", url: "/attendance/", icon: "bi bi-card-checklist" },
      { name: "Student", url: "/student/", icon: "bi bi-people" },
      { name: "Warden", url: "/warden/", icon: "bi bi-person-fill" },
      {
        name: "Structure",
        icon: "bi bi-layout-text-window-reverse",
        children: [
          { name: "Block", url: "/block/" },
          { name: "Block Floor", url: "/blockfloor/" },
          { name: "Room", url: "/room/" },
        ],
      },
      {
        name: "Others",
        icon: "bi bi-grid-3x3-gap",
        children: [{ name: "Course", url: "/course/" }],
      },
      { name: "User", url: "/warden/details/", icon: "bi bi-person" },
      { name: "F.A.Q", url: "/faq/", icon: "bi bi-question-circle" },
      { name: "Contact", url: "/contact/", icon: "bi bi-envelope" },
    ]

    const studentMenu = [
      { name: "Attendance Report", url: "/student/report/", icon: "bi bi-card-list" },
      { name: "Student", url: "/student/details/", icon: "bi bi-person" }
    ]

    setMainMenu(role === "warden" ? wardenMenu : studentMenu);
  }, [])

  const toggleMenu = (menuName) => {
    setActiveMenu((prevMenu) => (prevMenu === menuName ? null : menuName))
  }

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {mainMenu.map((item, index) => {
          const isChildActive =
            item.children &&
            item.children.some((child) => location.pathname.startsWith(child.url));
          const isOpen = activeMenu === item.name || isChildActive;

          return (
            <li key={index} className="nav-item">
              {item.children ? (
                <>
                  <a
                    className={`nav-link ${isOpen ? "" : "collapsed"}`}
                    onClick={() => toggleMenu(item.name)}
                    style={{ cursor: "pointer", transition: "0.3s ease" }}
                  >
                    <i className={item.icon}></i>
                    <span>{item.name}</span>
                    <i className="bi bi-chevron-down ms-auto"></i>
                  </a>
                  <ul
                    className="nav-content"
                    style={{
                      maxHeight: isOpen ? "500px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.4s ease-in-out",
                    }}
                  >
                    {item.children.map((child, childIndex) => (
                      <li key={childIndex}>
                        <Link
                          to={child.url}
                          className={`nav-link ${
                            location.pathname.startsWith(child.url) ? "active" : ""
                          }`}
                          style={{ transition: "0.2s ease" }}
                        >
                          <i className="bi bi-circle"></i>
                          <span>{child.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                    to={item.url}
                    className={`nav-link ${
                      location.pathname === item.url ? "active" : "collapsed"
                    }`}
                    style={{ transition: "0.2s ease" }}
                  >
                    <i className={item.icon}></i>
                    <span>{item.name}</span>
                  </Link>
              )}
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default Sidebar
