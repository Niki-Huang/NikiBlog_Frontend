<template>
    <div class="footer">
        <div :class="['container', 'animate__animated', animateclass]">
            <div :class="['circle1', leaveclass1]"></div>
            <div :class="['circle2', leaveclass2]"></div>
            <div :class="['circle3', leaveclass3]"></div>
        </div>
    </div>
</template>

<script setup>
    /* 引入 */
    import { ref, watch, onMounted } from "vue";
    import { useRoute } from "vue-router";

    /* 实例 */
    const route = useRoute();

    /* 自定义变量 */
    const leaveclass1 = ref("");
    const leaveclass2 = ref("");
    const leaveclass3 = ref("");
    const animateclass = ref("");

    /* 监视 */
    watch(
        () => route.path,
        (newValue, oldValue) => {
            if (newValue == "/") {
                animateclass.value = "animate__fadeInUp";
                leaveclass1.value = leaveclass2.value = leaveclass3.value = "";
            } else {
                animateclass.value = "animate__fadeOutDown";
                leaveclass1.value = "leaveclass1";
                leaveclass2.value = "leaveclass2";
                leaveclass3.value = "leaveclass3";
            }
        }
    );

    /* 生命钩子 */
    onMounted(() => {
        if (route.path == "/") {
            leaveclass1.value = leaveclass2.value = leaveclass3.value = "";
        } else {
            leaveclass1.value = "leaveclass1";
            leaveclass2.value = "leaveclass2";
            leaveclass3.value = "leaveclass3";
        }
    });
</script>

<style scoped lang="less">
    @import "@/assets/less/index.less";
    @keyframes ani1 {
        0% {
        }
        100% {
            transform: translateY(-20px) scale(1.02);
        }
    }
    @keyframes ani2 {
        0% {
        }
        50% {
            transform: translateY(-10px) scale(0.9);
        }
    }
    @keyframes ani3 {
        0% {
        }
        100% {
            transform: translateX(-10px) scale(0.9);
        }
    }
    .footer {
        display: flex;
        position: fixed;
        bottom: 0px;
        left: 0px;
        right: 0px;
        height: 40px;
        justify-content: center;
        background-color: transparent;
        z-index: 990;
    }
    .container {
        position: relative;
        width: @container-width;
    }
    .circle1,
    .circle2,
    .circle3 {
        position: absolute;
        width: 1200px;
        height: 1200px;
        transition: 1s all linear;
    }
    .circle1 {
        top: -40px;
        left: -600px;
        background-image: linear-gradient(30deg, #13c7c7 200px, #c89c2d);
        border-top-right-radius: 600px;
        border-top-left-radius: 700px;
        z-index: 991;
        animation: ani2 2s linear alternate infinite;
    }
    .circle2 {
        top: -120px;
        left: -20px;
        background-image: linear-gradient(-30deg, #6cede0 100px, #f3dfaf);
        border-top-right-radius: 600px;
        border-top-left-radius: 700px;
        z-index: 993;
        animation: ani1 1s ease alternate infinite;
    }
    .circle3 {
        top: -60px;
        left: 600px;
        background-image: linear-gradient(30deg, #30d4d4 200px, #e6bd57);
        border-top-right-radius: 600px;
        border-top-left-radius: 700px;
        z-index: 992;
        animation: ani3 2s linear alternate infinite;
    }
    .leaveclass1 {
        left: -10px;
    }
    .leaveclass2 {
        top: 80px;
    }
    .leaveclass3 {
        left: 180px;
    }
</style>
