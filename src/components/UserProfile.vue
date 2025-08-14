<template>
    <el-dialog
            title="个人信息"
            v-model="visible"
            width="500px"
            @close="handleClose"
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
        <el-button @click="handleClose">关闭</el-button>
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


</style>
