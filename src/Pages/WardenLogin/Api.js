import { appUrl } from '../../config/index'

var headers = new Headers()
headers.append("Content-Type", "application/json")
var formdata = new FormData()

export async function  authentication(email, password) {
    try {
        const raw = JSON.stringify({
            "emailId": email,
            "password": password
        })

        const requestOptions = {
            method: "POST",
            credentials: 'include',
            headers,
            body: raw
        }

        const response = await fetch(`${appUrl}/api/login/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readBlockCount() {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            credentials: 'include',
            headers: myHeaders
        }

        const response = await fetch(`${appUrl}/api/block/blockcount/block/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readBlockFloorCount() {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            credentials: 'include',
            headers: myHeaders
        }

        const response = await fetch(`${appUrl}/api/blockfloor/blockfloorcount/floor/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readRoomCount() {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            credentials: 'include',
            headers: myHeaders,
        }

        const response = await fetch(`${appUrl}/api/room/roomcount/room/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readStudentCount() {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            credentials: 'include',
            headers: myHeaders,
        }

        const response = await fetch(`${appUrl}/api/student/studentcount/student/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readWardenCount() {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            credentials: 'include',
            headers: myHeaders
        }

        const response = await fetch(`${appUrl}/api/warden/wardencount/warden/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readCourseCount() {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            credentials: 'include',
            headers: myHeaders,
        }

        const response = await fetch(`${appUrl}/api/course/coursecount/course/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readBlocks(limit, pageNo, sortColumn, sortOrder, searchText) {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        let url = `${appUrl}/api/block/?limit=${limit}&page=${pageNo}&orderby=bk.${sortColumn}&sort=${sortOrder}`
        if (searchText) {
            url += `&search=${searchText.trim()}`
        }

        const response = await fetch(url, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readBlockById(blockId) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/block/${blockId}`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function saveOrUpdateBlock(blockId, payload) {
    try {
        const requestOptions = {
            method: blockId ? "PUT" : "POST",
            headers,
            body: JSON.stringify(payload),
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/block${blockId ? `/${blockId}/` : "/"}`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function deleteBlockById(blockId) {
    try {
        var requestOptions = {
            method: 'DELETE',
            credentials: 'include'
        }
        
        const response = await fetch(`${appUrl}/api/block/${blockId}/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readBlockFloors(limit, pageNo, sortColumn, sortOrder, searchText) {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        let url = `${appUrl}/api/blockfloor/?limit=${limit}&page=${pageNo}&orderby=${sortColumn}&sort=${sortOrder}`
        if (searchText) {
            url += `&search=${searchText.trim()}`
        }

        const response = await fetch(url, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readFloorById(floorId) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/blockfloor/${floorId}/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function readBlockCodes() {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',  
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/block/blockfloor/blockcodecount/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function saveOrUpdateFloor(floorId, payload) {
    try {
        const requestOptions = {
            method: floorId ? "PUT" : "POST",
            headers,
            body: JSON.stringify(payload),
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/blockfloor${floorId ? `/${floorId}/` : "/"}`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function deleteFloorById(floorId) {
    try {
        var requestOptions = {
            method: 'DELETE',
            credentials: 'include'
        }
        
        const response = await fetch(`${appUrl}/api/blockfloor/${floorId}`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readRooms(limit, pageNo, sortColumn, sortOrder, searchText) {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        let url = `${appUrl}/api/room/?limit=${limit}&page=${pageNo}&orderby=${sortColumn}&sort=${sortOrder}`
        if (searchText) {
            url += `&search=${searchText.trim()}`
        }

        const response = await fetch(url, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readRoomById(roomId) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/room/${roomId}/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function saveOrUpdateRoom(roomId, payload) {
    try {
        const requestOptions = {
            method: roomId ? "PUT" : "POST",
            headers,
            body: JSON.stringify(payload),
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/room${roomId ? `/${roomId}/` : "/"}`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function deleteRoomById(roomId) {
    try {
        var requestOptions = {
            method: 'DELETE',
            credentials: 'include'
        }
        
        const response = await fetch(`${appUrl}/api/room/${roomId}`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readFloorNumbers(blockId, blockFloor = false) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        let url = `${appUrl}/api/blockfloor/floornumber/?blockId=${blockId}`
        if(blockFloor === true) {
            url += '&blockFloor=true'
        } 
        const response = await fetch(url, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function readCourses(limit, pageNo, sortColumn, sortOrder, searchText) {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        let url = `${appUrl}/api/course/`
        if (limit !== undefined && pageNo !== undefined && sortColumn && sortOrder) {
            url += `?limit=${limit}&page=${pageNo}&orderby=c.${sortColumn}&sort=${sortOrder}`
        }

        if (searchText) {
            url += `&search=${searchText.trim()}`
        }

        const response = await fetch(url, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}


// export async function readCourses(limit, pageNo, sortColumn, sortOrder, searchText) {  
//     try {
//         var myHeaders = new Headers()
//         var requestOptions = {
//             method: 'GET',
//             headers: myHeaders,
//             credentials: 'include'
//         }

//         let url = `${appUrl}/api/course/?limit=${limit}&page=${pageNo}&orderby=c.${sortColumn}&sort=${sortOrder}`
//         if (searchText) {
//             url += `&search=${searchText.trim()}`
//         }

//         const response = await fetch(url, requestOptions)
//         return {
//             response,
//             error: null,
//         }
//     } catch (error) {
//         return {
//             response: null,
//             error: 'Something went wrong. Please try again later.'
//         }
//     } 
// }

export async function readCourseById(courseId) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/course/${courseId}/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function saveOrUpdateCourse(courseId, payload) {
    try {
        const requestOptions = {
            method: courseId ? "PUT" : "POST",
            headers,
            body: JSON.stringify(payload),
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/course${courseId ? `/${courseId}/` : "/"}`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function deleteCourseById(courseId) {
    try {
        var requestOptions = {
            method: 'DELETE',
            credentials: 'include'
        }
        
        const response = await fetch(`${appUrl}/api/course/${courseId}`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readStudents(limit, pageNo, sortColumn, sortOrder, searchText) {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        let url = `${appUrl}/api/student/?limit=${limit}&page=${pageNo}&orderby=s.${sortColumn}&sort=${sortOrder}`
        if (searchText) {
            url += `&search=${searchText.trim()}`
        }

        const response = await fetch(url, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readStudentById(studentId) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/student/${studentId}/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function saveOrUpdateStudent(studentId, payload) {
    try {
        const requestOptions = {
            method: studentId ? "PUT" : "POST",
            headers,
            body: JSON.stringify(payload),
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/student${studentId ? `/${studentId}/` : "/"}`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function deleteStudentById(studentId) {
    try {
        var requestOptions = {
            method: 'DELETE',
            credentials: 'include'
        }
        
        const response = await fetch(`${appUrl}/api/student/${studentId}`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function updateStudentImage(studentId, file) {
    try {
        formdata.append("studentImage", file)

        var requestOptions = {
            method: 'PUT',
            body: formdata,
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/student/${studentId}/editimage/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function deleteStudentImage(studentId) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/student/${studentId}/deleteimage/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readRoomNumbers(floorId) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        let url = `${appUrl}/api/room/roomnumber/?blockFloorId=${floorId}`
        
        const response = await fetch(url, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function readWardens(limit, pageNo, sortColumn, sortOrder, searchText) {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        let url = `${appUrl}/api/warden/?limit=${limit}&page=${pageNo}&orderby=w.${sortColumn}&sort=${sortOrder}`
        if (searchText) {
            url += `&search=${searchText.trim()}`
        }

        const response = await fetch(url, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readWardenById(wardenId) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/warden/${wardenId}/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function deleteWardenById(wardenId) {
    try {
        var requestOptions = {
            method: 'DELETE',
            credentials: 'include'
        }
        
        const response = await fetch(`${appUrl}/api/warden/${wardenId}`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function saveOrUpdateWarden(wardenId, payload) {
    const method = wardenId ? "PUT" : "POST"
    let requestBody
    let headers = {}

    if (payload.image) {
        const formData = new FormData()
        formData.append("firstName", payload.firstName)
        formData.append("lastName", payload.lastName)
        formData.append("dob", payload.dob)
        formData.append("emailId", payload.emailId)
        formData.append("superAdmin", payload.superAdmin)
        formData.append("password", payload.password)

        if (payload.image) {
            formData.append("image", payload.image)
        }
        requestBody = formData
    } else {
        headers = { "Content-Type": "application/json" }
        const updatePayload = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            dob: payload.dob,
            emailId: payload.emailId,
            superAdmin: payload.superAdmin,
            password: payload.password
        }
        requestBody = JSON.stringify(updatePayload)
    }

    try {
        const requestOptions = {
            method,
            body: requestBody,
            headers: payload.image ? undefined : headers,
            credentials: "include",
        };

        const response = await fetch(
            `${appUrl}/api/warden${wardenId ? `/${wardenId}/` : "/"}`,
            requestOptions
        )

        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: "Something went wrong. Please try again later.",
        }
    }
}

export async function readAttendances(limit, pageNo, sortColumn, sortOrder, searchText) {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        let url = `${appUrl}/api/attendance/?limit=${limit}&page=${pageNo}&orderby=${sortColumn}&sort=${sortOrder}`
        if (searchText) {
            url += `&search=${searchText.trim()}`
        }

        const response = await fetch(url, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readAttendanceById(attendanceId) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/attendance/${attendanceId}/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function populateBlockCode(checkIn) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/attendance/block?date=${checkIn}/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function populateFloorNumber(checkIn, blockId) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/attendance/blockfloor?date=${checkIn}&blockId=${blockId}/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function populateRoomNumber(checkIn, floorId) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/attendance/room?date=${checkIn}&blockFloorId=${floorId}/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function fetchStudents(roomId, checkIn) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/attendance/student/${roomId}?checkIn=${checkIn}/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }  
}

export async function saveOrUpdateAttendance(finalBlockId, finalBlockFloorId, finalRoomId, payload) {
    try {
        const requestOptions = {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/attendance/${finalBlockId}/${finalBlockFloorId}/${finalRoomId}`,
            requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function updateImage(file, wardenId) {
    try {
        var formdata = new FormData()
        formdata.append("image", file)

        var requestOptions = {
            method: 'PUT',
            body: formdata,
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/warden/${wardenId}/editavatar/`, requestOptions)
        return {
            response,
            error: null
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }
}

export async function deleteImage(wardenId) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/warden/${wardenId}/deleteavatar`, requestOptions)

        return {
            response,
            error: null
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }
}   

export async function readWardenDetails(wardenId) {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }
    
        const response = await fetch(`${appUrl}/api/warden/${wardenId}?date=${Date.now()}`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}


export async function editUserData(wardenId, payload) {
    try {
        const requestOptions = {
            method: "PUT",
            headers,
            body: JSON.stringify(payload),
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/warden/edituserwarden/${wardenId}/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function changePassword(wardenId, payload) {
    try {
        const requestOptions = {
            method: "PUT",
            headers,
            body: JSON.stringify(payload),
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/warden/changepassword/${wardenId}/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function generateOtp(payload) {
    try {
        const requestOptions = {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/warden/generateotp/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export const resetPassword = async (payload) => { 
    try {
        const requestOptions = {
            method: "PUT",
            headers,
            body: JSON.stringify(payload),
            credentials: 'include'
        }

        const response = await fetch(`${appUrl}/api/warden/resetpassword/`, requestOptions)
        return {
            response,
            error: null,
        }
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    } 
}

export async function readStudentNameAndRegNo() {
    try {
        const response = await fetch(`${appUrl}/api/student/getstudent/`, {
            method: 'GET',
            credentials: 'include'
        })

        return {
            response,
            error: null,
        } 
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }
}


export async function report(month, year, studentName) {
    try {
        const response = await fetch(`${appUrl}/api/attendance/studentattendancereport/?month=${month}&year=${year}&studentName=${studentName}`, {
            method: 'GET',
            credentials: 'include'
        })

        return {
            response,
            error: null,
        } 
    } catch (error) {
        return {
            response: null,
            error: 'Something went wrong. Please try again later.'
        }
    }
}



