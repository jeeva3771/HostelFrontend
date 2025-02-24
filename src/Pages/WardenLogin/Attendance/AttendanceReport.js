import React, { useState, useEffect } from 'react'
import Sidebar from '../../Partials/Aside'
import Footer from '../../Partials/Footer'
import Header from '../../Partials/Header'
import * as XLSX from 'xlsx'
import Breadcrumbs from '../../Partials/BreadCrumb'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import { 
    readStudentNameAndRegNo,
    report
 } from '../Api'
function AttendanceReport() {
    const { userLogout } = useAuth()
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [studentInfo, setStudentInfo] = useState([])
    const [studentName, setStudentName] = useState('')
    const [dateLabel, setDateLabel] = useState([])
    const [attendanceData, setAttendanceData] = useState([])
    const [isDownloadButtonEnabled, setIsDownloadButtonEnabled] = useState(false)
    const { navigate } = useNavigate()
    const [counts, setCounts] = useState({
        greenCount: 0,
        redCount: 0,
        notMarkedCount: 0,
        totalDays: 0
    })
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const breadcrumbData = [
        { name: 'Home', link: '/home/' },
        { name: 'Attendance', link: '/attendance/' },
        { name: 'Report', link: '' }
    ]
    
    useEffect(() => {
        document.title = "Report"
        handleStudentNameAndRegNo()
        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth()
        setYear(currentYear)
        setMonth(currentMonth + 1) // Month is zero-based, so add 1
    }, [])
    
    useEffect(() => {
        const firstDay = new Date(year, month - 1, 1).getDay();
        const getDaysInMonth = (year, month) => {
            return new Date(year, month, 0).getDate()
        }
        
        const totalDays = getDaysInMonth(year, month)
        const emptyCells = Array.from({ length: firstDay }, () => null)
        const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1)

        setDateLabel([...emptyCells, ...daysArray])
    }, [month, year])
    
    useEffect(() => {
        const greenCount = attendanceData.filter(record => record.status === 1).length
        const redCount = attendanceData.filter(record => record.status === 0).length
        const totalDays = dateLabel.filter(date => date !== null).length
        const notMarkedCount = totalDays - (greenCount + redCount)

        setCounts({
            greenCount,
            redCount,
            notMarkedCount,
            totalDays,
        })
    }, [attendanceData, dateLabel])

    const downloadExcel = () => {
        setIsDownloadButtonEnabled(true)
        const transformedData = attendanceData.map(record => ({
            ...record,
            status: record.status === 1 ? 'Present' : 'Absent',
        }))
        const worksheet = XLSX.utils.json_to_sheet(transformedData)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, `Attendance Report-${studentName}`)
        XLSX.writeFile(workbook, 'Attendance_Report.xlsx')
        setTimeout(() => {
            setIsDownloadButtonEnabled(false)
        }, 2000)
    }

    const handleStudentNameAndRegNo = async () => {
        try {
            const { response, error } = await readStudentNameAndRegNo (month, year, studentName)
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
                const students = await response.json()
                setStudentInfo(students)
            } else {
                alert(await response.text())
            }
        } catch (error) {
            alert('Something went wrong.Please try later')
        }
    } 

    useEffect(() => {
        const renderReport = async () => {
            try {
                const { response, error } = await report(month, year, studentName)

                if (error) {
                    alert(error)
                    return
                }

                if (response.status === 401) {
                    userLogout('student')
                    navigate('/student/login/')
                    return
                }

                if (!response.ok) {
                    if (response.status === 404) {
                        setAttendanceData([])
                        return
                    } else {
                        throw new Error(`Failed to fetch attendance data: ${response.status}`)
                    }
                }

                const data = await response.json()
                const attendanceList = Object.entries(data).map(([key, value]) => ({
                    date: key,
                    status: value,
                }))

                setAttendanceData(attendanceList)
            } catch (error) {
                alert('Something went wrong.Please try later.')
            }
        }
    
        if (month && year && studentName) {
            renderReport()
        }
    }, [month, year, studentName])
    
        
    return (
        <>
        <Header />
        <Sidebar />
        <main 
            className="main" 
            id="main"
        >
        <div className="pagetitle">
            <h1>Report</h1>
            <Breadcrumbs breadcrumb={breadcrumbData}/>
        </div>
        <section className="section">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <div className="container d-flex flex-column align-items-center mt-2">
                            <div className="row g-3 justify-content-center mb-4 mt-3">
                                <div className="col-auto">
                                    <label 
                                        className="visually-hidden" 
                                        htmlFor="student"
                                    >Student
                                    </label>    
                                    <select
                                        className="form-select"
                                        id="student"
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                    >
                                        <option value="">Select a Student</option>
                                        {studentInfo.map((student) => (
                                            <option 
                                                key={student.name} 
                                                value={student.name}
                                            >
                                                {student.name} - RegNo: <b>{student.registerNumber}</b>
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row g-3 justify-content-center mb-5">
                                <div className="col-auto">
                                    <label 
                                        htmlFor="month" 
                                        className="visually-hidden"
                                    >Month
                                    </label>
                                    <select 
                                        className="form-select" 
                                        id="month" 
                                        value={month} 
                                        onChange={e => setMonth(e.target.value)}
                                    >
                                        {[...Array(12).keys()].map(m => (
                                            <option 
                                                key={m} 
                                                value={m + 1}>{new Date(0, m).toLocaleString('en', { month: 'long' })}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <label 
                                        htmlFor="year" 
                                        className="visually-hidden"
                                    >Year
                                    </label>
                                    <select 
                                        className="form-select" 
                                        id="year" 
                                        value={year} 
                                        onChange={e => setYear(e.target.value)}
                                    >
                                        {Array.from({ length: 21 }, (_, index) => {
                                            const offsetYear = new Date().getFullYear() - 10 + index
                                            return (
                                                <option key={offsetYear} value={offsetYear}>
                                                    {offsetYear}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-12 d-flex justify-content-center alignCal mb-4">
                                <div className="container containerCalendar">
                                    <div className="row text-center fw-bold">
                                        {daysOfWeek.map((day, index) => (
                                            <div 
                                                key={index} 
                                                className="col border py-2"
                                            >
                                                {day}
                                            </div>
                                        ))}
                                    </div>
                                    {Array.from({ length: Math.ceil(dateLabel.length / 7) }).map((_, rowIndex) => (
                                        <div 
                                            className="row" 
                                            key={rowIndex}
                                        >
                                            {dateLabel.slice(rowIndex * 7, rowIndex * 7 + 7).map((date, colIndex) => {
                                                const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`
                                                const attendanceRecord = attendanceData.find((val) => val.date === formattedDate)
                                                let bgColor = ""
                                                
                                                if (attendanceRecord) {
                                                    bgColor = attendanceRecord.status === 1 ? "green" : "red"
                                                }

                                                return (
                                                    <div 
                                                        key={colIndex} 
                                                        className={`col border text-center py-2 
                                                            ${bgColor === "green" ? "bg-success text-white"  : 
                                                                bgColor === "red" ? "bg-danger text-white" : ""}`}
                                                    >
                                                        {date}
                                                    </div>
                                                )
                                            })}

                                            {Array.from({ length: 7 - dateLabel.slice(rowIndex * 7, rowIndex * 7 + 7).length }).map((_, extraIndex) => (
                                                <div 
                                                    key={`empty-${extraIndex}`} 
                                                    className="col border text-center py-2"
                                                >
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                <div className="col-lg-3">
                                    <div className="border border-dark-subtle p-3 rounded mb-3">
                                        <p>Present: <span className="text-dark fw-bold">{counts.greenCount}</span></p>
                                        <p>Absent: <span className="text-dark fw-bold">{counts.redCount}</span></p>
                                        <p>Not Marked: <span className="text-dark fw-bold">{counts.notMarkedCount}</span></p>
                                        <p>Total Days: <span className="text-dark fw-bold">{counts.totalDays}</span></p>
                                    </div>
                                    {attendanceData.length > 0 && (
                                        <button 
                                            type="button" 
                                            className="btn btn-primary btn-sm"
                                            onClick={downloadExcel} 
                                            disabled={isDownloadButtonEnabled}
                                        >
                                            Download Report
                                        </button>
                                    )}
                                </div> 
                        </div>
                        <div className="d-flex flex-row mb-3 align-items-center justify-content-center">
                            <div className="p-2 smallBox mt-0 bg-success text-white"></div>
                                <span className="ms-2">Present</span>

                                <div className="p-2 smallBox mt-0 red ms-3 bg-danger text-white"></div>
                                <span className="ms-2">Absent</span>

                                <div className="p-2 smallBox mt-0 ms-3 border border-dark-subtle"></div>
                                <span className="ms-2">Not Marked</span>
                            </div>
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

export default AttendanceReport