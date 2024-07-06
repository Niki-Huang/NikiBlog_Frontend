import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Blog from "@/pages/Blog.vue"
import Write from "@/pages/Write.vue"
import Detail from "@/pages/Detail.vue"
import toast from '@/utils/toast'
import { useIdentifyStore } from '@/store/identify'

const router = createRouter({
    // 路由器的工作模式选用hash
    history: createWebHashHistory(),
    // 创建一个个路由规则
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/blog',
            meta: {
                keepAlive: true
            },
            component: Blog,
        },
        {
            path: '/write',
            component: Write,
            beforeEnter: async (to, from, next) => {
                let identify = useIdentifyStore()
                if (
                    await identify.verify())
                    next()
                else {
                    toast.warning('没有权限')
                    next('/')
                }
            }
        },
        {
            name: "Detail",
            path: '/detail',
            component: Detail,
        },
        // 默认路由
        {
            path: '/:pathMatch(.*)', // 匹配所有未定义的路径
            redirect: '/', // 重定向到首页
            beforeEnter: (to, from, next) => {
                toast.warning('没有这个页面')
                next()
            }
        }
    ]
})


export default router