<template>
    <Header @changeTheme="changeTheme"></Header>
    <RouterView></RouterView>
    <Footer></Footer>
</template>

<script setup lang="ts" name="App">
    /* 引入 */
    import { ref } from "vue";
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";

    /* 变量 */
    let theme = ref("theme_dark");

    /* 自定义事件的回调 */
    // 切换主题
    function changeTheme() {
        theme.value =
            theme.value === "theme_light" ? "theme_dark" : "theme_light";
        document.documentElement.className = theme.value;
    }
</script>

<style lang="less">
    @import "@/assets/less";
    // 阿里图标库
    .icon {
        width: 30px;
        height: 30px;
        fill: currentColor;
        overflow: hidden;
    }
    // 主题色
    .theme_light {
        color: @dark;
        background-color: @day;
    }
    .theme_dark {
        color: @day;
        background-color: @dark;
    }
    // 字体
    :root {
        font-family: "微软雅黑";
    }
</style>
