<template>
    <div class="container">
        <div class="firstline">
            <div class="left">
                <div>Title</div>
                <input
                    id="title"
                    type="text"
                    v-model="titleText"
                    placeholder="Name the title for your ariticle"
                />
            </div>
            <div class="right" @click="showForm">Publish</div>
        </div>
        <MdEditor
            :theme="theme_style"
            editor-id="editor"
            v-model="markdownText"
            @save="showForm"
            @upload-img="savePic"
        />
        <Publish
            :bid="bid"
            :isVisible="isFormVisible"
            :onClose="handleFormClose"
            :onSubmit="saveBlog"
            :formData="formData"
            :addPic="addPic"
        />
    </div>
</template>

<script setup name="blog">
    /* 引入 */
    import { ref, computed, reactive, onMounted } from "vue";
    import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
    import { MdEditor } from "md-editor-v3";
    import { useThemeStore } from "@/store/theme";
    import { useBlogInfoStore } from "@/store/bloginfo";
    import myaxios from "@/utils/myaxios";
    import toast from "@/utils/toast";
    import Publish from "@/components/Publish.vue";

    /* 实例 */
    const route = useRoute();
    const router = useRouter();
    const themeStore = useThemeStore();
    const bloginfostore = useBlogInfoStore();

    /* 路由参数变量 */
    const bid = ref(route.query.bid);

    /* 自定义变量 */
    let isSave = ref(false);
    let titleText = ref("");
    let markdownText = ref("");
    let isFormVisible = ref(false);
    let picsUrl = reactive([]);
    let formData = reactive({
        tags: ["note"],
        type: "none",
        permission: "public",
        status: "published",
        description: "",
        picUrl: "",
    });

    /* 计算属性 */
    let theme_style = computed(() => themeStore.theme_style);

    /* 事件 */
    // 显示表单
    function showForm() {
        try {
            if (titleText.value.trim() == "") throw "标题不能为空";
            else if (titleText.value.length > 255) throw "标题太长了";
            else if (markdownText.value.trim() == "") throw "文章内容不能为空";
            isFormVisible.value = true;
        } catch (err) {
            toast.error(err);
        }
    }
    // 关闭表单
    function handleFormClose() {
        isFormVisible.value = false;
    }
    // 保存博文
    async function saveBlog(formData) {
        try {
            // 解析数据
            const { tags, type, permission, status, description } = formData;
            // 数据处理、判断
            const tags_str = tags.join("|");
            if (description.length > 255) {
                toast.error("描述信息太长了");
                return;
            }
            // 存储
            await myaxios.post("blogs/save", {
                bid: bid.value,
                title: titleText.value,
                content: markdownText.value,
                tags: tags_str,
                type,
                permission,
                status,
                description,
            });
            isSave.value = true;
            if (route.query.mode == "e") toast.success("修改成功");
            else toast.success("保存成功");
            isFormVisible.value = false;
            router.push("/blog");
        } catch (err) {
            toast.error(err);
        }
    }
    // 上传图片
    async function savePic(files, callback) {
        try {
            if (files.length > 1) throw "一次只能传一张图片";
            const file = files[0];
            const form = new FormData();
            form.append("file", file);
            form.append("isCover", "no");
            const res = await myaxios.post(`imgs/pic/${bid.value}`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res);
            callback([res.data.url]);
            picsUrl.push(res.data.url);
            toast.success("图片上传成功");
        } catch (err) {
            toast.error(err);
        }
    }
    // 接收封面的url
    function addPic(picUrl) {
        picsUrl.push(picUrl);
    }

    /* 生命钩子 */
    onMounted(() => {
        if (route.query.mode == "e") {
            let bi = bloginfostore.bloginfo;
            formData.tags = bi.tags.split("|");
            formData.type = bi.type;
            formData.permission = bi.permission;
            formData.status = bi.status;
            formData.description = bi.description;
            formData.picUrl = bi.coverUrl;
            titleText.value = bi.title;
            markdownText.value = bloginfostore.content;
        }
    });

    /* 路由守卫 */
    onBeforeRouteLeave(async (to, from, next) => {
        if (!isSave.value) {
            if (confirm("您还未保存，确定要离开吗？")) {
                try {
                    if (route.query.mode === "w")
                        await myaxios.delete(`blogs/record/${bid.value}`);
                    if (picsUrl.length > 0)
                        await myaxios.post(`imgs/picsDel`, { picArr:picsUrl });
                    next();
                } catch (err) {
                    alert(err);
                }
            }
        } else next();
    });
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
</style>
