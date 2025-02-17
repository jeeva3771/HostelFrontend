const formatDate = (dateString) => {
    const months = {
        Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
        Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    }

    const parts = dateString.split('-')
    const year = '20' + parts[0]
    const month = months[parts[1]]
    const day = parts[2].replace(/\D/g, '')

    const dayFormatted = day.padStart(2, '0')

    return `${year}-${month}-${dayFormatted}`
};

export default formatDate