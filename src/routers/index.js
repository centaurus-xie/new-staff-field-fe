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
router.beforeEach(async (to, from, next) => {
    // 检查目标路由是否需要认证
    if (to.meta.requiresAuth) {
        // 检查用户是否已登录（可以通过localStorage、sessionStorage或cookie检查）
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        if (isLoggedIn) {
            try {
                // 调用后端认证接口验证登录状态
                const response = await fetch('/api/user/getProfile', {
                    method: 'GET',
                    credentials: 'include', // 包含cookies
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    // 成功响应 (2xx)，Session有效，用户已登录
                    // 可选：将用户信息存储到前端状态中
                    const userData = await response.json();
                    // 这里可以将用户信息存储到Vuex或localStorage中供组件使用
                    localStorage.setItem('userInfo', JSON.stringify(userData));

                    // 允许访问
                    next();
                } else if (response.status === 401 || response.status === 403) {
                    // 失败响应 (401 Unauthorized 或 403 Forbidden)
                    // Session无效或用户未登录

                    // 清除本地登录状态
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('username');

                    // 重定向到登录页面
                    next('/login');
                } else {
                    // 其他错误状态
                    next('/login');
                }
            } catch (error) {
                // 网络错误或其他异常情况
                console.error('认证接口调用失败:', error);

                // 清除本地登录状态
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');

                // 重定向到登录页面
                next('/login');
            }
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
