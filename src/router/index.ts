import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Blog from "@/pages/Blog.vue"

const router = createRouter({
    // 路由器的工作模式选用history
    history: createWebHistory(),
    // 创建一个个路由规则
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/blog',
            component: Blog
        }
    ]
})
export default router