import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "../../Partials/Footer"
import Header from "../../Partials/Header"
import Breadcrumbs from "../../Partials/BreadCrumb"
import Sidebar from "../../Partials/Aside"
import { readFloorById, editFloorById, readBlockCodes } from "../Api"

function BlockFloorForm() {
    const [blocks, setBlocks] = useState([])
    const [floor, setFloor] = useState({
        blockCode: '',
        floorNumber: '',
        isActive: null
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {floorId} = useParams()
    
    const breadcrumbData = [
        { name: 'Home', link: '/home/' },
        { name: 'Structure', link: '' },
        { name: 'Blockfloor', link: '/blockfloor/' },
        { name: floorId ? "Edit" : "Add", link: "" }
    ]

    useEffect(() => {
       document.title = floorId ? "Edit Blockfloor" : "Add Blockfloor"
       handleBlockCodes()
    }, [])

    useEffect(() => {
        if (!floorId) return
        handleReadFloorById(floorId)
    }, [floorId])

    const handleReadFloorById = async (floorId) => {
        try {
            const { response, error } = await readFloorById(floorId)
            if (error) {
                alert(error)
                return
            }
            
            if (response.ok) {
                const floors = await response.json()
                setFloor({
                    blockCode: floors.blockCode,
                    floorNumber: floors.floorNumber,
                    isActive: floors.isActive ? 1 : 0
                })
            } else {
                alert(await response.text())
            }
        } catch (error) {
            alert('Something went wrong.Please try later')
        }
    }

    const handleBlockCodes = async () => {
        try {
            const { response, error } = await readBlockCodes()
            if (error) {
                alert(error)
                return
            }
            
            if (response.ok) {
                const blockCode = await response.json()
                setBlocks(blockCode)
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
            blockId: floor.blockCode.trim(),
            floorNumber: floor.floorNumber,
            isActive: floor.isActive
        }

        try {
            const { response, error } = await editFloorById(floorId, payload)
            if (error) {
                alert(error)
                return
            }

            if ([200, 201].includes(response.status)) {
                navigate('/blockfloor/')
            } else {
                const responseData = await response.json()
                alert(Array.isArray(responseData) ? responseData[0] : responseData.error || responseData)
            }
        } catch (error) {
            alert("Something went wrong. Please try later.");
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
        <Header />
        <Sidebar />
        <main id="main">
        <div className="pagetitle">
            <h1>Blockfloor Form</h1>
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
                                        <select
                                            className="form-select"
                                            id="blockCode"
                                            value={floor.blockCode}
                                            onChange={(e) => setFloor({ ...floor, blockCode: e.target.value })}
                                        >
                                            <option value="">Select a Block</option>
                                            {blocks.map((block) => (
                                                <option key={block.blockId} value={block.blockId}>
                                                    {block.blockCode}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        for="floornum" 
                                    >
                                        Floor Number<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floornum"
                                            value={floor.floorNumber}
                                            onChange={(e) => setFloor({ ...floor, floorNumber: e.target.value })}
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
                                                checked={floor.isActive === 1}
                                                onChange={() => setFloor({ ...floor, isActive: 1 })}
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
                                                checked={floor.isActive === 0}
                                                onChange={() => setFloor({ ...floor, isActive: 0 })}
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
                                    {!floorId && (
                                        <button type="reset" className="btn btn-secondary me-2" onClick={() => {
                                            setFloor({
                                                blockCode: '',
                                                floorNumber: '',
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
                                        disabled={!floor.blockCode || !floor.floorNumber || floor.isActive === null || loading}
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

export default BlockFloorForm
