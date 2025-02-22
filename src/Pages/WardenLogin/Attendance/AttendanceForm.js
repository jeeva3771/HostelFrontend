import { useState, useEffect } from "react"
import Header from "../../Partials/Header"
import Footer from "../../Partials/Footer"
import Breadcrumbs from "../../Partials/BreadCrumb"
import Sidebar from "../../Partials/Aside"
import { useNavigate, useLocation } from "react-router-dom"
import formatDate from "../DateFormat"
import { useAuth } from "../../AuthContext"
import { 
  fetchStudents, 
  populateBlockCode, 
  populateFloorNumber, 
  populateRoomNumber,
  saveOrUpdateAttendance 
} from "../Api"

const AttendanceForm = () => {
  let date
  const location = useLocation()
  const { userLogout } = useAuth()

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search)
    return {
      blockId: params.get("blockId"),
      blockFloorId: params.get("blockFloorId"),
      roomId: params.get("roomId"),
      checkInDate: params.get("checkInDate"),
    }
  }

  const { blockId, blockFloorId, roomId, checkInDate } = getQueryParams()
  if (checkInDate) {
    date = formatDate(checkInDate)
  }
  const [checkIn, setCheckIn] = useState(date ? date : new Date().toISOString().split("T")[0])
  const [blocksData, setBlocksData] = useState([])
  const [showBlocks, setShowBlocks] = useState(true)
  const [floorsData, setFloorsData] = useState([])
  const [showFloors, setShowFloors] = useState(false)
  const [roomsData, setRoomsData] = useState([])
  const [showRooms, setShowRooms] = useState(false)
  const [students, setStudents] = useState([])
  const [showStudents, setShowStudents] = useState(false)
  const [attendance, setAttendance] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [allId, setAllId] = useState({
    blockId: null,
    floorId: null,
    roomId: null
  })
  const navigate = useNavigate()
  const breadcrumbData = [
    { name: 'Home', link: '/home/' },
    { name: 'Attendance', link: '' },
  ]

  useEffect(() => {
    if (blockId) {
      setShowBlocks(false)
      handlePopulateFloorNumber(blockId)
    }
  }, [blockId])

  useEffect(() => {
    if (blockFloorId) {
      handlePopulateRoomNumber(blockFloorId)
    }
  }, [blockFloorId])

  useEffect(() => {
    if (roomId) {
      setShowStudents(true)
      handleFetchStudents(roomId)
    }
  }, [roomId])


  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    if (checkIn > today) {
      alert('Not allowed to take attendance for a future date.')
      setCheckIn(today)
      return
    }
    if (showBlocks) {
      handlePopulateBlockCode()
    } else if (showFloors) {
      handlePopulateFloorNumber(allId.blockId)
    } else if (showRooms) {
      handlePopulateRoomNumber(allId.floorId)
    } else if (showStudents) {
      handleFetchStudents(allId.roomId)
    }
  }, [checkIn])

  const handleDateChange = (e) => {
    setCheckIn(e.target.value)
  }

  const getPriority = (item) => {
    if (item.studentsCount === 0) return 4
    let percentage = Math.floor((item.attendanceCount / item.studentsCount) * 100)
    if (percentage === 100) return 1
    if (percentage > 0 && percentage <= 90) return 2
    if (percentage === 0) return 3
    return 4
  }

  const handlePopulateBlockCode = async () => {
    try {
      const { response, error } = await populateBlockCode(checkIn)
      if (error) {
          alert(error)
          return
      }

      if (response.status === 401) {
          userLogout('warden')
          navigate('/login/')
          return
      }
      const blocks = await response.json()
      setBlocksData(blocks)
    } catch (error) {
      alert("Something went wrong. Please try later.")
    }
  }

  const handlePopulateFloorNumber = async (blockId) => {
    try {
      setAllId((prev) => ({ ...prev, blockId: blockId }));

      const { response, error } = await populateFloorNumber(checkIn, blockId)
      if (error) {
          alert(error)
          return
      }

      if (response.status === 401) {
          userLogout('warden')
          navigate('/login/')
          return
      }
      const floors = await response.json()
      setFloorsData(floors)
    } catch (error) {
      alert("Something went wrong. Please try later.")
    }
  }

  const handlePopulateRoomNumber = async (floorId) => {
    try {
      setAllId((prev) => ({ ...prev, floorId: floorId }));

      const { response, error } = await populateRoomNumber(checkIn, floorId)
      if (error) {
          alert(error)
          return
      }

      if (response.status === 401) {
          userLogout('warden')
          navigate('/login/')
          return
      }
      const rooms = await response.json()
      setRoomsData(rooms)

    } catch (error) {
      alert("Something went wrong. Please try later.")
    }
  }

  const handleFetchStudents = async (roomId) => {
    setStudents([])

    try {
      setAllId((prev) => ({ ...prev, roomId: roomId }));
      const { response, error } = await fetchStudents(roomId, checkIn)

      if (error) {
          alert(error)
          return
      }

      if (response.status === 401) {
          userLogout('warden')
          navigate('/login/')
          return
      }
      const data = await response.json()
      setStudents(data)

      const newAttendance = data.map((student) => ({
        studentId: student.studentId,
        isPresent: student.isPresent ?? 1, 
      }))
  
      setAttendance(newAttendance)
    } catch (error) {
      alert("Something went wrong. Please try later.")
    } 
  }

  const handleSaveOrUpdateAttendance = async () => {
    try {
      setLoading(true)
      const finalBlockId = blockId || allId.blockId;
      const finalBlockFloorId = blockFloorId || allId.floorId;
      const finalRoomId = roomId || allId.roomId;

      if (!finalBlockId || !finalBlockFloorId || !finalRoomId) return

      const payload = {
        blockId: finalBlockId,
        blockFloorId: finalBlockFloorId,
        roomId: finalRoomId,
        checkInDate: checkIn,
        attendance: attendance
      }

      const { response, error } = await saveOrUpdateAttendance(finalBlockId, finalBlockFloorId, finalRoomId, payload)
      if (error) {
        alert(error)
        return
      }

      if (response.status === 401) {
        userLogout('warden')
        navigate('/login/')
        return
      }
   
      if (response.status === 200) {
        navigate('/attendance/')
      } else {
        alert(await response.text())
        setLoading(false)
      }
    } catch (error) {
      alert("Something went wrong. Please try later.")
      setLoading(false)
    }
}

  const handleAttendanceChange = (studentId, isPresent) => {
    setAttendance((prevAttendance) => {
      const updatedAttendance = prevAttendance.some((entry) => entry.studentId === studentId)
        ? prevAttendance.map((entry) =>
            entry.studentId === studentId ? { ...entry, isPresent } : entry
          )
        : [...prevAttendance, { studentId, isPresent }]

      return updatedAttendance
    })
  }

  const handleBlockClick = (blockId) => {
    handlePopulateFloorNumber(blockId)
    setShowBlocks(false)
    setShowFloors(true)
  }

  const handleFloorClick = (floorId) => {
    handlePopulateRoomNumber(floorId)
    setShowFloors(false)
    setShowRooms(true)
  }
  
  const handleRoomClick = (roomId) => {
    handleFetchStudents(roomId)
    setShowRooms(false)
    setShowStudents(true)
  }

  const backToView = () => {
    if (showStudents) {
      setShowStudents(false)
      setStudents([])
      setShowRooms(true)
    } else if (showRooms) {
      setShowRooms(false)
      setRoomsData([])
      setShowFloors(true)
    } else if (showFloors) {
      setShowFloors(false)
      setFloorsData([])
      setShowBlocks(true)
      setAllId(prev => ({ ...prev, blockId: null, floorNumber: null, roomId: null }))
    }
  }
  return (
    <>
    <Header />
    <Sidebar />
    <main id="main">
    <div className="pagetitle">
        <h1>Attendance</h1>
        <Breadcrumbs breadcrumb={breadcrumbData} />
    </div>
    <section className="section">
        <div className="row">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <div className="mt-3">
                          {!(blockId && blockFloorId && roomId) && !showBlocks && (
                            <button 
                              onClick={backToView}
                              className="btn btn-outline-secondary btn-sm"
                            >
                              Back
                            </button>
                          )}
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-2 text-center mt-4">
                                <div className="form-group">
                                    <label 
                                        htmlFor="date" 
                                        className="mb-2"
                                    ><strong>Date</strong>
                                    </label>
                                    <input 
                                        type="date" 
                                        className="form-control controlDateInputField" 
                                        value={checkIn} 
                                        onChange={handleDateChange}
                                        readOnly={blockId}
                                    />
                                </div>
                            </div>
                        </div>
                        {showBlocks && (
                        <div className="container text-center mt-3">
                            <p><strong>Block</strong></p>
                            <div className="col-12">
                                <div className="row row-cols-6 g-3 justify-content-center">
                                    {[...blocksData]
                                      .sort((a, b) => getPriority(a) - getPriority(b))
                                      .map((block) => {
                                          let backgroundColor = ""
                                          let displayText = block.blockCode

                                          if (block.studentsCount > 0) {
                                              let percentage = Math.floor((block.attendanceCount / block.studentsCount) * 100)
                                              if (percentage === 100) backgroundColor = "green"
                                              else if (percentage > 0 && percentage <= 90) backgroundColor = "orange"
                                              else backgroundColor = "red"
                                              displayText += ` - ${percentage}%`
                                          }

                                          return (
                                              <button
                                                  key={block.blockId}
                                                  className={`btn btn-secondary me-2 upperCase ${block.studentsCount === 0 ? "disabled" : ""}`}
                                                  style={{ backgroundColor }}
                                                  onClick={() => handleBlockClick(block.blockId)}
                                                  disabled={block.studentsCount === 0}
                                              >
                                                  {displayText}
                                              </button>
                                          )
                                        })
                                      }
                                </div>
                            </div>
                        </div>
                      )}
                        {showFloors && (
                        <div className="container text-center mt-3">
                              <p><strong>Floor Number</strong></p>
                              <div className="col-12 mx-auto">
                                  <div className="row row-cols-6 g-3 justify-content-center">
                                  {[...floorsData]
                                    .sort((a, b) => getPriority(a) - getPriority(b))        
                                    .map((floor) => {
                                      let backgroundColor = ""
                                      let displayText = floor.floorNumber

                                      if (floor.studentsCount > 0) {
                                          let percentage = Math.floor((floor.attendanceCount / floor.studentsCount) * 100)
                                          if (percentage === 100) backgroundColor = "green"
                                          else if (percentage > 0 && percentage <= 90) backgroundColor = "orange"
                                          else backgroundColor = "red"
                                          displayText += ` - ${percentage}%`
                                      }                     
                                      return (
                                        <button
                                            key={floor.blockFloorId}
                                            className={`btn btn-secondary me-2 ${floor.studentsCount === 0 ? "disabled" : ""}`}
                                            style={{ backgroundColor }}
                                            onClick={() => handleFloorClick(floor.blockFloorId)}
                                            disabled={floor.studentsCount === 0}
                                        >
                                            {displayText}
                                        </button>
                                    )
                                  })
                                }         
                              </div>
                          </div>
                        </div>
                      )}
                        {showRooms && (
                        <div className="container text-center mt-3">
                            <div className="row justify-content-center">
                                <p><strong>Room Number</strong></p>
                                <div className="col-12 mx-auto">
                                    <div className="row row-cols-6 g-3 justify-content-center">
                                    {[...roomsData]
                                      .sort((a, b) => getPriority(a) - getPriority(b))
                                      .map((room) => {
                                        let backgroundColor = ""
                                        let displayText = room.roomNumber
                                        
                                        if (room.studentsCount > 0) {
                                            let percentage = Math.floor((room.attendanceCount / room.studentsCount) * 100)
                                            if (percentage === 100) backgroundColor = "green"
                                            else if (percentage > 0 && percentage <= 90) backgroundColor = "orange"
                                            else backgroundColor = "red"
                                            displayText += ` - ${percentage}%`
                                        }                     
                                        return (
                                          <button
                                              key={room.roomId}
                                              className={`btn btn-secondary me-2 ${room.studentsCount === 0 ? "disabled" : ""}`}
                                              style={{ backgroundColor }}
                                              onClick={() => handleRoomClick(room.roomId)}
                                              disabled={room.studentsCount === 0}
                                          >
                                              {displayText}
                                          </button>
                                      )
                                    })
                                  }      
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                        {(showBlocks || showFloors || showRooms) && (
                        <div className="d-flex flex-row mb-3 align-items-center justify-content-center mt-4">
                            <b className="me-2">Attendance Taken :</b>
                            <div className="p-2 smallBox mt-0 clr1"></div>
                            <span className="ms-2">100%</span>

                            <div className="p-2 smallBox mt-0 clr3 ms-3"></div>
                            <span className="ms-2">Below-99%</span>

                            <div className="p-2 smallBox mt-0 ms-3 rounded-0 border border-1 clr2"></div>
                            <span className="ms-2">0%</span>

                            <div className="p-2 smallBox mt-0 ms-3 rounded-0 border border-1 clr4"></div>
                            <span className="ms-2">No Field</span>
                        </div>
                        )}
                        {showStudents && (
                        <div className="container text-center my-5 ">
                          {students.length > 0 && (
                            <>
                            <table className="table table-striped table-hover table-bordered border">
                              <thead>
                                <tr>
                                  <th scope="col">Sno</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {students.map((student, index) => (
                                  <tr key={student.studentId}>
                                    <td>{index + 1}</td>
                                    <td>{student.name}</td>
                                    <td>
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name={`isPresent_${student.studentId}`}
                                          value="1"
                                          id={`present_${student.studentId}`}
                                          checked={attendance.some((entry) => entry.studentId === student.studentId && entry.isPresent === 1)}
                                          onChange={() => handleAttendanceChange(student.studentId, 1)}
                                        />
                                        <label className="form-check-label" htmlFor={`present_${student.studentId}`}>Present</label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name={`isPresent_${student.studentId}`}
                                          value="0"
                                          id={`absent_${student.studentId}`}
                                          checked={attendance.some((entry) => entry.studentId === student.studentId && entry.isPresent === 0)}
                                          onChange={() => handleAttendanceChange(student.studentId, 0)}
                                        />
                                        <label className="form-check-label" htmlFor={`absent_${student.studentId}`}>Absent</label>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              
                            </table>
                            <button 
                              type="button"
                              onClick={() => handleSaveOrUpdateAttendance()}
                              className="btn btn-primary"
                              disabled={isLoading}
                            >Submit
                            </button>
                          </>
                          )}
                        </div>
                        )}
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

export default AttendanceForm
