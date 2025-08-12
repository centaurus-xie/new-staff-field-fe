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
            showLoginForm: true,
            showRegisterForm: false,
            showPhoneEmailForm: false,
            showPasswordForm: false,
            username: '',
            password: '',
            passwordAssure: '',
            nickname: '',
            email: '',
            phone: ''
        };
    },
    methods: {
        // 切换注册/登录表单
        toggleForm() {
            this.showRegisterForm = !this.showRegisterForm;
            this.showLoginForm = !this.showLoginForm;
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
            if (this.username === '' || this.nickname === '') {
                alert('用户名和昵称不能为空');
                return;
            }
            try{
                const response = await axios.get('/api/auth/checkUserName', {
                    params: {
                        username: this.username
                    }
                });
                console.log(response);
                if (response.data) {
                    // 后端在用户名存在时返回True
                    alert('用户名已存在');
                } else {
                    this.showPhoneEmailForm = true;
                    this.showRegisterForm = false;
                }
            }catch (error) {
                alert('注册时发生错误: ' + error.message);
            }
        },

        handlePhoneEmail() {
            if (this.email === '' || this.phone === '') {
                alert('邮箱和电话不能为空');
                return;
            } else {
                this.showPasswordForm = true;
                this.showPhoneEmailForm = false;
            }
        },

        async handlePassword() {
            if (this.password === '' || this.passwordAssure === '') {
                alert('密码不能为空');
                return;
            }

            // 从后端获取盐值
            const saltResponse = await axios.get(`/api/auth/salt?username=${this.username}`);
            const salt = saltResponse.data.salt;
            // 使用加盐哈希对密码加密
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
                    this.showPasswordForm = false;
                    this.showLoginForm = true;
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
                    alert('登陆失败: 用户名或密码错误');
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
            <div class="header">
                <h1>登陆到新员工园地</h1>
                <button @click="toggleForm">{{ showLoginForm ? '没有账号？注册' : '已有账号？登陆' }}</button>
            </div>

            <div class="form-container">
            <!-- 使用 transition-group 实现表单切换动画 -->
                <transition name="form-slide" mode="out-in">

                    <form v-if="showRegisterForm" @submit.prevent="handleRegister">
                        <div>
                            <label for="username">用户名:</label>
                            <input type="text" id="username" v-model="username" required>
                        </div>
                        <div>
                            <label for="nickname">昵称:</label>
                            <input type="text" id="nickname" v-model="nickname" required>
                        </div>
                        <button type="submit">下一步</button>
                    </form>

                    <form v-else-if="showPhoneEmailForm" @submit.prevent="handlePhoneEmail">
                        <div>
                            <label for="email">邮箱:</label>
                            <input type="email" id="email" v-model="email" required>
                        </div>
                        <div>
                            <label for="phone">手机号:</label>
                            <input type="tel" id="phone" v-model="phone" required>
                        </div>
                        <button type="submit">下一步</button>
                    </form>

                    <form v-else-if="showPasswordForm" @submit.prevent="handlePassword">
                        <div>
                            <label for="password">密码:</label>
                            <input type="password" id="password" v-model="password" required>
                        </div>
                        <div>
                            <label for="passwordAssure">确认密码:</label>
                            <input type="password" id="passwordAssure" v-model="passwordAssure" required>
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

                </transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 添加表单过渡动画样式 */
.form-slide-enter-active,
.form-slide-leave-active {
    transition: all 0.3s ease;
    position: absolute;
    width: 100%;
}

.form-slide-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.form-slide-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

/* 新增样式：固定标题和按钮 */
.header {
    text-align: center;
    margin-bottom: 30px;
    z-index: 10;
    position: relative;
}

.header h1 {
    color: white;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    margin-bottom: 15px;
}

.header button {
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
}

.header button:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

/* 表单容器 */
.form-container {
    position: relative;
    width: 100%;
    max-width: 400px;
    min-height: 300px; /* 确保容器有最小高度 */
}

form {
    margin-top: 0;
    width: 100%;
    padding: 30px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    position: relative;
    backdrop-filter: blur(10px);
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
    position: relative;
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
