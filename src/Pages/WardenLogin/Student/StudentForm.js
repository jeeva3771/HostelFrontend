import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "../../Partials/Footer"
import Header from "../../Partials/Header"
import Breadcrumbs from "../../Partials/BreadCrumb"
import Sidebar from "../../Partials/Aside"
import { 
    readStudentById, 
    saveOrUpdateStudent, 
    readBlockCodes,
    readFloorNumbers, 
    readRoomNumbers ,
    readCourses
} from "../Api"
import formatDate from "../DateFormat"
import { useAuth } from "../../AuthContext"

function StudentForm() {
    const { userLogout } = useAuth()
    const [blocks, setBlocks] = useState([])
    const [floors, setFloors] = useState([])
    const [rooms, setRooms] = useState([])
    const [courses, setCourses] = useState([])
    const [student, setStudent] = useState({
        name: '',
        regNum: '',
        dob: '',
        courseName: '',
        emailId: '',
        phoneNum: '',
        fatherName: '',
        fatherNum: '',
        address: '',    
        blockCode: '',
        floorNum: '',
        roomNum: '',
        joinDate: ''
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { studentId } = useParams()
    
    const breadcrumbData = [
        { name: 'Home', link: '/home/' },
        { name: 'Student', link: '/student/' },
        { name: studentId ? "Edit" : "Add", link: "" }
    ]

    useEffect(() => {
       document.title = studentId ? "Edit Room" : "Add Room"
       handleCourses()
       handleBlockCodes()
    }, [])

    useEffect(() => {
        if (!studentId) return
        handleReadStudentById(studentId)
    }, [studentId])

    const handleReadStudentById = async (studentId) => {
        try {
            const { response, error } = await readStudentById(studentId)
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
                const student = await response.json()
                setStudent({
                    name: student.name,
                    regNum: student.registerNumber,
                    dob: formatDate(student.birth),
                    courseName: student.courseId,
                    emailId: student.emailId,
                    phoneNum: student.phoneNumber,
                    fatherName: student.fatherName,
                    fatherNum: student.fatherNumber,
                    address: student.address,    
                    blockCode: student.blockId,
                    floorNum: student.blockFloorId,
                    roomNum: student.roomId,
                    joinDate: formatDate(student.joinDate)
                })
                handleBlockCodes()
                handleFloorNumbers(student.blockId)
                handleRoomNumbers(student.blockFloorId)
            } else {
                alert(await response.text())
            }
        } catch (error) {
            alert('Something went wrong.Please try later')
        }
    }

    const handleCourses = async () => {
        try {
            const { response, error } = await readCourses()
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
                const {courses} = await response.json()
                setCourses(courses)
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

    const handleRoomNumbers = async (floorId) => {
        try {
            const { response, error } = await readRoomNumbers(floorId)
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
                const roomNumbers = await response.json()
                setRooms(roomNumbers)
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
            name: student.name,
            registerNumber: student.regNum.trim(),
            dob: student.dob,
            courseId: student.courseName,
            emailId: student.emailId.trim(),
            phoneNumber: student.phoneNum.trim(),
            fatherName: student.fatherName,
            fatherNumber: student.fatherNum.trim(),
            address: student.address,
            blockId: student.blockCode,
            blockFloorId: student.floorNum,
            roomId: student.roomNum,
            joinedDate: student.joinDate
        }

        try {
            const { response, error } = await saveOrUpdateStudent(studentId, payload)
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
                navigate('/student/')
            } else {
                const responseData = await response.json()
                if (Array.isArray(responseData)) {
                    const errorMessage = responseData.join('\n');
                    alert(errorMessage);
                } else {
                    alert(responseData.error || responseData);
                }
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
            <h1>Student Form</h1>
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
                                        for="name"
                                    >
                                        Name<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={student.name}
                                            onChange={(e) => setStudent({ ...student, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        for="regNum" 
                                    >
                                        Register Number<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="regNum"
                                            value={student.regNum}
                                            onChange={(e) => setStudent({ ...student, regNum: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        for="dob" 
                                    >
                                        DOB<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="dob"
                                            value={student.dob}
                                            onChange={(e) => setStudent({ ...student, dob: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label" 
                                        for="courseName"
                                    >
                                        Course Name<span className="text-danger">*</span>
                                    </label>    
                                    <div className="col-sm-10">
                                        <select
                                            className="form-select"
                                            id="courseName"
                                            value={student.courseName}
                                            onChange={(e) => setStudent({ ...student, courseName: e.target.value })}
                                        >
                                            <option value="">Select a Course</option>
                                            {courses.map((course) => (
                                                <option 
                                                    key={course.courseId} 
                                                    value={course.courseId}
                                                >
                                                    {course.courseName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>


                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        for="email" 
                                    >
                                        Email Id<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={student.emailId}
                                            onChange={(e) => setStudent({ ...student, emailId: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        for="phoneNum" 
                                    >
                                        Phone Number<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="phoneNum"
                                            value={student.phoneNum}
                                            onChange={(e) => setStudent({ ...student, phoneNum: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        for="fatherName" 
                                    >
                                        Father Name<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fatherName"
                                            value={student.fatherName}
                                            onChange={(e) => setStudent({ ...student, fatherName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        for="fatherNum" 
                                    >
                                        Father Number<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="fatherNum"
                                            value={student.fatherNum}
                                            onChange={(e) => setStudent({ ...student, fatherNum: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        for="address" 
                                    >
                                        Address<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            value={student.address}
                                            onChange={(e) => setStudent({ ...student, address: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
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
                                            value={student.blockCode}
                                            onChange={(e) => {
                                                const selectedBlock = e.target.value;
                                                setStudent({ ...student, blockCode: selectedBlock })
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
                                        for="floorNum"
                                    >
                                        Floor Number<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <select
                                            className="form-select"
                                            id="floorNum"
                                            value={student.floorNum}
                                            onChange={(e) => {
                                                const selectedFloor = e.target.value;
                                                setStudent({ ...student, floorNum: selectedFloor })
                                                if (selectedFloor) {
                                                    handleRoomNumbers(selectedFloor)
                                                }
                                            }}
                                        >
                                            {floors.length > 0 && (
                                                <>
                                                    <option value="">Select a Floor</option>
                                                    {floors
                                                        .sort((a, b) => (a.roomCount === 0) - (b.roomCount === 0)) 
                                                        .map((floor) => (
                                                        <option 
                                                            key={floor.blockFloorId} 
                                                            value={floor.blockFloorId}
                                                            disabled={floor.roomCount === 0}
                                                        >
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
                                        for="roomNum"
                                    >
                                        Room Number<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <select
                                            className="form-select"
                                            id="roomNum"
                                            value={student.roomNum}
                                            onChange={(e) => setStudent({ ...student, roomNum: e.target.value })}
                                        >
                                            {rooms.length > 0 && (
                                                <>
                                                    <option value="">Select a Room</option>
                                                    {rooms
                                                        .sort((a, b) => {
                                                            const aStatus = a.room.roomCapacity === 0 || a.isFull
                                                            const bStatus = b.room.roomCapacity === 0 || b.isFull
                                                            return aStatus - bStatus
                                                        })
                                                        .map((item) => {
                                                            const { room } = item;
                                                            let label = `${room.roomNumber}${room.isAirConditioner === 1 ? ' - A/C' : ''}`

                                                            if (room.roomCapacity === 0) {
                                                                label += " (Unavailable)"
                                                            } else if (item.isFull) {
                                                                label += " (Room Filled)"
                                                            }

                                                            return (
                                                                <option
                                                                    key={room.roomId}
                                                                    value={room.roomId}
                                                                    disabled={room.roomCapacity === 0 || item.isFull}
                                                                >
                                                                    {label}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label 
                                        className="col-sm-2 col-form-label"
                                        for="joinDate" 
                                    >
                                        Joined Date<span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="joinDate"
                                            value={student.joinDate}
                                            onChange={(e) => setStudent({ ...student, joinDate: e.target.value })}
                                        />
                                    </div>
                                </div>


                                <div className="text-center">
                                    {!studentId && (
                                        <button type="reset" className="btn btn-secondary me-2" onClick={() => {
                                            setStudent({
                                                name: '',
                                                regNum: '',
                                                dob: '',
                                                courseName: '',
                                                emailId: '',
                                                phoneNum: '',
                                                fatherName: '',
                                                fatherNum: '',
                                                address: '',    
                                                blockCode: '',
                                                floorNum: '',
                                                roomNum: '',
                                                joinDate: ''
                                            })
                                        }}>
                                            Reset
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSubmit}
                                        disabled={
                                            !student.name ||
                                            !student.regNum ||
                                            !student.dob === null ||
                                            !student.courseName ||
                                            !student.emailId ||
                                            !student.phoneNum === null ||
                                            !student.fatherName ||
                                            !student.fatherNum ||
                                            !student.address === null ||
                                            !student.blockCode === null ||
                                            !student.floorNum ||
                                            !student.roomNum ||
                                            !student.joinDate === null ||
                                            loading
                                        }
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

export default StudentForm
