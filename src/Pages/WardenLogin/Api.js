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
            body: raw
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
            headers: myHeaders
        }

        const response = await fetch(`${wardenAppUrl}/api/block/blockcount/block`, requestOptions)
        console.log(response)
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
