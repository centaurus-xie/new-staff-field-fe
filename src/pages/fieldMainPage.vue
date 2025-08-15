<template>
    <div class="background">
    <el-container class="field-main-page">
        <el-header>
            <h1 style="color: #007bff; text-align: center; font-size: 36px; ">欢迎加入NJCB</h1>
        </el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-card class="custom-card-main">
                        <p>这是新员工园地，您可以在这里了解公司的相关信息和指南。</p>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-card class="custom-card" header="公司简介">
                                    <p>南京银行（Bank of Nanjing），全称南京银行股份有限公司，是一家具有独立法人资格的股份制商业银行和上市银行，实行一级法人经营管理体制，成立于1996年2月8日，注册地址位于南京市建邺区江山大街88号，法定代表人谢宁。</p>
                                </el-card>
                            </el-col>
                            <el-col :span="12">
                                <el-card class="custom-card" header="新员工指南">
                                    <p>作为新员工，您需要了解...（此处省略新员工指南内容，未来可以继续增补各种内容）</p>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
            <el-row justify="end" style="margin-top: 30px;">
                <el-col :span="6">
                    <div class="button-container">
                        <el-button class="button-profile"  @click="viewProfile">个人信息</el-button>
                        <el-button class="button-logout"  @click="logout">退出登陆</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-main>

        <UserProfile ref="userProfile" />
    </el-container>
    </div>
</template>

<script>
import { ElContainer, ElHeader, ElMain, ElRow, ElCol, ElCard, ElButton } from 'element-plus';
import UserProfile from '../components/UserProfile.vue'; // 引入用户信息组件

export default {
    name: "fieldMainPage",
    components: {
        ElContainer,
        ElHeader,
        ElMain,
        ElRow,
        ElCol,
        ElCard,
        ElButton,
        UserProfile
    },
    methods: {
        viewProfile() {
            this.$refs.userProfile.show();
        },
        logout() {
            // 清除登录状态
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            // 跳转到登录页面
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>
.field-main-page {
    padding: 20px;
}

.el-card {
    margin-top: 20px;
}

.custom-card {
    margin-top: 20px;
    overflow: hidden; /* 确保圆角效果 */
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    position: relative;
    backdrop-filter: blur(4px);
}

.custom-card-main {
    margin-top: 20px;
    overflow: hidden; /* 确保圆角效果 */
    background: rgba(255, 255, 255, 0.4);
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    position: relative;
    backdrop-filter: blur(6px);
}



.button-container {
    display: flex;
    justify-content: flex-end;
    gap: 10px; /* 按钮之间的间距 */
    flex-wrap: nowrap; /* 防止换行 */
}

.button-profile{
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

.button-profile:hover{
    background-color: rgba(66, 184, 131, 1);
    color: #000000;
    transform: translateY(-2px);
}

.button-logout{
    padding: 10px 20px;
    background-color: rgba(255, 30, 30, 0.5);
    color: #000000;
    border: 1px solid rgba(255, 30, 30, 0.53);
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: '085-上首元气体', 'Microsoft YaHei', 'PingFang SC', sans-serif;
    font-size: 18px;
}

.button-logout:hover{
    background-color: rgba(255, 30, 30, 0.7);
    color: #000000;
    transform: translateY(-2px);
}

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
