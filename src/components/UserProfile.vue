<template>
    <el-dialog
            title="个人信息"
            v-model="visible"
            width="500px"
            @close="handleClose"
            class="dialogue-box"

    >
        <el-form :model="userInfo" label-width="80px" class="profile-form">
            <el-form-item label="用户名">
                <el-input v-model="userInfo.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="userInfo.nickname" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="userInfo.email" disabled></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="userInfo.phone" disabled></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose" class="button-close">关闭</el-button>
      </span>
        </template>
    </el-dialog>
</template>

<script>
import axios from "axios";

export default {
    name: "UserProfile",
    data() {
        return {
            visible: false,
            userInfo: {
                username: '',
                nickname: '',
                email: '',
                phone: ''
            }
        };
    },
    methods: {
        async show() {

            const profile = await axios.get('/api/user/getProfile',
            //     {
            //     params: {
            //         username: localStorage.getItem('username')
            //     }
            // }
            );
            this.userInfo = {
                username: profile.data.username,
                nickname: profile.data.nickname,
                email: profile.data.email,
                phone: profile.data.phone
            };
            this.visible = true;
        },
        handleClose() {
            this.visible = false;
        }
    }
};
</script>

<style scoped>
.dialog-footer {
    display: flex;
    justify-content: flex-end;
}

.profile-form {
    padding: 20px;
    border-radius: 20px;
}

/* 深度选择器 */
.profile-form :deep(.el-input__wrapper) {
    background: rgba(255, 255, 255, 0.5) !important;
    border-radius: 15px !important;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
    backdrop-filter: blur(5px);
}

.button-close{
    padding: 10px 20px;
    background-color: rgba(66, 184, 131, 0.5);
    color: #000000;
    border: 1px solid rgba(66, 184, 131, 0.6);
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: '085-上首元气体', 'Microsoft YaHei', 'PingFang SC', sans-serif;
    font-size: 18px;
    margin-right: 20px;
}

.button-close:hover{
    background-color: rgba(66, 184, 131, 1);
    color: #000000;
    transform: translateY(-2px);
}

</style>

<style>

.dialogue-box {
    overflow: hidden; /* 确保圆角效果 */
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    position: relative;
    backdrop-filter: blur(8px);
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    margin: 0 !important;
}
</style>
