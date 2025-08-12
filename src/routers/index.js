import { createRouter, createWebHistory } from 'vue-router';
import login from '../pages/login.vue';
import fieldMainPage from '../pages/fieldMainPage.vue';


const routes = [
    {
        path: '/',
        redirect: '/login' // 默认重定向到/login
    },
    {
        path: '/login',
        name: 'login',
        component: login,
    },
    {
        path: '/fieldMainPage',
        name: 'fieldMainPage',
        component: fieldMainPage,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


// 路由守卫检查登录状态
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         const isLoggedIn = localStorage.getItem('token') !== null;
//         if (!isLoggedIn) {
//             next('/login');
//         } else {
//             next();
//         }
//     } else {
//         next();
//     }
// });
export default router;
