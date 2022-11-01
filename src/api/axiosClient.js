import axios from "axios"
import queryString from 'query-string'

const baseUrl = process.env.REACT_APP_BASE_API;

const axiosClient = axios.create({
    baseURL: baseUrl,
    paramsSerializer: params => queryString.stringify({params}),
    timeout: 5000
})

axiosClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
        }
    }
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) return response.data
    return response
}, (err) => {
    if (!err.response) {
        throw(new Error("No internet connection."))
    }
    throw err
})

export default axiosClient