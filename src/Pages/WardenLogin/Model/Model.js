import { useRef, forwardRef, useImperativeHandle, useState } from "react";

const DetailsModal = forwardRef((_, ref) => {
    const modalRef = useRef(null)
    let modalInstance = null
    const [modalData, setModalData] = useState(null)
    const [fields, setFields] = useState([])

    const block = [
        { label: "Block Code", key: "blockCode" },
        { label: "Location", key: "blockLocation" },
        { label: "Status", key: "isActive", format: (val) => (val === 1 ? "Active" : "Inactive") },
        { label: "Created At", key: "createdTimeStamp" },
        { label: "Created By", key: "createdFirstName", key2: "createdLastName" },
        { label: "Updated At", key: "updatedTimeStamp" },
        { label: "Updated By", key: "updatedFirstName", key2: "updatedLastName", fallback: "---" }
    ]

    const floor = [
        { label: "Floor Number", key: "floorNumber" },
        { label: "Block Code", key: "blockCode" },
        { label: "Location", key: "floorLocation" },
        { label: "Status", key: "isActive", format: (val) => (val === 1 ? "Active" : "Inactive") },
        { label: "Created At", key: "createdTimeStamp" },
        { label: "Created By", key: "createdFirstName", key2: "createdLastName" },
        { label: "Updated At", key: "updatedTimeStamp" },
        { label: "Updated By", key: "updatedFirstName", key2: "updatedLastName", fallback: "---" }
    ]

    useImperativeHandle(ref, () => ({
        openModal: (data, type) => {
            const selectedFields = type === "block" ? block : floor
            setFields(selectedFields)
            setModalData(data)

            if (modalRef.current) {
                modalInstance = new window.bootstrap.Modal(modalRef.current)
                modalInstance.show()
            }
        }
    }))

    return (
        <div 
            ref={modalRef} 
            className="modal fade" 
            tabIndex="-1" 
            aria-hidden="true"
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
                                    : modalData[key] || fallback || "";

                                return (
                                    <div 
                                        className="row" 
                                        key={label}
                                    >
                                        <div className="col-sm-4"><strong>{label}</strong></div>
                                        <div className="col-sm-8">: {value} {key2 ? modalData[key2] || "" : ""}</div>
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
