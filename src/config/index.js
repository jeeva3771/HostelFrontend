const {
    WARDENAPP_API_URL : wardenAppUrl = 'http://localhost:1005',
    STUDENTAPP_API_URL : studentAppUrl = 'http://localhost:1006',
} = process.env

module.exports = {
    wardenAppUrl,
    studentAppUrl
}
