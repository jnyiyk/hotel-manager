import {createRouter, createWebHashHistory} from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const routes = [
    {
        path: '/',
        name: 'IndexPage',
        component: () => import('../views/Index.vue')
    },
    {
        path: '/Login',
        name: 'LoginPage',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/Layout',
        name: 'LayoutPage',
        component: () => import('../views/Layout.vue'),
        children:[
            {
                path:'role',
                name:'Role',
                component: () => import('../views/role/Role.vue'),
            },
            {
                path:'admin',
                name:'Admin',
                component: () => import('../views/admin/Admin.vue'),
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  Nprogress.start();
  next()
})

router.afterEach((to, from) => {
    Nprogress.done()
})

export default router
