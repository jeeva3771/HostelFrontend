import { Link } from 'react-router-dom'

const mainMenu = [
    { name: 'Attendance Report', url: '/student/report/', icon: 'bi bi-card-list'},
    { name: 'Pages', url: false, icon: false },
    { name: 'Student', url: '/student/details/', icon: 'bi bi-person' },
]

const Sidebar = ({ activeMenu }) => {
    return (
        <aside 
            id="sidebar" 
            className="sidebar"
        >
            <ul 
                className="sidebar-nav" 
                id="sidebar-nav"
            >
                {mainMenu.map((item) => (
                    item.url ? 
                    <li>
                        <Link 
                            to={item.url} 
                            className={`nav-link ${ activeMenu === item.name ? 'active' : 'collapsed'}`}>
                            <i className={item.icon}></i>
                            <span>{item.name}</span>
                        </Link>
                    </li> : <li className="nav-heading">{item.name}</li>
                ))}
            </ul>
        </aside>
    )
}

export default Sidebar