// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'
//
// createApp(App).mount('#app')


import { createApp } from 'vue';
import App from './App.vue';
import router from './routers/index.js';
import '@fortawesome/fontawesome-free/css/all.css'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

// 使用路由实例
app.use(router);

// 使用Element Plus
app.use(ElementPlus);

// 挂载Vue应用
app.mount('#app');
