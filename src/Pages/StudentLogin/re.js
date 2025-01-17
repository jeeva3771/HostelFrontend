import React, { useState, useEffect } from 'react'
import Siderbar from '../Partials/Aside'
import Footer from '../Partials/footer'
import Header from '../Partials/Header'

function Report() {
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [dateLabel, setDateLabel] = useState([])
    const [attendanceData, setAttendanceData] = useState([])
    const [counts, setCounts] = useState({
        greenCount: 0,
        redCount: 0,
        notMarkedCount: 0,
        totalDays: 0
    })
    const reportUrl = 'http://localhost:1006/api/student/attendancereport'
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    useEffect(() => {
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
        const renderReport = async () => {
            try {
                const studentRegNo = '83748jjjkii'
                let fetchUrl = `${reportUrl}?month=${month}&year=${year}&studentName=jeevajeeva`

                if (studentRegNo) {
                    fetchUrl += `&registerNumber=${studentRegNo}`
                }

                const response = await fetch(fetchUrl)
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
                alert('Something went wrong. Please try later.')
            }
        }

        if (month && year) {
            renderReport()
        }
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

    return (
        <>
            <Header />
            <Siderbar activeMenu={'Attendance Report'} />
            <a href="#" className="back-to-top d-flex align-items-center justify-content-center">
                <i className="bi bi-arrow-up-short"></i>
            </a>

            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Attendance Report</h1>
                </div>
                <section className="section">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container d-flex flex-column align-items-center mt-2">
                                    <div className="row g-3 justify-content-center mb-4 mt-3">
                                        <div className="col-auto">
                                            <label htmlFor="student" className="visually-hidden">Student</label>
                                            <input type="text" className="form-control" id="student" 
                                            disabled />
                                        </div>
                                    </div>
                                    <div className="row g-3 justify-content-center mb-5">
                                        <div className="col-auto">
                                            <label htmlFor="month" className="visually-hidden">Month</label>
                                            <select className="form-select" id="month" value={month} 
                                                onChange={e => setMonth(e.target.value)}>
                                                {[...Array(12).keys()].map(m => (
                                                    <option 
                                                        key={m} value={m + 1}>{new Date(0, m).toLocaleString('en', { month: 'long' })}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-auto">
                                            <label htmlFor="year" className="visually-hidden">Year</label>
                                            <select className="form-select" id="year" value={year} onChange={e => setYear(e.target.value)}>
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
                                    <div className="col-12 d-flex justify-content-center alignCal">
                                        <div className="container" style={{ width: '440px' }}>
                                            <div className="row text-center fw-bold">
                                                {daysOfWeek.map((day, index) => (
                                                    <div key={index} className="col border py-2">{day}</div>
                                                ))}
                                            </div>
                                            {Array.from({ length: Math.ceil(dateLabel.length / 7) }).map((_, rowIndex) => (
                                                <div className="row" key={rowIndex}>
                                                    {dateLabel.slice(rowIndex * 7, rowIndex * 7 + 7).map((date, colIndex) => {
                                                        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`
                                                        const attendanceRecord = attendanceData.find((val) => val.date === formattedDate)
                                                        let bgColor = ""
                                                        if (attendanceRecord) {
                                                            bgColor = attendanceRecord.status === 1 ? "green" : "red"
                                                        }

                                                        return (
                                                            <div key={colIndex} className="col border 
                                                            text-center py-2" style={{ backgroundColor: bgColor }}>
                                                                {date}
                                                            </div>
                                                        )
                                                    })}

                                                    {Array.from({ length: 7 - dateLabel.slice(rowIndex * 7, rowIndex * 7 + 7).length }).map((_, extraIndex) => (
                                                        <div key={`empty-${extraIndex}`} className="col border text-center py-2"></div>
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
                                            <button type="button" className="btn btn-primary btn-sm">Download Report</button>
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
    )
}

export default Report
