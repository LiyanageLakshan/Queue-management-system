import axios from 'axios';

import { toast } from 'react-toastify';

axios.interceptors.request.use(function(config) {
    config.headers['authorization'] = 'Bearer '+ localStorage.getItem('token')
    return config;
}, function(error){
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response){
    return response;
},function(error){
    if(error.response.status ===500){
        return toast.error(error.response.data)

    }
    if(error.response.status === 401){
        localStorage.clear()
        window.location="/";

    }
    return Promise.reject(error);
});

export default axios