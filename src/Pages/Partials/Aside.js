import { Link } from 'react-router-dom'
const Siderbar = ({ activeMenu }) => {
    const mainMenu = [
        { name: 'Attendance Report', url: '/student/report/', icon: 'bi bi-card-list'},
        { name: 'Student', url: '/student/details/', icon: 'bi bi-person' },
    ]

    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                {mainMenu.map((item) => (
                <>
                    {item.name === 'Student' && <li className="nav-heading">Pages</li>}
                    <li>
                        <Link to={item.url} className={`nav-link ${ 
                            activeMenu === item.name ? 'active' : 'collapsed'}`}>
                            <i className={item.icon}></i>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                </>
                ))}
            </ul>
        </aside>
    )
}

export default Siderbar