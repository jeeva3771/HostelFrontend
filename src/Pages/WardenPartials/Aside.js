import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const mainMenu = [
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

const Sidebar = () => {
  const location = useLocation()
  const [activeMenu, setActiveMenu] = useState(null)

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName)
  }

  return (
    <aside 
        id="sidebar" 
        className="sidebar"
    >
      <ul 
        className="sidebar-nav" 
        id="sidebar-nav"
      >
        {mainMenu.map((item, index) => (
          <li 
            key={index} 
            className="nav-item"
        >
            {item.children ? (
              <>
                <button
                  className={`nav-link ${activeMenu === item.name ? "" : "collapsed"}`}
                  onClick={() => toggleMenu(item.name)}
                >
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                  <i className="bi bi-chevron-down ms-auto"></i>
                </button>
                <ul
                  className={`nav-content collapse ${activeMenu === item.name ? "show" : ""}`}
                  id={`${item.name.toLowerCase().replace(/\s+/g, "-")}-nav`}
                >
                  {item.children.map((child, childIndex) => (
                    <li key={childIndex}>
                      <Link
                        to={child.url}
                        className={`nav-link ${
                          location.pathname.includes(child.url) ? "active" : ""
                        }`}
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
                  location.pathname.includes(item.url) ? "active" : "collapsed"
                }`}
              >
                <i className={item.icon}></i>
                <span>{item.name}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
