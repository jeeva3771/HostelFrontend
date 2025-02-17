// const handleFileChange = async (event, wardenId) => {
//         const file = event.target.files[0]
//         if (!file) {
//             alert("Please select an image first!")
//             return
//         }

//         try {
//             const { response, error } = await updateWardenImage(wardenId, file)

//             if (error) {
//                 alert(error)
//                 return
//             }

//             if(response.ok) {
//                 setWardenImages(prevImages => ({
//                     ...prevImages,
//                     [wardenId]: `${wardenAppUrl}/api/warden/${wardenId}/avatar?date=${Date.now()}`
//                 }))
//                 alert("Image updated successfully!")
//             } else if (response.status === 400) {
//                 alert(await response.text())
//             } 

//         } catch (error) {
//             alert('Something went wrong.Please try later')
//         }
//     }

//     const handleRemoveImage = async (wardenId) => {
//         try {
//             const { response, error } = await deleteWardenImage(wardenId)

//             if (error) {
//                 alert(error)
//                 return
//             }

//             if (response.ok) {
//                 setWardenImages(prevImages => ({
//                     ...prevImages,
//                     [wardenId]: `${wardenAppUrl}/api/warden/${wardenId}/avatar?date=${Date.now()}`
//                 }))
//             } else {
//                 alert('Not deleted')
//             }
//         } catch(error) {
//             alert('Something went wrong.Please try later')
//         }
//     }