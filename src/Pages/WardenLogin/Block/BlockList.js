import { useEffect, useState } from "react"
import Header from "../../WardenPartials/Header"
import Sidebar from "../../WardenPartials/Aside"
import Breadcrumbs from "../../WardenPartials/BreadCrumb"
import Pagination from "../../../page"
import { readBlocks } from "../Api"

function BlockList() {
    const [blocks, setBlocks] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [blockCount, setBlockCount] = useState(0)
    const [limit, setLimit] = useState(10)
    const [searchText, setSearchText] = useState("")
    const [loading, setLoading] = useState(false)
    const [sortColumn, setSortColumn] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState("DESC")

    const totalPages = Math.ceil(blockCount / limit)

    const breadcrumbData = [
        { name: 'Home', link: '/home/' },
        { name: 'Structure', link: '' },
        { name: 'Block', link: '/block/' }
    ]
    const defaultColumn = ['blockCode', 'blockLocation', 'isActive', 'createdBy']

    useEffect(() => {
        document.title = "Block List"
        fetchBlocks()
    }, [pageNo, limit, searchText, sortColumn, sortOrder])

    const fetchBlocks = async () => {
        setLoading(true)
        try {
            const { response, error } = await readBlocks(limit, pageNo, sortColumn, sortOrder, searchText || '')
            if (error) {
                alert(error)
                return
            }
            const data = await response.json()
            setBlocks(data.blocks || [])
            setBlockCount(data.blockCount || 0)
        } catch (error) {
            alert('Something went wrong.Please try later')
        } finally {
            setLoading(false)
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
            <Sidebar activeMenu={'Block'} />
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
                                    <div class="datatable-top mt-4">
                                        <div class="datatable-search d-flex justify-content-between align-items-center">                                   
                                            <div class="d-flex gap-2">
                                                <div class="datatable-search">
                                                    <input 
                                                        className="datatable-input" 
                                                        placeholder="Search..." 
                                                        type="search" 
                                                        value={searchText} 
                                                        onChange={(e) => setSearchText(e.target.value)}
                                                    />
                                                </div>
                                                <div class="datatable-dropdown">
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
                                        <div class="d-flex justify-content-end">
                                            <a 
                                                href="/block/add/" 
                                                className="btn btn-primary"
                                            >Add
                                            </a>
                                        </div>
                                    </div>
                                    <table className="table table-striped table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Sno</th>
                                                {defaultColumn.map(column => (
                                                    <th key={column} onClick={() => handleSort(column)}>
                                                        {column.replace(/([A-Z])/g, ' $1').trim()}
                                                        {sortColumn === column ? (sortOrder === "ASC" ? " 🔼" : " 🔽") : ""}
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
                                                    <tr key={block.blockCode}>
                                                        <td>{(pageNo - 1) * limit + index + 1}</td>
                                                        <td>{block.blockCode}</td>
                                                        <td>{block.blockLocation}</td>
                                                        <td>{block.isActive === 1 ? 'Active' : 'Inactive'}</td>
                                                        <td>{block.createdFirstName} {block.createdLastName}</td>
                                                        <td>
                                                            <button className="btn btn-info btn-sm">View</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td 
                                                        colSpan="7" 
                                                        className="text-center text-lowercase small"
                                                    >No results found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    <Pagination 
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
        </>
    )
}

export default BlockList
