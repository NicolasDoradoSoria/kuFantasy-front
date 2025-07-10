import { jwtTokenKey } from "@/router/context/authGuard"
import axios from 'axios'

const API_URL = 'http://localhost:8080/'

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem(jwtTokenKey)

    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export default axiosClient