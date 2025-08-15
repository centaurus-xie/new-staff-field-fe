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
        meta: { title: '登录到新员工园地' }
    },
    {
        path: '/fieldMainPage',
        name: 'fieldMainPage',
        component: fieldMainPage,
        meta: { requiresAuth: true, title: '新员工园地' }
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


// 全局前置守卫
router.beforeEach((to, from, next) => {
    // 检查目标路由是否需要认证
    if (to.meta.requiresAuth) {
        // 检查用户是否已登录（可以通过localStorage、sessionStorage或cookie检查）
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        if (isLoggedIn) {
            // 用户已登录，允许访问
            next();
        } else {
            // 用户未登录，重定向到登录页
            next('/login');
        }
    } else {
        // 不需要认证的路由，直接访问
        next();
    }
});

// 全局后置钩子
router.afterEach((to, from) => {
    // console.log(`已完成从 ${from.path} 到 ${to.path} 的导航`);
    document.title = to.meta.title || '新员工园地';
});
export default router;
