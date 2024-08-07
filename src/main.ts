// 引入
import { createApp } from 'vue'
import router from './router'
import pinia from './store'
import "@/assets/icons/iconfont.js" // 阿里图标库
import 'animate.css'; // 动画样式
import 'md-editor-v3/lib/style.css'; // md编辑器样式
import "nprogress/nprogress.css"; // 进度条样式
import 'izitoast/dist/css/iziToast.min.css' // 小弹窗样式


// 组件
import App from './App.vue'

// 实例
const app = createApp(App)

// 插件
app.use(router)
app.use(pinia)

//挂载
app.mount('#app')
