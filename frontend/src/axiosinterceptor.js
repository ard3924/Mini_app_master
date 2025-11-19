import axios from "axios"

const axiosInstance = axios.create({
    baseURL:  "http://localhost:5000/api",
    // baseURL:  "/api",

});


axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("jwt_token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



export default axiosInstance;