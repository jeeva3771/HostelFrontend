import { useRef, forwardRef, useImperativeHandle, useState, useEffect } from "react"

const DetailsModal = forwardRef((_, ref) => {
    const modalRef = useRef(null)
    const [modalData, setModalData] = useState(null)
    const [fields, setFields] = useState([])
    const defaultLabel = [
        { label: "Created At", key: "createdTimeStamp" },
        { label: "Created By", key: "createdFirstName", key2: "createdLastName" },
        { label: "Updated At", key: "updatedTimeStamp" },
        { label: "Updated By", key: "updatedFirstName", key2: "updatedLastName", fallback: "---" }
    ]

    const block = [
        { label: "Block Code", key: "blockCode" },
        { label: "Location", key: "blockLocation" },
        { label: "Status", key: "isActive", format: (val) => (val === 1 ? "Active" : "Inactive") }
    ]

    const floor = [
        { label: "Block Code", key: "blockCode" },
        { label: "Floor Number", key: "floorNumber" },
        { label: "Status", key: "isActive", format: (val) => (val === 1 ? "Active" : "Inactive") }
    ]

    const room = [
        { label: "Block Code", key: "blockCode" },
        { label: "Floor Number", key: "floorNumber" },
        { label: "Room Number", key: "roomNumber" },
        { label: "Room Capacity", key: "roomCapacity" },
        { label: "Status", key: "isActive", format: (val) => (val === 1 ? "Active" : "Inactive") },
        { label: "Air Conditioner", key: "isAirConditioner", format: (val) => (val === 1 ? "Yes" : "No") }
    ]

    const course = [
        { label: "Course Name", key: "courseName" }
    ]

    const student = [
        { label: "Name", key: "name" },
        { label: "RegNo", key: "registerNumber" },
        { label: "Room Number", key: "roomNumber" },
        { label: "Floor Number", key: "floorNumber" },
        { label: "Block Code", key: "blockCode" },
        { label: "DOB", key: "birth" },
        { label: "Course Name", key: "courseName" },
        { label: "Joined Date", key: "joinDate" },
        { label: "Phone Number", key: "phoneNumber" },
        { label: "Email Id", key: "emailId" },
        { label: "Father Name", key: "fatherName" },
        { label: "Father Number", key: "fatherNumber" },
        { label: "Address", key: "address" }
    ]

    const warden = [
        { label: "First Name", key: "firstName" },
        { label: "Last Name", key: "lastName" },
        { label: "DOB", key: "birth" },
        { label: "Email Id", key: "emailId" },
        { label: "Super Admin", key: "superAdmin", format: (val) => (val === 1 ? "Admin" : "---") }
    ]

    const attendance = [
        { label: "Name", key: "name" },
        { label: "Register Number", key: "registerNumber" },
        { label: "Check-in Date", key: "checkIn" },
        { label: "Block Code", key: "blockCode" },
        { label: "Floor Number", key: "floorNumber" },
        { label: "Room Number", key: "roomNumber" },
        { label: "Is Present", key: "isPresent", format: (val) => (val === 1 ? "Present" : "Absent")},
        { label: "Reviewed At", key: "createdTimeStamp" },
        { label: "Reviewed By", key: "reviewedWardenFirstName", key2: "reviewedWardenLastName" },
        { label: "Updated At", key: "updatedTimeStamp" },
        { label: "Updated By", key: "updatedFirstName", key2: "updatedLastName", fallback: "---" }
    ]

    useImperativeHandle(ref, () => ({
        openModal: (data, type) => {
            let selectedFields
            switch (type) {
                case "block":
                    selectedFields = block
                    break
                case "floor":
                    selectedFields = floor
                    break
                case "room":
                    selectedFields = room
                    break
                case "course":
                    selectedFields = course
                    break
                case "student":
                    selectedFields = student
                    break
                case "warden":
                    selectedFields = warden
                    break
                case "attendance":
                    selectedFields = attendance
                    break
                default: 
                    selectedFields = []
            }
                
            if (type === "attendance") {
                setFields(selectedFields)
            } else {
                setFields([...selectedFields, ...defaultLabel])
            }
            
            setModalData(data)
        }
    }))

    useEffect(() => {
        if (modalData && modalRef.current) {
            const modalInstance = new window.bootstrap.Modal(modalRef.current)
            modalInstance.show()
        }
    }, [modalData])

    return (
        <div 
            ref={modalRef} 
            className="modal fade" 
            tabIndex="-1" 
        >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Full Details</h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            data-bs-dismiss="modal"
                        >
                        </button>
                    </div>
                    <div className="modal-body">
                        {modalData ? (
                            fields.map(({ label, key, key2, format, fallback }) => {
                                const value = format 
                                ? format(modalData[key]) 
                                : key === ("createdFirstName" || "reviewedWardenFirstName" ) || key === ("updatedFirstName" || "reviewedWardenLastName")
                                ? modalData[key]?.charAt(0).toUpperCase() + modalData[key]?.slice(1) || fallback || ""
                                : modalData[key] || fallback || ""

                                return (
                                    <div 
                                        className="row" 
                                        key={label}
                                    >
                                        <div className="col-sm-4">
                                            <strong>{label}</strong>
                                        </div>
                                        <div className="col-sm-8">: {value}{key2 ? modalData[key2] || "" : ""}</div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No data available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
})

export default DetailsModal
