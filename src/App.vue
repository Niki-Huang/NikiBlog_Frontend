<template>
    <Header></Header>
    <!-- <RouterView v-slot="{ Component, route }">
        <KeepAlive :include="['Blog']">
            <component :is="Component" v-if="route.meta.keepAlive" />
        </KeepAlive>
        <component :is="Component" v-if="!route.meta.keepAlive" />
    </RouterView> -->
    <RouterView></RouterView>
    <Footer></Footer>
    <Login></Login>
</template>

<script setup name="App">
    /* 引入 */
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import Login from "@/components/Login.vue";
    import toast from "./utils/toast";
    import { onBeforeMount } from "vue";
    import { useIdentifyStore } from "./store/identify";

    /* 实例 */
    const identify = useIdentifyStore();

    /* 生命钩子 */
    // 做一下身份验证
    onBeforeMount(async () => {
        try {
            await identify.verify();
            if (identify.isLogged) toast.success("你好，管理员");
        } catch (err) {
            toast.error(err);
        }
    });
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
