import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/',
});

axiosClient.interceptors.request.use(
    error => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosClient;