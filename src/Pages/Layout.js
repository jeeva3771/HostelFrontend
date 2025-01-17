import { Outlet, Link } from "react-router-dom"
function Layout() {
    return (
      <>
        <nav>
          <ul>
            <li>
              <Link to="/student/login/">Student Login</Link>
            </li>
          </ul>
        </nav>
  
        <Outlet />
      </>

    )
}

export default Layout
