<template>
    <div class="zw"></div>
    <div class="root">
        <!-- 版心 -->
        <div class="container">
            <!-- 头像 -->
            <div class="left" v-if="identify.isLogged">
                <div class="head-sculpture" @click="showLogForm"></div>
            </div>
            <div class="left" v-if="!identify.isLogged">
                <div class="niming" @click="showLogForm">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-nimingicon"></use>
                    </svg>
                </div>
            </div>
            <!-- 导航 -->
            <div class="middle">
                <div class="nav">
                    <div @click="gotta('/')">HOME</div>
                    <div @click="gotta('/blog')">BLOG</div>
                    <div>PROJECT</div>
                    <div>TOOLS</div>
                    <div>ABOUTME</div>
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

<script setup name="Header">
    /* 引入 */
    import { computed, onBeforeMount, onMounted, ref } from "vue";
    import { useRouter } from "vue-router";
    import { useThemeStore } from "@/store/theme";
    import emitter from "@/utils/emitter";
    import { useIdentifyStore } from "@/store/identify";
    import toast from "@/utils/toast";

    /* 实例 */
    const router = useRouter();
    const themeStore = useThemeStore();
    const identify = useIdentifyStore();

    /* 自定义变量 */
    const theIcon = ref("#icon-moon");

    /* 事件 */
    // 编程式导航
    function gotta(where) {
        router.push({ path: where });
    }
    // 主题切换
    function changmode() {
        if (theIcon.value === "#icon-sun") theIcon.value = "#icon-moon";
        else theIcon.value = "#icon-sun";
        themeStore.changeThemeForCreating();
    }
    // 显示登录框
    async function showLogForm() {
        identify.isShow = true;
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
        z-index: 996;
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
        .niming {
            margin: 0 auto;
            width: 50px;
            height: 50px;
            background-size: 50px 50px;
            border-radius: 25px;
            cursor: pointer;
            transition: 0.2s all linear;
            display: flex;
            justify-content: center;
            align-items: center;
            svg {
                width: 48px;
                height: 48px;
            }
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
