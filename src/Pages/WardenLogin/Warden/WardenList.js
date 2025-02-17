import { useState, useRef, useEffect } from "react"
import Sidebar from "../../Partials/Aside"
import Breadcrumbs from "../../Partials/BreadCrumb"
import Footer from "../../Partials/Footer"
import Header from "../../Partials/Header"
import { Link, useNavigate } from "react-router-dom"
import Pagination from "../Pagination"
import DetailsModal from "../Modal"
import { 
    readWardens, 
    readWardenById, 
    deleteWardenById    
} from "../Api"
import { wardenAppUrl } from "../../../config"

function WardenList() {
    const [wardens, setWardens] = useState([])
    const [wardenImages, setWardenImages] = useState({})
    const [pageNo, setPageNo] = useState(1)
    const [wardenCount, setWardenCount] = useState(0)
    const [limit, setLimit] = useState(10)
    const [searchText, setSearchText] = useState("")
    const [loading, setLoading] = useState(false)
    const [sortColumn, setSortColumn] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState("DESC")
    const [wardenById, setWardenById] = useState({})
    const modalRef = useRef(null)
    const navigate = useNavigate()
    const totalPages = Math.ceil(wardenCount / limit)

    const breadcrumbData = [
        { name: 'Home', link: '/home/' },
        { name: 'Warden', link: '/warden/' }
    ]
    const defaultColumn = [
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'superAdmin', label: 'Admin' },
        { key: 'createdBy', label: 'Created By' }
    ]

    useEffect(() => {
        document.title = "Warden List"
    }, [])

    useEffect(() => {
        handleReadWardens()
    }, [pageNo, limit, searchText, sortColumn, sortOrder])

    const handleReadWardens = async () => {
        try {
            setLoading(true)
            const { response, error } = await readWardens(limit, pageNo, sortColumn, sortOrder, searchText || '')
            if (error) {
                alert(error)
                return
            }
            const { wardens, wardenCount } = await response.json()
            setWardens(wardens || [])
            setWardenCount(wardenCount || 0)
            const images = {}
            wardens.forEach(warden => {
                images[warden.wardenId] = `${wardenAppUrl}/api/warden/${warden.wardenId}/avatar?date=${Date.now()}`
            })
            setWardenImages(images)
        } catch (error) {
            alert('Something went wrong.Please try later')
        } finally {
            setLoading(false)
        }
    }

    const handleReadWardenById = async (wardenId) => {
        try {
            const { response, error } = await readWardenById(wardenId)
            if (error) {
                alert(error)
                return
            }
            
            if (response.ok) {
                const wardenData = await response.json()
                setWardenById(wardenData)
                modalRef.current?.openModal(wardenById, "warden")
            } else {    
                alert(await response.text())
            }
        } catch (error) {
            alert('Something went wrong.Please try later')
        }
    }

    const handleDeleteWardenById = async (wardenId) => {
        try {
            var validateDelete = window.confirm('Are you sure you want to delete?')

            if (!validateDelete)
                return

            const { response, error } = await deleteWardenById(wardenId)
            if (error) {
                alert(error)
                return
            }
            
            if (response.ok) {
                alert('Successfully deleted!')
                handleReadWardens()
            } else {
                alert(await response.text())
            }
            
        } catch (error) {
            alert('Something went wrong.Please try later')
        }
    }
    
    const handleSort = (column) => {
        const newSortOrder = sortColumn === column && sortOrder === "ASC" ? "DESC" : "ASC"
        setSortColumn(column)
        setSortOrder(newSortOrder)
    }

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPageNo(newPage)
        }
    }
    
    return (
        <>
            <Header />
            <Sidebar />
            <main id="main">
                <div className="pagetitle">
                    <h1>Warden List</h1>
                    <Breadcrumbs breadcrumb={breadcrumbData} />
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="datatable-top mt-4">
                                        <div className="datatable-search d-flex justify-content-between align-items-center">                                   
                                            <div className="d-flex gap-2">
                                                <div className="datatable-search">
                                                    <input 
                                                        className="datatable-input" 
                                                        placeholder="Search..." 
                                                        type="search" 
                                                        value={searchText} 
                                                        onChange={(e) => setSearchText(e.target.value)}
                                                    />
                                                </div>
                                                <div className="datatable-dropdown">
                                                    <select 
                                                        className="datatable-selector" 
                                                        onChange={(e) => setLimit(Number(e.target.value))} 
                                                        value={limit}
                                                    >
                                                        <option value="5">5</option>
                                                        <option value="10">10</option>
                                                        <option value="15">15</option>
                                                        <option value="-1">All</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <Link 
                                                to="/warden/add/" 
                                                className="btn btn-primary"
                                            >Add
                                            </Link>
                                        </div>
                                    </div>
                                    <table className="table table-striped table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Sno</th>
                                                <th>Profile</th>
                                                {defaultColumn.map(({ key, label }) => (
                                                    <th key={key} onClick={() => handleSort(key)}>
                                                        {label}
                                                        {sortColumn === key ? (sortOrder === "ASC" ? " 🔼" : " 🔽") : ""}
                                                    </th>
                                                ))}
                                                <th>Action</th>
                                            </tr>
                                        </thead>    
                                        <tbody>
                                            {loading ? (
                                                <tr>
                                                    <td 
                                                        colSpan="7" 
                                                        className="text-center"
                                                    >Loading...
                                                    </td>
                                                </tr>
                                            ) : wardens.length > 0 ? (
                                                wardens.map((warden, index) => (
                                                    <tr key={index}>
                                                        <td>{(pageNo - 1) * limit + index + 1}</td>
                                                        <td>
                                                            <img 
                                                                src={wardenImages[warden.wardenId]} 
                                                                alt="Profile" 
                                                                className="rounded-circle imageSizing me-2"
                                                            />
                                                        </td>
                                                        <td>{warden.firstName}</td>
                                                        <td>{warden.lastName}</td>
                                                        <td>{warden.superAdmin === 1 ? 'Admin' : ''}</td>
                                                        <td>{warden.createdFirstName}{warden.createdLastName}</td>
                                                        <td>
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                fill="currentColor" 
                                                                className="bi bi-info-circle mr-2 focus me-1 iconSizing" 
                                                                viewBox="0 0 16 16" 
                                                                onClick={()=> handleReadWardenById(warden.wardenId)}
                                                            >
                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                                            </svg>
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                fill="currentColor" 
                                                                className="bi bi-pencil-square mr-2 focus me-1 iconSizing" 
                                                                viewBox="0 0 16 16"
                                                                onClick={() => navigate(`/warden/${warden.wardenId}/`)}
                                                            >
                                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                <path 
                                                                    fill-rule="evenodd" 
                                                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                />
                                                            </svg>
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                fill="currentColor" 
                                                                className="bi bi-trash focus iconSizing" 
                                                                onClick={()=> handleDeleteWardenById(warden.wardenId)} 
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                            </svg>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td 
                                                        colSpan="7" 
                                                        className="text-center small"
                                                    >No results found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    {wardenById && <DetailsModal ref={modalRef} />}
                                    <Pagination 
                                        count={wardenCount} 
                                        limit={limit} 
                                        onPageChange={handlePageChange} 
                                    />
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

export default WardenList
