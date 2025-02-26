import { wardenAppUrl } from '../../config/index'

var headers = new Headers()
headers.append("Content-Type", "application/json")

export async function generateOtp(email) {
    try {
        var raw = JSON.stringify({
            "emailId": email 
        })
        var requestOptions = {
            method: 'POST',
            headers,
            body: raw,
            credentials: 'include'
        }
        const response = await fetch(`${wardenAppUrl}/student/api/student/generateotp/`, requestOptions)
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

export async function verifyOtpAndLogin(otp) {
    try {
        var raw = JSON.stringify({
            "otp": otp
        })

        var requestOptions = {
            method: 'PUT',
            headers,
            body: raw,
            credentials: 'include'
        }

        const response = await fetch(`${wardenAppUrl}/student/api/student/verifyotp/authentication/`, requestOptions)
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

export async function report(month, year) {
    try {
        const response = await fetch(`${wardenAppUrl}/student/api/student/attendancereport?month=${month}&year=${year}`, {
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

export async function updateImage(file) {
    try {
        var formdata = new FormData()
        formdata.append("studentImage", file)

        var requestOptions = {
            method: 'PUT',
            body: formdata,
            credentials: 'include'
        }

        const response = await fetch(`${wardenAppUrl}/student/api/student/editimage`, requestOptions)
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

export async function deleteImage() {
    try {
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            credentials: 'include'
        }

        const response = await fetch(`${wardenAppUrl}/student/api/student/deleteimage`, requestOptions)

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

export async function logout() {
    try {
        const response = await fetch(`${wardenAppUrl}/student/api/student/logout`, {
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
            error:  'Something went wrong. Please try again later.'
        } 
    }
  }