import axios from 'axios'
import { Message } from 'element-ui'
import sessionStorage from "../utils/sessionStorage";

// 初始化设定请求参数
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 创建一个 axios 实例
const http = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/' : '/',
    timeout: 10000,
    withCredentials: true
});

// 请求拦截器
http.interceptors.request.use(
    config => {
        config.transformRequest = [function (data) {
            let t =new Date().getTime()
            let n = getHash(sessionStorage.getItem('req_hash'))
            let src = 'sta=json&isAjaxRequest=true&token=' + window.localStorage.getItem('token') + '&t='+t+'&_h='+n+'&'
            for (let item in data) {
                src += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
            }
            return src
        }];
        return config;
    },
    error => {
        let config = error.config;
        if (!config || !config.retry) return Promise.reject(error);
        config.__retryCount = config.__retryCount || 0;
        if (config.__retryCount >= config.retry) return Promise.reject(error);
        config.__retryCount += 1;
        // 发送失败
        let backOff = new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, config.retryDelay || 1);
        });
        return backOff.then(() => {
            return axios(config);
        });
    }
);

function getHash(hash) {
    let str = hash.substring(2, 10); // e 对象 hash
    let s24 = str2Ascii(str);
    let dd = new Date().getTime(); // new Date().getTime()
    let dds = binary(dd,10,36);
    let e24 = str2Ascii(dds);
    return (s24 + e24)
}
function binary (num, m, n) {
    let s = num + '';
    return parseInt(s, m).toString(n);
}
function str2Ascii (str) {
    let rel = "";
    for (let s of str) {
        rel += Number(s.charCodeAt(0)) * 4
    }
    return rel;
}

// 响应拦截器
http.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        if (error && error.response) {
            showError(error);
        }
        return Promise.reject(error);
    }
);

// 显示错误
function showError (err) {
    if (process.env.NODE_ENV === "development") {
        console.log(err);
    }
    // 显示提示
    Message({
        message: err.message || err.msg,
        type: 'error'
        // duration: 5 * 1000
    })
}

export default http
