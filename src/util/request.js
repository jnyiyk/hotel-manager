//请求相关
import axios from 'axios'
import Nprogress from "nprogress";
//初始化
import {BASE_URL} from '../config/conster.js'

var instance = axios.create({
    //请求地址前缀
    baseURL: BASE_URL, ///<<<config中配置，禁止写固定值
    timeout: 1000,
    //headers: {'X-Custom-Header': 'foobar'}
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    Nprogress.start();
    return config;
}, function (error) {
    // 对请求错误做些什么
    Nprogress.done();
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    Nprogress.done();
    return response;
}, function (error) {
    // 对响应错误做点什么
    Nprogress.done();
    return Promise.reject(error);
});

//封装get请求方法
export let $get = async (url, params) => {
    let {data} = await instance.get(url, {params:params})
    return data
}
//封装post请求方法
export let $post = async (url, params) => {
    let {data} = await instance.post(url, params)
    return data
}
//设置Token，该方法将浏览器缓存中的token信息添加到请求头
export let $setToken=()=>{
    instance.defaults.headers.common['token'] = sessionStorage.getItem('token');
}

