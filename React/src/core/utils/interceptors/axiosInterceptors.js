import axios from "axios";
import { BASE_API_URL } from "../../../environment/environment";

const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
  });

axiosInstance.interceptors.request.use(
    (config) => {
        //console.log('Request Interceptor: Request made with config:', config.data);
        return config;
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        //console.log('Response Interceptor: Response received with data:', response.data);
        return response.data;
    },
    (error) => {
        //console.log('Response Interceptor: Response error:', error);
        return Promise.reject(error.response.data);
    }
);

export default axiosInstance;
