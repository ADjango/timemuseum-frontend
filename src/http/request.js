import axios from "axios";
import { store } from "../redux/store";

const service = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 200 * 1000
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("进入请求拦截器");
    console.log(config)
    if (!config.url.startsWith('/public/') && !config.url.startsWith('/auth')) {
        if (store.getState().userCredential.jwtToken.length == 0)
            window.location.href = "/login"
    }

    if(config.url === '/public/file/uploadFile'){
        config.headers = {
            'Content-Type': 'multipart/form-data', //配置请求头
            'authentication': store.getState().userCredential.jwtToken
        }
    }else {
        config.headers = {
        'Content-Type': 'application/json', //配置请求头
        // 'Content-Type': 'multipart/form-data', //配置请求头
        'authentication': store.getState().userCredential.jwtToken
    }
    }

    

    // config.headers.Authorization = store.getState().userCredential.jwtToken;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log("进入响应拦截器");
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service