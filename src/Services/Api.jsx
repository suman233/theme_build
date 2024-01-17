import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_URL,
})

axiosInstance.interceptors.request.use(
    async function (config){
        const token=localStorage.getItem('token') || sessionStorage.getItem('token')
        if(token !== null || token!==undefined){
            config.headers["x-access-token"]=token
        }
        return config
    },
    function (error){
        return Promise.reject(error)
    }

)