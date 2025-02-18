import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "../../Partials/Footer"
import Header from "../../Partials/Header"
import Breadcrumbs from "../../Partials/BreadCrumb"
import Sidebar from "../../Partials/Aside"
import { readBlockById, saveOrUpdateBlock } from "../Api"
import { useAuth } from "../../AuthContext"

function BlockForm() {
    const { userLogout } = useAuth()
    const [block, setBlock] = useState({
        blockCode: '',
        location: '',
        isActive: null
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {blockId} = useParams()
    
    const breadcrumbData = [
        { name: 'Home', link: '/home/' },
        { name: 'Structure', link: '' },
        { name: 'Block', link: '/block/' },
        { name: blockId ? "Edit" : "Add", link: "" }
    ]

    useEffect(() => {
         document.title = blockId ? "Edit Block" : "Add Block"
    }, [])

    useEffect(() => {
        if (!blockId) return
        handleReadBlockById(blockId)
    }, [blockId])

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
                const block = await response.json();
                setBlock({
                    blockCode: block.blockCode,
                    location: block.blockLocation,
                    isActive: block.isActive
                })
            } else {
                alert(await response.text())
            }
        } catch (error) {
            alert('Something went wrong.Please try later')
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        const payload = {
            blockCode: block.blockCode.trim(),
            blockLocation: block.location,
            isActive: block.isActive
        }

        try {
            const { response, error } = await saveOrUpdateBlock(blockId, payload)
            if (error) {
                alert(error)
                return
            }

            if (response.status === 401) {
                userLogout('warden')
                navigate('/login/')
                return
            }

            if ([200, 201].includes(response.status)) {
                navigate('/block/')
            } else {
                const responseData = await response.json()
                alert(Array.isArray(responseData) ? responseData[0] : responseData.error || responseData)
            }
        } catch (error) {
            alert("Something went wrong. Please try later.");
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
        <Header />
        <Sidebar />
        <main id="main">
        <div className="pagetitle">
            <h1>Block Form</h1>
            <Breadcrumbs breadcrumb={breadcrumbData} />
        </div>
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <form>
                                <div className="row mb-3 mt-5">
                                    <label 
                                        className="col-sm-2 col-form-label" 
                                        for="blockCode"
                                    >
                                        Block Code<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="blockCode"
                                            value={block.blockCode}
                                            onChange={(e) => setBlock({ ...block, blockCode: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        for="location" 
                                    >
                                        Location<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="location"
                                            value={block.location}
                                            onChange={(e) => setBlock({ ...block, location: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">
                                        Status<span className="text-danger">*</span>
                                    </legend>
                                    <div className="col-sm-10">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="status"
                                                value="1"
                                                id="active"
                                                checked={block.isActive === 1}
                                                onChange={() => setBlock({ ...block, isActive: 1 })}
                                            />
                                            <label 
                                                className="form-check-label" 
                                                for="active"
                                            >Active
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="status"
                                                value="0"
                                                id="inActive"
                                                checked={block.isActive === 0}
                                                onChange={() => setBlock({ ...block, isActive: 0 })}
                                            />
                                            <label 
                                                className="form-check-label" 
                                                for="inActive"
                                            >Inactive
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className="text-center">
                                    {!blockId && (
                                        <button type="reset" className="btn btn-secondary me-2" onClick={() => {
                                            setBlock({
                                                blockCode: '',
                                                location: '',
                                                isActive: null
                                            })
                                        }}>
                                            Reset
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSubmit}
                                        disabled={!block.blockCode || !block.location || block.isActive === null || loading}
                                    >
                                        {loading ? "Submitting..." : "Submit"}
                                    </button>
                                </div>
                            </form>
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

export default BlockForm
