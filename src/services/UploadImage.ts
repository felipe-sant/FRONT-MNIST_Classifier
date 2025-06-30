import axios from "axios"

async function uploadFile(formData: FormData) {
    try {
        const response = await axios.post("https://api-mnistclassifier.vercel.app/ia/predict", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return response.data.predict as number
    } catch (error) {
        console.error(error)
        return undefined
    }
}

export default uploadFile