import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "../../Partials/Footer"
import Header from "../../Partials/Header"
import Breadcrumbs from "../../Partials/BreadCrumb"
import Sidebar from "../../Partials/Aside"
import { readRoomById, saveOrUpdateRoom, readBlockCodes, readFloorNumbers } from "../Api"
import { useAuth } from "../../AuthContext"

function RoomForm() {
    const { userLogout } = useAuth()
    const [blocks, setBlocks] = useState([])
    const [floors, setFloors] = useState([])
    const [room, setRoom] = useState({
        blockCode: '',
        floorNumber: '',
        roomNumber: '',
        roomCapacity: '',
        isActive: null,
        isAirConditioner: null
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {roomId} = useParams()
    
    const breadcrumbData = [
        { name: 'Home', link: '/home/' },
        { name: 'Structure', link: '' },
        { name: 'Room', link: '/room/' },
        { name: roomId ? "Edit" : "Add", link: "" }
    ]

    useEffect(() => {
       document.title = roomId ? "Edit Room" : "Add Room"
       handleBlockCodes()
    }, [])

    useEffect(() => {
        if (!roomId) return
        handleReadRoomById(roomId)
    }, [roomId])

    const handleReadRoomById = async (roomId) => {
        try {
            const { response, error } = await readRoomById(roomId)
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
                const room = await response.json()
                setRoom({
                    blockCode: room.blockId,
                    floorNumber: room.blockFloorId,
                    roomNumber: room.roomNumber,
                    roomCapacity: room.roomCapacity,
                    isActive: room.isActive ? 1 : 0,
                    isAirConditioner: room.isAirConditioner ? 1 : 0
                })
                handleFloorNumbers(room.blockId)
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

            if (response.status === 401) {
                userLogout('warden')
                navigate('/login/')
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

    const handleFloorNumbers = async (blockId, isBlockFloor) => {
        try {
            const { response, error } = await readFloorNumbers(blockId, isBlockFloor)
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
                const floorNumbers = await response.json()
                setFloors(floorNumbers)
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
            blockId: room.blockCode,
            blockFloorId: room.floorNumber,
            roomNumber: room.roomNumber,
            roomCapacity: room.roomCapacity,
            isActive: room.isActive,
            isAirConditioner: room.isAirConditioner
        }

        try {
            const { response, error } = await saveOrUpdateRoom(roomId, payload)
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
                navigate('/room/')
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
            <h1>Room Form</h1>
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
                                        htmlFor="blockCode"
                                    >
                                        Block Code<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <select
                                            className="form-select"
                                            id="blockCode"
                                            value={room.blockCode}
                                            onChange={(e) => {
                                                const selectedBlock = e.target.value;
                                                setRoom({ ...room, blockCode: selectedBlock })
                                                if (selectedBlock) {
                                                    handleFloorNumbers(selectedBlock, true)
                                                }
                                            }}
                                        >
                                            <option value="">Select a Block</option>
                                            {blocks
                                                .sort((a, b) => (a.floorCount === 0) - (b.floorCount === 0)) // Move floorCount 0 to bottom
                                                .map((block) => (
                                                    <option 
                                                        key={block.blockId} 
                                                        value={block.blockId}
                                                        disabled={block.floorCount === 0}
                                                    >
                                                        {block.blockCode} (Floors Count: {block.floorCount})    
                                                    </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label" 
                                        htmlFor="floorNum"
                                    >
                                        Floor Number<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <select
                                            className="form-select"
                                            id="floorNum"
                                            value={room.floorNumber}
                                            onChange={(e) => setRoom({ ...room, floorNumber: e.target.value })}
                                        >
                                            {floors.length > 0 && (
                                                <>
                                                    <option value="">Select a Floor</option>
                                                    {floors
                                                        .sort((a, b) => (a.roomCount === 0) - (b.roomCount === 0)) 
                                                        .map((floor) => (
                                                        <option key={floor.blockFloorId} value={floor.blockFloorId}>
                                                            {floor.floorNumber} (Rooms Count: {floor.roomCount})
                                                        </option>
                                                    ))}
                                                </>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        htmlFor="roomNum" 
                                    >
                                        Room Number<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="roomNum"
                                            value={room.roomNumber}
                                            onChange={(e) => setRoom({ ...room, roomNumber: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        htmlFor="roomCapacity" 
                                    >
                                        Room Capacity<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="roomCapacity"
                                            value={room.roomCapacity}
                                            onChange={(e) => setRoom({ ...room, roomCapacity: e.target.value })}
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
                                                checked={room.isActive === 1}
                                                onChange={() => setRoom({ ...room, isActive: 1 })}
                                            />
                                            <label 
                                                className="form-check-label" 
                                                htmlFor="active"
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
                                                checked={room.isActive === 0}
                                                onChange={() => setRoom({ ...room, isActive: 0 })}
                                            />
                                            <label 
                                                className="form-check-label" 
                                                htmlFor="inActive"
                                            >Inactive
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">
                                        Air Conditioner<span className="text-danger">*</span>
                                    </legend>
                                    <div className="col-sm-10">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="isAirConditioner"
                                                value="1"
                                                id="airConditioner"
                                                checked={room.isAirConditioner === 1}
                                                onChange={() => setRoom({ ...room, isAirConditioner: 1 })}
                                            />
                                            <label 
                                                className="form-check-label" 
                                                htmlFor="airConditioner"
                                            >Yes
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="isAirConditioner"
                                                value="0"
                                                id="noAirConditioner"
                                                checked={room.isAirConditioner === 0}
                                                onChange={() => setRoom({ ...room, isAirConditioner: 0 })}
                                            />
                                            <label 
                                                className="form-check-label" 
                                                htmlFor="noAirConditioner"
                                            >No
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className="text-center">
                                    {!roomId && (
                                        <button type="reset" className="btn btn-secondary me-2" onClick={() => {
                                            setRoom({
                                                blockCode: '',
                                                floorNumber: '',
                                                roomNumber: '',
                                                roomCapacity: '',
                                                isActive: null,
                                                isAirConditioner: null
                                            })
                                        }}>
                                            Reset
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSubmit}
                                        disabled={!room.blockCode || !room.floorNumber || room.isActive === null || loading}
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

export default RoomForm
