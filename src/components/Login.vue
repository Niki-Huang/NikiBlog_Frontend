<template>
    <div v-if="isShow" class="root">
        <div class="container">
            <div class="title" v-if="!identify.isLogged">LOG IN FOR ADMIN</div>
            <div class="title" v-if="identify.isLogged">Hello, Admin</div>
            <div class="inp" v-if="!identify.isLogged">
                <label for="admin">Admin:</label>
                <input type="text" v-model="username" />
            </div>
            <div class="inp" v-if="!identify.isLogged">
                <label for="admin">Password:</label>
                <input type="text" v-model="password" @keydown.enter="login" />
            </div>
            <div class="inp">
                <button class="calcle" @click="closeLogForm">Cancle</button>
                <button class="login" @click="login" v-if="!identify.isLogged">LogIn</button>
                <button class="login" @click="logout" v-if="identify.isLogged">LogOut</button>
            </div>
        </div>
    </div>
</template>

<script setup name="Publish">
    /* 引入 */
    import { ref, reactive, defineProps, computed } from "vue";
    import toast from "@/utils/toast";
    import { useIdentifyStore } from "@/store/identify";
    import myaxios from "@/utils/myaxios";

    /* 实例 */
    const identify = useIdentifyStore();

    /* 自定义属性 */
    let username = ref("");
    let password = ref("");

    /* 计算属性 */
    let isShow = computed(() => identify.isShow);

    /* 事件 */
    // 关闭登录框
    function closeLogForm() {
        identify.isShow = false;
    }
    // 登录
    async function login() {
        if (!username.value || !password.value) {
            toast.error("请填写完整");
            return;
        }
        try {
            let result = await myaxios.post("/login", {
                username: username.value,
                password: password.value,
            });
            let token = result.data.token;
            localStorage.setItem("token", token);
            identify.isShow = false;
            identify.isLogged = true;
            toast.success("你好，管理员");
        } catch (err) {
            toast.error(err);
        }
    }
    // 登出
    function logout() {
        localStorage.removeItem("token");
        identify.isLogged = false;
        identify.isShow = false;
        toast.success("登出成功");
    }
</script>

<style scoped lang="less">
    @import "@/assets/less/index.less";
    .root {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 997;
        color: black;
        font-weight: 900;
        .container {
            width: 500px;
            display: flex;
            flex-wrap: wrap;
            background: rgba(255, 255, 255, 0.746);
            padding: 20px 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            .title {
                width: 100%;
                font-size: 30px;
                margin: 20px 0px 30px;
                text-align: center;
                transform: scale(1.6);
                background-image: linear-gradient(
                    to top right,
                    @indigo,
                    @orange
                );
                color: transparent;
                background-clip: text;
            }
            .inp {
                width: 100%;
                margin: 20px 10px;
                display: flex;
                align-items: center;
                label {
                    font-size: 20px;
                    margin-right: 10px;
                }
                input {
                    color: black;
                    outline: none;
                    padding: 10px;
                    flex-grow: 1;
                    border-radius: 4px;
                    border: none;
                }
            }
            button {
                color: black;
                font-size: 16px;
                font-weight: 900;
                width: 100%;
                margin: 10px 10px;
                height: 40px;
                border-radius: 4px;
                cursor: pointer;
                border: none;
            }
            button.login {
                background-image: linear-gradient(
                    to top right,
                    @indigo,
                    @orange
                );
            }
        }
    }
</style>
