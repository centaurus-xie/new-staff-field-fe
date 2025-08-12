<template>
    <el-container class="field-main-page">
        <el-header>
            <h1>欢迎加入NJCB</h1>
        </el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-card>
                        <p>这是新员工园地，您可以在这里了解公司的相关信息和指南。</p>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-card header="公司简介">
                                    <p>南京银行（Bank of Nanjing），全称南京银行股份有限公司，是一家具有独立法人资格的股份制商业银行和上市银行，实行一级法人经营管理体制，成立于1996年2月8日，注册地址位于南京市建邺区江山大街88号，法定代表人谢宁。
                                        南京银行前身为南京城市合作银行，在南京市原39家城市信用合作社及信用联社的基础上组建而成，1998年更名为南京市商业银行。2001年11月，以当时外资对中资银行参股的最高比例15％，接受了国际金融公司的投资入股。2006年，更名为南京银行。南京银行在全国城商行中率先启动上市辅导程序并于2007年成功主板上市，同年设立第一家分行。2016年，南京银行实现京沪杭及江苏省内设区市全覆盖。2021年12月15日，南京银行私人银行部正式挂牌成立。2023年，南京银行实现江苏省县域网点全覆盖。2024年12月18日，南京银行发布公告，新设立科创金融部、国际业务部以及零售信贷与信用卡部；小企业金融部更名为普惠金融部（乡村振兴金融部）、投资银行部更名为投资银行与战略客户部、私人银行部更名为财富管理与私人银行部；撤销零售基础客户部，其主要职能调整至其他相关部门。
                                        南京银行位列“2021福布斯全球企业2000强”第465位，“2022福布斯全球企业2000强”第422位，并入选首批开办个人养老金业务的机构名单。2023年，南京银行位列“全球银行1000强”第91位。</p>
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
            // 执行退出登陆操作
            this.$emit('logout');
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
