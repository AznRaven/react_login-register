import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080'
});

export async function userInfo() {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.get('/api/v1/user')
        return response.data
    } catch(err) {
        console.log(err)
        localStorage.removeItem("token")
        alert(err.response?.data?.error)
        return {}
    }
}