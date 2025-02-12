import { useState, useEffect } from "react"
import { wardenAppUrl } from "../../../config"
import { useNavigate } from "react-router-dom"
import Footer from "../../Partials/Footer"
import Header from "../../Partials/Header"
import Breadcrumbs from "../../Partials/BreadCrumb"
import Sidebar from "../../Partials/BreadCrumb"


const BlockForm = ({ blockId }) => {
    const [blockCode, setBlockCode] = useState("");
    const [blockLocation, setBlockLocation] = useState("");
    const [isActive, setIsActive] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const breadcrumbData = [
        { name: 'Home', link: '/home/' },
        { name: 'Structure', link: '' },
        { name: 'Block', link: '/block/' },
        { name: 'Add', link: '' }
    ]

    useEffect(() => {
        if (blockId) {
            fetchBlock(blockId);
        }
    }, [blockId])

    const fetchBlock = async (blockId) => {
        try {
            const response = await fetch(`${wardenAppUrl}api/block/${blockId}`)
            if (response.ok) {
                const block = await response.json();
                setBlockCode(block.blockCode || "");
                setBlockLocation(block.blockLocation || "");
                setIsActive(block.isActive);
            }
        } catch (error) {
            alert("Something went wrong. Please try later.");
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        const payload = {
            blockCode: blockCode.trim(),
            blockLocation,
            isActive
        };

        try {
            const response = await fetch(`${wardenAppUrl}api/block${blockId ? `/${blockId}` : ""}`, {
                method: blockId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })

            if ([200, 201].includes(response.status)) {
                navigate('/block/')
            } else {
                const responseData = await response.json();
                alert(Array.isArray(responseData) ? responseData[0] : responseData.error || responseData);
            }
        } catch (error) {
            alert("Something went wrong. Please try later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Header />
    
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
                            <h5 className="card-title">Block Form</h5>
                            <form>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">
                                        Block Code<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={blockCode}
                                            onChange={(e) => setBlockCode(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">
                                        Location<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={blockLocation}
                                            onChange={(e) => setBlockLocation(e.target.value)}
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
                                                checked={isActive === 1}
                                                onChange={() => setIsActive(1)}
                                            />
                                            <label className="form-check-label">Active</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="status"
                                                value="0"
                                                checked={isActive === 0}
                                                onChange={() => setIsActive(0)}
                                            />
                                            <label className="form-check-label">Inactive</label>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className="text-center">
                                    {!blockId && (
                                        <button type="reset" className="btn btn-secondary" onClick={() => {
                                            setBlockCode("");
                                            setBlockLocation("");
                                            setIsActive(null);
                                        }}>
                                            Reset
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSubmit}
                                        disabled={!blockCode || !blockLocation || isActive === null || loading}
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
