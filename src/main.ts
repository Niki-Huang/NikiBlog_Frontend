// 引入
import { createApp } from 'vue'
import router from './router'
import "@/assets/icons/iconfont.js" // 阿里图标库
import 'animate.css'; // 动画

// 组件
import App from './App.vue'

// 实例
const app = createApp(App)

// 路由
app.use(router)

//挂载
app.mount('#app')
