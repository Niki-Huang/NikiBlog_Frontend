<template>
    <div class="container">
        <div class="search">
            <div class="left">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                <input type="text" value="" />
            </div>
            <div class="right" @click="gottaWrite()">Publish</div>
        </div>
        <div class="tags">
            Hot tags:
            <div class="tag">ALL</div>
            <div class="tag">Vue</div>
            <div class="tag">Less</div>
            <div class="tag">MySQL</div>
            <div class="tag">Redis</div>
            <div class="tag">Docker</div>
            <div class="tag">TypeScript</div>
            <div class="tag">other</div>
        </div>
        <div class="cards">
            <div
                v-for="(blog, index) in blogs_info"
                v-show="blog.tags.includes(tag)"
                :key="index"
                class="card"
                @click="gottaDetail(blog)"
            >
                <div class="cover">
                    <img :src="blog.coverUrl" alt="" />
                </div>
                <div class="infos">
                    <div class="title">{{ blog.title }}</div>
                    <div class="secondline">
                        <div class="datetime">
                            {{ formatTime(blog.createTime) }}
                        </div>
                        <div class="viewer">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-liulan"></use>
                            </svg>
                            <span>
                                {{ blog.viewCount }}
                            </span>
                        </div>
                    </div>
                    <div class="description">概要：{{ blog.description }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup name="Blog">
    /* 引入 */
    import { useRouter } from "vue-router";
    import myaxios from "@/utils/myaxios";
    import formatTime from "@/utils/time";
    import { ref, reactive, onMounted } from "vue";
    import toast from "@/utils/toast";

    /* 实例 */
    const router = useRouter();

    /* 自定义变量 */
    const blogs_info = ref([]);
    const tag_arr = reactive({});
    const tag = ref("");

    /* 事件 */
    // 编程式导航
    async function gottaWrite() {
        try {
            const { data } = await myaxios.post("blogs/newRecord");
            const bid = data.bid;
            router.push({
                path: "/write",
                query: { bid },
            });
        } catch (err) {
            alert(err);
        }
    }
    // 编程式导航
    function gottaDetail(bloginfo) {
        router.push({
            name: "Detail",
            params: {
                bloginfo: JSON.stringify(bloginfo),
            },
        });
    }

    /* 生命钩子 */
    onMounted(async () => {
        try {
            const res = await myaxios.get("blogs/all");
            blogs_info.value = res.data.blogsinfo;
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
        .search {
            width: 100%;
            height: 52px;
            display: flex;
            justify-content: space-between;
            .left {
                width: 80%;
                border: 1px solid gray;
                padding: 10px;
                border-radius: 10px;
                display: flex;
                svg {
                    width: 5%;
                    transform: scale(0.8);
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
                padding: 10px;
                border-radius: 10px;
                line-height: 32px;
                text-align: center;
                font-weight: 900;
                background-image: linear-gradient(
                    to right top,
                    @indigo + 22,
                    @orange + 22
                );
                transition: 0.2s all linear;
                &:hover {
                    cursor: pointer;
                    transform: scale(1.04);
                }
            }
        }
        .tags {
            width: 100%;
            margin-top: 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            font-size: 20px;
            font-weight: 900;
            div {
                border: 1px dashed gray;
                padding: 8px;
                border-radius: 8px;
                margin-left: 12px;
                color: transparent;
                background-image: linear-gradient(
                    to top right,
                    @indigo,
                    @orange
                );
                background-clip: text;
            }
        }
        .cards {
            width: 100%;
            margin-top: 20px;
            display: flex;
            flex-wrap: wrap;
            .card {
                display: flex;
                flex-wrap: wrap;
                box-sizing: border-box;
                width: 32%;
                margin: 0px 7px 10px;
                border: 1px solid rgb(182, 182, 182);
                border-radius: 6px;
                transition: 0.2s all linear;
                overflow: hidden; // 确保超出部分被隐藏
                &:hover {
                    box-shadow: 0px 0px 20px 4px;
                    transform: scale(1.04);
                    cursor: pointer;
                }
                .cover {
                    width: 100%;
                    position: relative; // 确保 img 的绝对定位相对于 cover
                    padding-top: 56.25%; // 16:9 的比例，可以根据需要调整
                    img {
                        position: absolute;
                        // 让图片填满整个框
                        width: 100%;
                        height: 100%;
                        // 左上角与框中心对齐
                        top: 50%;
                        left: 50%;
                        // 再左移、上移自身的百分之五十，使图片中心与框中心对齐
                        transform: translate(-50%, -50%);
                        // 图片采用填充，宁可超出不要挤压，保持原来的比例
                        object-fit: cover;
                        // object-position: center;
                    }
                }
                .infos {
                    padding: 10px 20px;
                    div {
                        padding: 2px;
                    }
                    .title {
                        font-size: 22px;
                        font-weight: 900;
                        background-image: linear-gradient(
                            to top right,
                            @indigo,
                            @orange 40px
                        );
                        color: transparent;
                        background-clip: text;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .secondline {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .datetime {
                            font-size: 18px;
                            font-weight: 900;
                        }
                        .viewer {
                            display: flex;
                            align-items: center;
                            font-size: 18px;
                            font-weight: 700;
                            span {
                                margin-left: 10px;
                            }
                        }
                    }
                    .description {
                        font-size: 18px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: normal;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3; /* 最多显示三行 */
                    }
                }
            }
        }
    }
</style>
