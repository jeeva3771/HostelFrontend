import { useState, useEffect } from "react"
import Header from "../../Partials/Header"
import Footer from "../../Partials/Footer"
import Breadcrumbs from "../../Partials/BreadCrumb"
import Sidebar from "../../Partials/Aside"
import { wardenAppUrl } from "../../../config"

const AttendanceForm = () => {
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split("T")[0])
  const [blocksData, setBlocksData] = useState([])
  const [showBlocks, setShowBlocks] = useState(true)
  const [floorsData, setFloorsData] = useState([])
  const [showFloors, setShowFloors] = useState(false)
  const [roomsData, setRoomsData] = useState([])
  const [showRooms, setShowRooms] = useState(false)

  const breadcrumbData = [
    { name: 'Home', link: '/home/' },
    { name: 'Attendance', link: '' },
  ]

  useEffect(() => {
    populateBlockCode()
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

  const populateBlockCode = async () => {
    try {
        var myHeaders = new Headers();
      const response = await fetch(`${wardenAppUrl}/api/attendance/block?date=${checkIn}`,{method:'GET',credentials: 'include', myHeaders});
      const blocks = await response.json();
      setBlocksData(blocks);
    } catch (error) {
      alert("Something went wrong. Please try later.")
    }
  }

  const populateFloorNumber = async (blockId) => {
    try {
        var myHeaders = new Headers();
      const response = await fetch(`${wardenAppUrl}/api/attendance/blockfloor?date=${checkIn}&blockId=${blockId}`,{method:'GET',credentials: 'include', myHeaders});
      const floors = await response.json();
      setFloorsData(floors);
    } catch (error) {
      alert("Something went wrong. Please try later.")
    }
  }

  const populateRoomNumber = async (floorId) => {
    try {
        var myHeaders = new Headers();
      const response = await fetch(`${wardenAppUrl}/api/attendance/room?date=${checkIn}&blockFloorId=${floorId}`,{method:'GET',credentials: 'include', myHeaders});
      const rooms = await response.json();
      setRoomsData(rooms);
    } catch (error) {
      alert("Something went wrong. Please try later.")
    }
  }

  const handleBlockClick = (blockId) => {
    populateFloorNumber(blockId)
    setShowBlocks(false)
    setShowFloors(true)
  }

  const handleFloorClick = (floorId) => {
    populateRoomNumber(floorId)
    setShowFloors(false)
    setShowRooms(true)
  }
  
  const handleRoomClick = (roomId) => {
    setShowRooms(false)
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
                            <button 
                                onclick="" 
                                className="btn btn-outline-secondary btn-sm"
                                id="backToView"
                            >Back
                            </button>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-2 text-center mt-4">
                                <div className="form-group">
                                    <label 
                                        for="date" 
                                        className="mb-2"
                                    ><strong>Date</strong>
                                    </label>
                                    <input 
                                        type="date" 
                                        className="form-control controlDateInputField" 
                                        value={checkIn} 
                                        onChange={handleDateChange}
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
                                                  className={`btn btn-secondary me-2 ${block.studentsCount === 0 ? "disabled" : ""}`}
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
                        <div className="container text-center">
                            <div className="hidden">
                                <p><strong>Students</strong></p>
                                <div className="mb-4">
                                </div>
                                <button 
                                    type="button" 
                                    onclick="saveOrUpdateAttendance()" 
                                    className="btn btn-primary"
                                    id="submitButton"
                                >Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    </section>    
    </main>
    <Footer />
    </>
  );
};

export default AttendanceForm;
