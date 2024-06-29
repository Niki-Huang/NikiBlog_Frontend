import { SERVERCONFIG } from "@/config";
import axios from "axios";
import NProgress from "nprogress";

// 创建实例
const myaxios = axios.create({
    // 服务器地址
    baseURL: SERVERCONFIG.PATH,
    // 请求头
    headers: {},
});

// 拦截器
myaxios.interceptors.request.use(
    (config) => {
        // 开启进度条
        NProgress.start();
        return config;
    },
    (error) => {
        NProgress.done(); //结束
        return Promise.reject(error);
    }
);

myaxios.interceptors.response.use(
    (response) => {
        // 结束进度条
        NProgress.done();
        // 拆包
        response = response.data
        return response;
    },
    (err) => {
        // 结束
        NProgress.done();
        // 组装错误信息
        if (err.response.data.constructor === Object)
            err = err.response.data.msg
        else if (err.response.status === 404)
            err = '操作失败（可能是请求方法或路径错误）'
        else
            err = '操作失败'
        return Promise.reject(err);
    }
);

export default myaxios;
