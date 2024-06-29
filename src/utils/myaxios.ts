import { SERVERCONFIG } from "@/config";
import axios from "axios";

// 创建实例
const myaxios = axios.create({
    // 服务器地址
    baseURL: SERVERCONFIG.PATH,
    // 请求头
    headers: {},
});

export default myaxios;
