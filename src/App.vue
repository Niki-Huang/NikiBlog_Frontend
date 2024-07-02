<template>
    <Header></Header>
    <RouterView v-slot="{ Component, route }">
        <KeepAlive :include="['Blog']">
            <component :is="Component" v-if="route.meta.keepAlive" />
        </KeepAlive>
        <component :is="Component" v-if="!route.meta.keepAlive" />
    </RouterView>
    <Footer></Footer>
</template>

<script setup name="App">
    /* 引入 */
    import { ref } from "vue";
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
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
    .light {
        color: @dark;
        background-color: @day;
        input,
        button {
            color: @dark;
        }
    }
    .dark {
        color: @day;
        background-color: @dark;
        input,
        button {
            color: @day;
        }
    }
    // 字体
    :root {
        font-family: "微软雅黑";
    }
</style>
