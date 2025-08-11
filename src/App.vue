<!--<script setup>-->
<!--import HelloWorld from './components/HelloWorld.vue'-->
<!--</script>-->

<!--<template>-->
<!--  <div>-->
<!--    <a href="https://vite.dev" target="_blank">-->
<!--      <img src="/vite.svg" class="logo" alt="Vite logo" />-->
<!--    </a>-->
<!--    <a href="https://vuejs.org/" target="_blank">-->
<!--      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />-->
<!--    </a>-->
<!--  </div>-->
<!--  <HelloWorld msg="Vite + Vue" />-->

<!--</template>-->

<!--<style scoped>-->
<!--.logo {-->
<!--  height: 6em;-->
<!--  padding: 1.5em;-->
<!--  will-change: filter;-->
<!--  transition: filter 300ms;-->
<!--}-->
<!--.logo:hover {-->
<!--  filter: drop-shadow(0 0 2em #646cffaa);-->
<!--}-->
<!--.logo.vue:hover {-->
<!--  filter: drop-shadow(0 0 2em #42b883aa);-->
<!--}-->
<!--</style>-->


<script setup>
import { ref } from 'vue';

const showRegisterForm = ref(true);
const username = ref('');
const password = ref('');
const nickname = ref('');
const email = ref('');
const phone = ref('');

const handleRegister = () => {
    if (username.value === '' || password.value === '') {
        alert('用户名和密码不能为空');
        return;
    }
    // 注册处理待添加
    alert('注册成功');
};

const handleLogin = () => {
    if (username.value === '' || password.value === '') {
        alert('用户名和密码不能为空');
        return;
    }
    // 登陆处理待添加
    alert('登陆成功');
};

const toggleForm = () => {
    showRegisterForm.value = !showRegisterForm.value;
};
</script>

<template>
    <div class="background">
      <div class="app-container">
          <h1>账号密码登陆</h1>
          <button @click="toggleForm">{{ showRegisterForm ? '已有账号？登陆' : '没有账号？注册' }}</button>

          <form v-if="showRegisterForm" @submit.prevent="handleRegister">
              <div>
                  <label for="username">用户名:</label>
                  <input type="text" id="username" v-model="username" required>
              </div>
              <div>
                  <label for="password">密码:</label>
                  <input type="password" id="password" v-model="password" required>
              </div>
              <div>
                  <label for="nickname">昵称:</label>
                  <input type="text" id="nickname" v-model="nickname" required>
              </div>
              <div>
                  <label for="email">邮箱:</label>
                  <input type="email" id="email" v-model="email" required>
              </div>
              <div>
                  <label for="phone">手机号:</label>
                  <input type="tel" id="phone" v-model="phone" required>
              </div>
              <button type="submit">注册</button>
          </form>

          <form v-else @submit.prevent="handleLogin">
              <div>
                  <label for="login-username">用户名:</label>
                  <input type="text" id="login-username" v-model="username" required>
              </div>
              <div>
                  <label for="login-password">密码:</label>
                  <input type="password" id="login-password" v-model="password" required>
              </div>
              <button type="submit">登陆</button>
          </form>
      </div>
    </div>
</template>

<style scoped>
form {
    margin-top: 20px;
}

div {
    margin-bottom: 10px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

button {
    padding: 10px 20px;
    background-color: #42b883;
    color: white;
    border: none;
    cursor: hand;
}

button:hover {
    background-color: #38a87c;
}
</style>


<style>
/* 全局样式，不使用 scoped 属性 */
body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-x: hidden; /* 可选：防止水平滚动条 */
}

.app-container {
    position: relative; /* 确保其他内容可以正确定位 */
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* 可选：根据需要调整内容对齐方式 */
    z-index: 1;
}

/* 背景图片样式 */
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('assets/background.jpg'); /* 背景图片路径 */
    background-size: cover; /* 背景图片覆盖整个容器 */
    background-position: center; /* 背景图片居中 */
}
</style>
