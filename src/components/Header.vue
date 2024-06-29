<template>
    <div class="zw"></div>
    <div class="root">
        <!-- 版心 -->
        <div class="container">
            <!-- 头像 -->
            <div class="left">
                <div class="head-sculpture"></div>
            </div>
            <!-- 导航 -->
            <div class="middle">
                <div class="nav">
                    <div @click="gotta('/')">HOME</div>
                    <div @click="gotta('/blog')">BLOG</div>
                    <div>PROJECT</div>
                    <div>FRIEND</div>
                    <div @click="gotta('/test')">TEST</div>
                </div>
            </div>
            <!-- 菜单 -->
            <div class="right">
                <div class="mode" @click="changmode">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="theIcon"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="Header">
    /* 引入 */
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import { useThemeStore } from "@/store/theme";
    import emitter from "@/utils/emitter";

    /* 自定义变量 */
    const theIcon = ref("#icon-moon");

    /* 实例 */
    const emit = defineEmits(["changeTheme"]);
    const router = useRouter();
    const themeStore = useThemeStore();

    /* 事件 */
    // 编程式导航
    function gotta(where: string) {
        router.push({ path: where });
    }
    // 主题切换
    function changmode() {
        if (theIcon.value === "#icon-sun") {
            theIcon.value = "#icon-moon";
            emitter.emit("changeThemeForOnline", "dark");
        } else {
            theIcon.value = "#icon-sun";
            emitter.emit("changeThemeForOnline", "light");
        }
        emit("changeTheme");
        themeStore.changeThemeForCreating();
    }
</script>

<style scoped lang="less">
    @import "@/assets/less";
    .zw {
        position: relative;
        top: 0px;
        left: 0px;
        right: 0px;
        height: 80px;
    }
    .root {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        z-index: 999;
        transition: 0.2s all linear;
    }
    .container {
        margin: 0px auto;
        width: @container-width;
        height: 80px;
        display: flex;
        align-items: center;
    }
    .left {
        width: 96px;
        .head-sculpture {
            margin: 0 auto;
            width: 50px;
            height: 50px;
            background-image: url("@{my-pic-url}");
            background-size: 50px 50px;
            border-radius: 25px;
            cursor: pointer;
            transition: 0.2s all linear;
            &:hover {
                transform: scale(1.2);
            }
        }
    }
    .middle {
        width: 960px;
        .nav {
            margin: 0 auto;
            width: 80%;
            display: flex;
            justify-content: space-evenly;
            font-weight: bolder;
            div:hover {
                transform: scale(1.4);
                cursor: pointer;
                transition: 0.2s all linear;
            }
        }
    }
    .right {
        width: 96px;
        .mode {
            display: flex;
            justify-content: center;
            .icon {
                transition: 0.2s all linear;
                &:hover {
                    transform: scale(1.4);
                    cursor: pointer;
                }
            }
        }
    }
</style>
