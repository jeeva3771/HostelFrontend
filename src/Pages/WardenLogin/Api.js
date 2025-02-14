import { wardenAppUrl } from '../../config/index'

var headers = new Headers()
headers.append("Content-Type", "application/json")

export async function Authentication(email, password) {
    try {
        const raw = JSON.stringify({
            "emailId": email,
            "password": password
        })

        const requestOptions = {
            method: "POST",
            headers,
            body: raw,
            credentials: 'include'
        }

        const response = await fetch(`${wardenAppUrl}/api/login/`, requestOptions)
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
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${wardenAppUrl}/api/block/blockcount/block/`, requestOptions)
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
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${wardenAppUrl}/api/blockfloor/blockfloorcount/floor/`, requestOptions)
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
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${wardenAppUrl}/api/room/roomcount/room/`, requestOptions)
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
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${wardenAppUrl}/api/student/studentcount/student/`, requestOptions)
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
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${wardenAppUrl}/api/warden/wardencount/warden/`, requestOptions)
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
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${wardenAppUrl}/api/course/coursecount/course/`, requestOptions)
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

        let url = `${wardenAppUrl}/api/block/?limit=${limit}&page=${pageNo}&orderby=bk.${sortColumn}&sort=${sortOrder}`
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

        const response = await fetch(`${wardenAppUrl}/api/block/${blockId}`, requestOptions)
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

export async function editBlockById(blockId, payload) {
    try {
        const requestOptions = {
            method: blockId ? "PUT" : "POST",
            headers,
            body: JSON.stringify(payload),
            credentials: 'include'
        }

        const response = await fetch(`${wardenAppUrl}/api/block${blockId ? `/${blockId}/` : "/"}`, requestOptions)
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
        
        const response = await fetch(`${wardenAppUrl}/api/block/${blockId}/`, requestOptions)
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

export async function readFloors(limit, pageNo, sortColumn, sortOrder, searchText) {  
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        let url = `${wardenAppUrl}/api/blockfloor/?limit=${limit}&page=${pageNo}&orderby=${sortColumn}&sort=${sortOrder}`
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

        const response = await fetch(`${wardenAppUrl}/api/blockfloor/${floorId}/`, requestOptions)
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

        const response = await fetch(`${wardenAppUrl}/api/block/blockfloor/blockcodecount/`, requestOptions)
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

export async function editFloorById(floorId, payload) {
    try {
        const requestOptions = {
            method: floorId ? "PUT" : "POST",
            headers,
            body: JSON.stringify(payload),
            credentials: 'include'
        }

        const response = await fetch(`${wardenAppUrl}/api/blockfloor${floorId ? `/${floorId}/` : "/"}`, requestOptions)
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
        
        const response = await fetch(`${wardenAppUrl}/api/blockfloor/${floorId}`, requestOptions)
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

        let url = `${wardenAppUrl}/api/room/?limit=${limit}&page=${pageNo}&orderby=${sortColumn}&sort=${sortOrder}`
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

        const response = await fetch(`${wardenAppUrl}/api/room/${roomId}/`, requestOptions)
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

export async function editRoomById(roomId, payload) {
    try {
        const requestOptions = {
            method: roomId ? "PUT" : "POST",
            headers,
            body: JSON.stringify(payload),
            credentials: 'include'
        }

        const response = await fetch(`${wardenAppUrl}/api/room${roomId ? `/${roomId}/` : "/"}`, requestOptions)
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
        
        const response = await fetch(`${wardenAppUrl}/api/room/${roomId}`, requestOptions)
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

export async function readBlockFloors(blockId, blockFloor = false) {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        }

        let url = `${wardenAppUrl}/api/blockfloor/floornumber/?blockId=${blockId}`
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


