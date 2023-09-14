import http from "./http";

// get请求
function getRequest(url, params) {
    return http.get(`${url}`, params)
}
// post请求
function postRequest(url, params) {
    return http.post(`${url}`, params)
}

// put 请求
function putRequest(url, params) {
    return http.put(`${url}`, params)
}
// delete 请求
function deleteRequest(url, params) {
    return http.delete(`${url}`, params)
}

export default {
    getRequest,
    putRequest,
    postRequest,
    deleteRequest
}