import { customAxios, customAxiosWithAuth } from './api'

export async function userLogin(user) {
    const axios = customAxios()
    try {
        const response = await axios.post('/api/v1/auth/authenticate', user)
        return response.data.token
    } catch(err) {
        console.log(err)
        alert(err.response?.data?.error)
    }
}

export async function userRegister(user) {
    const axios = customAxios()
    try {
        const response = await axios.post('/api/v1/auth/register', user)
        return response.data.token
    } catch(err) {
        console.log(err)
        alert(err.response?.data?.error)
    }
}

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
