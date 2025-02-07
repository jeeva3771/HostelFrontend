import { Link } from "react-router-dom"

const Breadcrumbs = ({breadcrumb}) => {
    return (
    <nav>
        <ol className="breadcrumb">
            {breadcrumb.map((item, index) => (    
                <li 
                    key={index}  
                    className={`breadcrumb-item ${index === breadcrumb.length - 1 ? 'active' : ''}`}>
                    {index === breadcrumb.length - 1 ? (
                        item.name 
                    ) : (
                        <Link to={item.link}>{item.name}</Link> 
                    )}
                </li>
            ))}
        </ol>
    </nav>
    )
}

export default Breadcrumbs