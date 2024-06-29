<template>
    <div class="container">
        <div class="firstline">
            <div class="left">
                <div>Title</div>
                <input
                    id="title"
                    type="text"
                    value=""
                    placeholder="Name the title for your ariticle"
                />
            </div>
            <div class="right" @click="saveFile">Publish</div>
        </div>
        <MdEditor
            :theme="theme_style"
            editor-id="editor"
            v-model="markdownText"
            @save="saveFile"
            @upload-img="savePic"
        />
        <!-- <MdPreview
            preview-theme="default"
            editor-id="preview"
            v-model="markdownText"
        /> -->
    </div>
</template>

<script setup name="blog">
    /* 引入 */
    import { ref } from "vue";
    import { useRoute } from "vue-router";
    import { MdEditor } from "md-editor-v3";
    import { useThemeStore } from "@/store/theme";
    import myaxios from "@/utils/myaxios";
    import emitter from "@/utils/emitter";

    /* 实例 */
    const route = useRoute();
    const themeStore = useThemeStore();

    /* 路由参数变量 */
    const bid = ref(route.query.bid);
    let status = ref(route.query.status);

    /* 自定义变量 */
    let markdownText = ref("");
    let theme_style = ref(themeStore.theme_style);

    /* 自定义事件 */
    emitter.on("changeThemeForOnline", (data) => {
        theme_style.value = data;
    });

    /* 事件 */
    // 保存博文
    async function saveFile() {
        try {
            let result = await myaxios.post("blogs/save", {
                bid: bid.value,
                content: markdownText.value,
            });
            alert("保存成功！");
        } catch (e) {
            alert("保存失败");
        }
    }
    // 上传图片
    async function savePic(files, callback) {
        if (files.length > 1) {
            alert("一次只能传一张图片");
            return;
        }
        const file = files[0];
        const form = new FormData();
        form.append("file", file);
        try {
            const res = await myaxios.post("imgs/save", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            callback([res.data.url]);
        } catch (error) {
            console.error("图片上传失败：", error);
        }
    }
</script>

<style scoped lang="less">
    @import "@/assets/less/index.less";
    .container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: 0px auto;
        width: @container-width - 60px;
        position: relative;
        height: 90%;
        .firstline {
            width: 100%;
            margin: 20px 0px;
            height: 52px;
            display: flex;
            justify-content: space-between;
            .left {
                width: 80%;
                display: flex;
                border: 1px solid gray;
                padding: 10px;
                border-radius: 10px;
                div {
                    font-weight: 900;
                    padding: 0px 20px;
                    height: 30px;
                    line-height: 30px;
                }
                input {
                    font-size: 18px;
                    width: 95%;
                    border: none;
                    background-color: transparent;
                }
                input:focus {
                    outline: none;
                }
            }
            .right {
                width: 15%;
                border: 1px solid gray;
                padding: 10px;
                border-radius: 10px;
                line-height: 32px;
                text-align: center;
                font-weight: 900;
                cursor: pointer;
            }
        }
    }
    img {
        width: 50px;
        height: 50px;
    }
</style>

<style>
    .md-editor {
        height: 1000px !important;
    }
    .md-editor div.cm-line {
        font-family: "微软雅黑" !important;
    }
    /* .md-editor-preview *:not(a,code, code *) {
        color: white !important;
    } */
</style>
