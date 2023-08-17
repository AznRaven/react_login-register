import axios from 'axios';

const baseURL = 'http://localhost:8080'
    // process.env.NODE_ENV === 'development'
    // ?
    // 'http://localhost:8080'  // Development URL
    // :
    // 'http://example.com'  // Production URL
    // process.env.REACT_APP_BASE_URL 

export function customAxios() {
    return axios.create({ 
        baseURL,
        headers: {
            "Content-Type": "application/json"
        }, 
    });
}

export function customAxiosWithAuth() {
    return axios.create({ 
        baseURL, 
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}
