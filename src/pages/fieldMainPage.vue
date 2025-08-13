<template>
    <el-container class="field-main-page">
        <el-header>
            <h1>欢迎加入NJCB</h1>
            <el-button @click="logout" type="danger" style="float: right; margin-top: 10px;">退出登录</el-button>
        </el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-card>
                        <p>这是新员工园地，您可以在这里了解公司的相关信息和指南。</p>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-card header="公司简介">
                                    <p>南京银行（Bank of Nanjing），全称南京银行股份有限公司，是一家具有独立法人资格的股份制商业银行和上市银行，实行一级法人经营管理体制，成立于1996年2月8日，注册地址位于南京市建邺区江山大街88号，法定代表人谢宁。</p>
                                </el-card>
                            </el-col>
                            <el-col :span="12">
                                <el-card header="新员工指南">
                                    <p>作为新员工，您需要了解...（此处省略新员工指南内容）</p>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
            <el-row justify="end">
                <el-col :span="6">
                    <el-button type="primary" @click="viewProfile">查看个人信息</el-button>
                    <el-button @click="logout">退出登陆</el-button>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import { ElContainer, ElHeader, ElMain, ElRow, ElCol, ElCard, ElButton } from 'element-plus';

export default {
    name: "fieldMainPage",
    components: {
        ElContainer,
        ElHeader,
        ElMain,
        ElRow,
        ElCol,
        ElCard,
        ElButton
    },
    methods: {
        viewProfile() {
            // 跳转到个人信息页面
            // this.$router.push('/profile');
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
</style>
