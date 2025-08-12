<script>
import axios from "axios";
import SHA256 from 'crypto-js/sha256';
import encHex from 'crypto-js/enc-hex';

// 切换注册/登录表单
// const toggleForm = () => {
//     showRegisterForm.value = !showRegisterForm.value;
// };
// // SHA-256 加盐哈希
// async function hashPasswordWithSalt(password, salt) {
//     const text = password + salt;
//     const encoder = new TextEncoder();
//     const data = encoder.encode(text);
//     const hashBuffer = await crypto.subtle.digest('SHA-256', data);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
// }
//
// const handleRegister = async () => {
//     if (username.value === '' || password.value === '') {
//         alert('用户名和密码不能为空');
//         return;
//     }
//     // 从后端获取盐值
//     const saltResponse = await axios.get('/api/auth/salt');
//     const salt = saltResponse.data.salt;
//     // 使用 SHA-256加盐哈希对密码加密
//     const hashedPassword = await hashPasswordWithSalt(password.value, salt);
//
//     try{
//         const response = await axios.post('/api/auth/register', {
//             username: username.value,
//             password: hashedPassword,
//             nickname: nickname.value,
//             email: email.value,
//             phone: phone.value
//         });
//
//         if (response.data.success) {
//             alert('注册成功');
//             // 隐藏注册页面，回到登陆页面登陆
//             showRegisterForm.value = false;
//         } else {
//             alert('注册失败: ' + response.data.message);
//         }
//     }catch (error) {
//         alert('注册时发生错误: ' + error.message);
//     }
//
//     alert('注册成功');
// };
//
// const handleLogin = async () => {
//     if (username.value === '' || password.value === '') {
//         alert('用户名和密码不能为空');
//         return;
//     }
//     // 获取 salt（根据用户名）
//     const saltResponse = await axios.get(`/api/auth/salt?username=${username}`);
//     const salt = saltResponse.data.salt;
//     // 使用 SHA-256加盐哈希对密码加密
//     const hashedPassword = await hashPasswordWithSalt(password.value, salt);
//
//     try {
//         const response = await axios.post('/api/auth/login', {
//             username: username.value,
//             password: hashedPassword
//         });
//
//         if (response.data.success) {
//             alert('登陆成功');
//             // 使用 Vue Router 的 push 方法进行重定向
//             this.$router.push('/fieldMainPage');
//         } else {
//             alert('登陆失败: ' + response.data.message);
//         }
//     } catch (error) {
//         alert('登陆时发生错误: ' + error.message);
//     }
// };

export default {
    name: 'Auth',
    data() {
        return {
            // 响应式变量定义
            showRegisterForm: true,
            username: '',
            password: '',
            nickname: '',
            email: '',
            phone: ''
        };
    },
    methods: {
        // 切换注册/登录表单
        toggleForm() {
            this.showRegisterForm = !this.showRegisterForm;
        },

        // SHA-256 加盐哈希
        async hashPasswordWithSalt(password, salt) {
            const text = password + salt;
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        },

        async handleRegister() {
            if (this.username === '' || this.password === '') {
                alert('用户名和密码不能为空');
                return;
            }
            // 从后端获取盐值
            const saltResponse = await axios.get('/api/auth/salt');
            const salt = saltResponse.data.salt;
            // 使用 SHA-256加盐哈希对密码加密
            const hashedPassword = await this.hashPasswordWithSalt(this.password, salt);

            try{
                const response = await axios.post('/api/auth/register', {
                    username: this.username,
                    password: hashedPassword,
                    nickname: this.nickname,
                    email: this.email,
                    phone: this.phone
                });

                if (response.data.success) {
                    alert('注册成功');
                    // 隐藏注册页面，回到登陆页面登陆
                    this.showRegisterForm = false;
                } else {
                    alert('注册失败: ' + response.data.message);
                }
            }catch (error) {
                alert('注册时发生错误: ' + error.message);
            }
        },

        async handleLogin() {
            if (this.username === '' || this.password === '') {
                alert('用户名和密码不能为空');
                return;
            }
            // 获取 salt（根据用户名）
            const saltResponse = await axios.get(`/api/auth/salt?username=${this.username}`);
            const salt = saltResponse.data.salt;
            // 使用 SHA-256加盐哈希对密码加密
            const hashedPassword = await this.hashPasswordWithSalt(this.password, salt);

            try {
                const response = await axios.post('/api/auth/login', {
                    username: this.username,
                    password: hashedPassword
                });

                if (response.data.success) {
                    alert('登陆成功');
                    // 使用 Vue Router 的 push 方法进行重定向
                    this.$router.push('/fieldMainPage');
                } else {
                    alert('登陆失败: ' + response.data.message);
                }
            } catch (error) {
                alert('登陆时发生错误: ' + error.message);
            }
        }
    }
}

</script>

<template>
    <div class="background">
        <div class="app-container">
            <h1>登陆到新员工园地</h1>
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
body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-x: hidden; /* 防止水平滚动条 */
}

.app-container {
    position: relative; /* 确保其他内容可以正确定位 */
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

/* 背景图片样式 */
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../assets/background.jpg');
    background-size: cover; /* 背景图片覆盖整个容器 */
    background-position: center; /* 背景图片居中 */
}
</style>
