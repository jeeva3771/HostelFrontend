import { useEffect, useState, useRef } from "react"
import Header from "../../Partials/Header"
import Sidebar from "../../Partials/Aside"
import Breadcrumbs from "../../Partials/BreadCrumb"
import Pagination from "../Pagination"
import { readBlocks, readBlockById, deleteBlockById } from "../Api"
import Footer from "../../Partials/Footer"
import DetailsModal from "../Modal"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../AuthContext"

function BlockList() {  
    const [blocks, setBlocks] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [blockCount, setBlockCount] = useState(0)
    const [limit, setLimit] = useState(10)
    const [searchText, setSearchText] = useState("")
    const [loading, setLoading] = useState(false)
    const [sortColumn, setSortColumn] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState("DESC")
    const modalRef = useRef(null)
    const navigate = useNavigate()
    const { userLogout } = useAuth()

    const totalPages = Math.ceil(blockCount / limit)

    const breadcrumbData = [
        { name: 'Home', link: '/home/' },
        { name: 'Structure', link: '' },
        { name: 'Block', link: '/block/' }
    ]
    const defaultColumn = [
        { key: 'blockCode', label: 'Block Code' },
        { key: 'blockLocation', label: 'Location' },
        { key: 'isActive', label: 'Status' },
        { key: 'createdBy', label: 'Created By' }
    ]

    useEffect(() => {
        document.title = "Block List"
    }, [])

    useEffect(() => {
        handleReadBlocks()
    }, [pageNo, limit, searchText, sortColumn, sortOrder])

    const handleReadBlocks = async () => {
        try {
            setLoading(true)
            const { response, error } = await readBlocks(limit, pageNo, sortColumn, sortOrder, searchText || '')
            if (error) {
                alert(error)
                return
            }

            if (response.status === 401) {
                userLogout('warden')
                navigate('/login/')
                return
            }

            const { blocks, blockCount } = await response.json()
            console.log(blocks)
            setBlocks(blocks || [])
            setBlockCount(blockCount || 0)
        } catch (error) {
            alert('Something went wrong.Please try later')
        } finally {
            setLoading(false)
        }
    }

    const handleReadBlockById = async (blockId) => {
        try {
            const { response, error } = await readBlockById(blockId)
            if (error) {
                alert(error)
                return
            }  
            
            if (response.status === 401) {
                userLogout('warden')
                navigate('/login/')
                return
            }

            if (response.ok) {
                const data = await response.json()
                modalRef.current.openModal(data, "block")
            } else {
                alert(await response.text())
            }
        } catch (error) {
            alert('Something went wrong.Please try later')
        }
    }

    const handleDeleteBlockById = async (blockId) => {
        try {
            var validateDelete = window.confirm('Are you sure you want to delete?')

            if (!validateDelete)
                return

            const { response, error } = await deleteBlockById(blockId)
            if (error) {
                alert(error)
                return
            }

            if (response.status === 401) {
                userLogout('warden')
                navigate('/login/')
                return
            }
            
            if (response.ok) {
                alert('Successfully deleted!')
                handleReadBlocks()
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
        setPageNo(1)
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
                    <h1>Block List</h1>
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
                                                    <label className="me-1">
                                                        <select 
                                                            className="datatable-selector" 
                                                            onChange={(e) => setLimit(Number(e.target.value))} 
                                                            value={limit}
                                                        >
                                                            <option value="5">5</option>
                                                            <option value="10">10</option>
                                                            <option value="15">15</option>
                                                            <option value="-1">All</option>
                                                        </select> entries per page
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <Link 
                                                to="/block/add/" 
                                                className="btn btn-primary"
                                            >Add
                                            </Link>
                                        </div>
                                    </div>
                                    <table className="table table-striped table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Sno</th>
                                                {defaultColumn.map(({ key, label }) => (
                                                    <th 
                                                        key={key} 
                                                        onClick={() => handleSort(key)} 
                                                        className=""
                                                    >
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
                                            ) : blocks.length > 0 ? (
                                                blocks.map((block, index) => (
                                                    <tr key={index}>
                                                        <td>{(pageNo - 1) * limit + index + 1}</td>
                                                        <td>{block.blockCode}</td>
                                                        <td>{block.blockLocation}</td>
                                                        <td>{block.isActive === 1 ? 'Active' : ''}</td>
                                                        <td>{block.createdFirstName}{block.createdLastName}</td>
                                                        <td>
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                fill="currentColor" 
                                                                className="bi bi-info-circle mr-2 focus me-1 iconSizing" 
                                                                viewBox="0 0 16 16" 
                                                                onClick={()=> handleReadBlockById(block.blockId)}
                                                            >
                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                                            </svg>
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                fill="currentColor" 
                                                                className="bi bi-pencil-square mr-2 focus me-1 iconSizing" 
                                                                viewBox="0 0 16 16"
                                                                onClick={() => navigate(`/block/${block.blockId}/`)}
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
                                                                onClick={()=> handleDeleteBlockById(block.blockId)} 
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
                                    <DetailsModal ref={modalRef} />
                                    <Pagination 
                                        currentPage={pageNo}
                                        count={blockCount} 
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

export default BlockList
