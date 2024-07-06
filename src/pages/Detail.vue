<template>
    <div class="container">
        <div class="info">
            <div class="firstline">
                <div :class="['type', type_theme]">
                    {{ typeFormat(bloginfo.type) }}
                </div>
                <div class="title">{{ bloginfo.title }}</div>
            </div>
            <div class="secondline">
                Tags:
                <div v-for="(item, index) in tag_arr" :key="index" class="tag">
                    {{ item }}
                </div>
            </div>
            <div class="thirdline">
                <div class="date">
                    发布时间：{{ formatTime(bloginfo.createTime) }}
                </div>
                <div class="right">
                    <div
                        class="edit"
                        @click="editMode()"
                        v-if="identify.isLogged"
                    >
                        编 辑
                    </div>
                    <div
                        class="del"
                        @click="delCircle()"
                        v-if="identify.isLogged"
                    >
                        删 除
                    </div>
                    <div class="viewer">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-liulan"></use>
                        </svg>
                        <span>
                            {{ bloginfo.viewCount }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="mdpreview">
            <MdPreview
                preview-theme="default"
                editor-id="preview"
                v-model="content"
                :theme="theme_style"
            />
        </div>
    </div>
</template>

<script setup name="Detail">
    /* 引入 */
    import { ref, computed, onMounted } from "vue";
    import { useRouter } from "vue-router";
    import { MdPreview } from "md-editor-v3";
    import { useThemeStore } from "@/store/theme";
    import { useBlogInfoStore } from "@/store/bloginfo";
    import toast from "@/utils/toast";
    import myaxios from "@/utils/myaxios";
    import formatTime from "@/utils/time";
    import { useIdentifyStore } from "@/store/identify";

    /* 实例 */
    const themeStore = useThemeStore();
    let bloginfostore = useBlogInfoStore();
    const identify = useIdentifyStore();
    let router = useRouter();

    /* props参数 */
    let bloginfo = bloginfostore.bloginfo;

    /* 自定义参数 */
    let content = ref("");

    /* 计算属性 */
    let theme_style = computed(() => themeStore.theme_style);
    let type_theme = computed(() =>
        bloginfo.type === "none" ? "type_normal" : "type_feature"
    );
    let tag_arr = computed(() => bloginfo.tags.split("|"));

    /* 事件 */
    // 标签转换
    function typeFormat(type) {
        if (type === "none") return "普通";
        else return "精选";
    }
    // 进入编辑模式
    function editMode() {
        try {
            bloginfostore.content = content.value;
            toast.info("进入编辑模式");
            router.push({
                path: "/write",
                query: { bid: bloginfo.bid, mode: "e" },
            });
        } catch (err) {
            toast.error(err);
        }
    }
    // 删除文章
    async function delCircle() {
        if (!confirm("确定要删除这篇文章吗？")) return;
        try {
            await myaxios.delete(`/blogs/${bloginfo.bid}`);
            toast.success("删除成功");
            router.push("/blog");
        } catch (err) {
            toast.error(err);
        }
    }

    /* 生命钩子 */
    onMounted(async () => {
        try {
            // 获取文章内容
            const result = await myaxios.get(
                `blogs/blog_content?bid=${bloginfo.bid}&viewCount=${bloginfo.viewCount}&fileName=${bloginfo.fileName}`
            );
            content.value = result.data.content;
            bloginfo.viewCount++;
            toast.success("加载成功");
        } catch (err) {
            toast.error(err);
        }
    });
</script>

<style scoped lang="less">
    @import "@/assets/less/index.less";
    .container {
        width: @container-width - 60px;
        margin: 20px auto 0px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .info {
            width: 100%;
            margin-bottom: 20px;
            .firstline {
                width: 100%;
                display: flex;
                align-items: center;
                font-weight: 900;
                margin-bottom: 10px;
                .title {
                    font-size: 60px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .type {
                    padding: 10px;
                    font-size: 30px;
                    border-radius: 10px;
                }
                .type_normal {
                    background-color: gray + 33;
                }
                .type_feature {
                    background-color: rgb(228, 133, 116);
                }
            }
            .secondline {
                width: 100%;
                display: flex;
                align-items: center;
                font-size: 20px;
                font-weight: 900;
                padding: 0px 10px;
                margin-bottom: 30px;
                .tag {
                    margin-left: 20px;
                    padding: 10px;
                    border: 2px dashed gray;
                    font-size: 20px;
                    border-radius: 10px;
                    background-image: linear-gradient(
                        to top right,
                        @indigo + 11,
                        @orange + 11
                    );
                    background-clip: text;
                    color: transparent;
                }
            }
            .thirdline {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0px 10px;
                .right {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .edit,
                    .del {
                        font-family: "微软雅黑";
                        padding: 2px 10px;
                        margin-right: 10px;
                        border-radius: 6px;
                        cursor: pointer;
                        border: 1px dashed gray;
                    }
                    .viewer {
                        display: flex;
                        align-items: center;
                        span {
                            margin-left: 10px;
                        }
                    }
                }
            }
        }
        .mdedit {
            width: 100%;
            .md-editor {
                height: 2000px !important;
            }
            margin-bottom: 60px;
        }
        .mdpreview {
            width: 100%;
            .md-editor {
                background-color: transparent !important;
                height: auto !important;
            }
            margin-bottom: 60px;
        }
    }
</style>

<style lang="less">
    @import "@/assets/less/index.less";
    .mdpreview {
        code.language-bash {
            padding-top: 18px !important;
            padding-left: 80px !important;
        }
        div.default-theme,
        span.md-editor-code-block,
        span[rn-wrapper] {
            font-size: 20px !important;
        }
        div.default-theme {
            font-family: "微软雅黑";
            table {
                width: 100%;
                // outline: 4px dashed gray;
                thead tr th {
                    padding: 20px;
                    background-color: #ddd;
                }
                tbody tr td {
                    padding: 14px;
                }
            }
        }
    }
</style>
