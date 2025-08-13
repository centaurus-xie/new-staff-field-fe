<script>
import axios from "axios";
import SHA256 from 'crypto-js/sha256';
import encHex from 'crypto-js/enc-hex';
import { ElMessage } from 'element-plus';


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
            phone: '',
            // 动画方向控制变量
            isReverse: false
        };
    },
    methods: {
        // 切换注册/登录表单
        toggleForm() {
            this.isReverse = false; // 重置动画方向
            this.showRegisterForm = !this.showRegisterForm;
            this.showLoginForm = !this.showLoginForm;
        },

        // 返回上一步（从手机号邮箱页面返回到注册页面）
        backToRegister() {
            this.isReverse = true; // 设置反向动画
            this.showPhoneEmailForm = false;
            this.showRegisterForm = true;
        },

        // 返回上一步（从密码页面返回到手机号邮箱页面）
        backToPhoneEmail() {
            this.isReverse = true; // 设置反向动画
            this.showPasswordForm = false;
            this.showPhoneEmailForm = true;
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
                    this.isReverse = false; // 设置正向动画
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
                this.isReverse = false; // 设置正向动画
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
                    ElMessage({
                        message: '注册成功',
                        type: 'success'
                    });
                    // 隐藏注册页面，回到登陆页面登陆
                    this.isReverse = true; // 设置反向动画
                    this.showPasswordForm = false;
                    this.showLoginForm = true;
                } else {
                    ElMessage({
                        message: '注册失败: ' + response.data.message,
                        type: 'error'
                    });
                }
            }catch (error) {
                ElMessage({
                    message: '注册时发生错误: ' + error.message,
                    type: 'error'
                });
            }
        },

        async handleLogin() {
            if (this.username === '' || this.password === '') {
                ElMessage({
                    message: '用户名和密码不能为空',
                    type: 'warning'
                });
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
                    ElMessage({
                        message: '登陆成功',
                        type: 'success'
                    });
                    // 使用 Vue Router 的 push 方法进行重定向
                    this.$router.push('/fieldMainPage');
                } else {
                    ElMessage({
                        message: '登陆失败: 用户名或密码错误',
                        type: 'error'
                    });
                }
            } catch (error) {
                ElMessage({
                    message: '登陆时发生错误: ' + error.message,
                    type: 'error'
                });
            }
        }
    }
}

</script>

<template>
    <div class="background">
        <div class="app-container">
            <div class="header">
                <h1 class="fancy-title">
<!--                    <i class="fas fa-user-circle"></i>-->
                    欢迎来到新员工园地
                </h1>
                <button @click="toggleForm">{{ showLoginForm ? '没有账号？注册' : '已有账号？登陆' }}</button>
            </div>

            <div class="form-container">
            <!-- 使用 transition-group 实现表单切换动画 -->
                <transition :name="isReverse ? 'form-slide-reverse' : 'form-slide'" mode="out-in">

                    <form v-if="showRegisterForm" @submit.prevent="handleRegister">
                        <div>
                            <label for="username">用户名:</label>
                            <input type="text" id="username" v-model="username" required>
                        </div>
                        <div>
                            <label for="nickname">昵称:</label>
                            <input type="text" id="nickname" v-model="nickname" required>
                        </div>
                        <button type="submit" style="display: block; margin-left: auto;">下一步</button>
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
                        <div style="display: flex; justify-content: space-between;">
                            <button type="button" @click="backToRegister" style="display: block;">上一步</button>
                            <button type="submit" style="display: block; margin-left: auto;">下一步</button>
                        </div>
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
                        <div style="display: flex; justify-content: space-between;">
                            <button type="button" @click="backToPhoneEmail" style="display: block;">上一步</button>
                            <button type="submit" style="display: block; margin-left: auto;">注册</button>
                        </div>
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
                        <button type="submit" style="display: flex; margin-left: auto; margin-right: auto">登陆</button>
                    </form>

                </transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
/*大标题字体*/
.fancy-title {
    color: steelblue;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    margin-bottom: 15px;
    font-family: 'Simsun','Microsoft YaHei', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
    font-weight: 800;
    letter-spacing: 5px;
    font-size: 36px;
}

.fancy-title i {
    margin-right: 10px;
    color: #42b883;
}

/*表单过渡动画 - 正向*/
.form-slide-enter-active,
.form-slide-leave-active {
    transition: all 0.3s ease;
    /*position: absolute;*/
    width: calc(100% - 60px); /* 减去容器的左右内边距 */
    /*left: 20px; !* 与容器的左内边距一致 *!*/
    /*right: 20px;*/
}

.form-slide-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.form-slide-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

/*表单过渡动画 - 反向*/
.form-slide-reverse-enter-active,
.form-slide-reverse-leave-active {
    transition: all 0.3s ease;
    /*position: absolute;*/
    width: calc(100% - 60px); /* 减去容器的左右内边距 */
}

.form-slide-reverse-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}

.form-slide-reverse-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/*标题和按钮*/
.header {
    text-align: center;
    margin-bottom: 30px;
    z-index: 10;
    position: relative;
}

.header h1 {
    color: steelblue;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    margin-bottom: 15px;
}

.header button {
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.2);
    color: midnightblue;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
}

.header button:hover {
    background-color: rgba(255, 255, 255, 3);
    transform: translateY(-2px);
}

/*表单容器*/
.form-container {
    position: relative;
    width: 100%;
    max-width: 400px;
    min-height: 300px; /* 确保容器有最小高度 */
    padding: 0 20px; /* 添加水平内边距 */
    box-sizing: border-box; /* 包含内边距在内的宽度计算 */
    margin: 0 auto; /* 水平居中 */
    height: auto;
}

.form-container button {
    padding: 10px 20px;
    background-color: rgba(66, 184, 131, 0.5);
    color: #000000;
    border: 1px solid rgba(66, 184, 131, 0.6);
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: '085-上首元气体', 'Microsoft YaHei', 'PingFang SC', sans-serif;
    font-size: 18px;
}

.form-container button:hover{
    background-color: rgba(66, 184, 131, 1);
    transform: translateY(-2px);
}

form {
    margin-top: 0;
    /*width: 100%;*/
    padding: 30px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
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
    border-radius: 20px;
    border: 2px solid #ccc;
    outline: none; /* 移除默认轮廓 */
    transition: border-color 0.3s;
    margin-bottom: 10px;
}

input:focus {
    border-color: #42b883;
    border-width: 2px;
    transition: all 0.2s;

}

</style>


<style>
body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-x: hidden; /* 防止水平滚动条 */
    /* 添加移动端优化 */
    -webkit-text-size-adjust: 100%; /* 防止iOS Safari调整字体大小 */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.app-container {
    position: relative;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    padding: 20px; /* 添加内边距防止内容贴边 */
    box-sizing: border-box;
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

/* 移动端横屏适配 */
@media (max-height: 500px) and (orientation: landscape) {
    .app-container {
        justify-content: flex-start;
        padding-top: 20px;
    }

    .form-container {
        min-height: 250px;
    }
}
</style>
