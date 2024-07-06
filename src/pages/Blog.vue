<template>
    <div class="container">
        <div class="search">
            <div class="left">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                <input
                    type="text"
                    :value="blog_name"
                    @input="debounceSearch($event.target.value)"
                    placeholder="Print the blog's name that you wanna find"
                />
            </div>
            <div class="right" @click="gottaWrite()" v-if="identify.isLogged">Publish</div>
        </div>
        <div class="tags">
            <span>Hot tags:</span>
            <div class="tag" @click="selected_tag = ''">ALL</div>
            <div
                class="tag"
                v-for="(tag, index) in tags_sort_arr"
                :key="index"
                @click="selected_tag = tag"
            >
                {{ tag }}
            </div>
        </div>
        <div class="cards">
            <div
                v-for="(blog, index) in blogs_info"
                v-show="
                    blog.tags.includes(selected_tag) &&
                    blog.title.includes(blog_name)
                "
                :key="index"
                class="card"
                @click="gottaDetail(blog)"
            >
                <div class="cover">
                    <img :src="blog.coverUrl" alt="" loading="lazy" />
                    <div class="type" v-if="blog.type == 'feature'">精选</div>
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
    import { ref, reactive, onMounted } from "vue";
    import { debounce } from "lodash";
    import { useBlogInfoStore } from "@/store/bloginfo";
    import toast from "@/utils/toast";
    import myaxios from "@/utils/myaxios";
    import formatTime from "@/utils/time";
    import { useIdentifyStore } from "@/store/identify";

    /* 实例 */
    const router = useRouter();
    const bloginfostore = useBlogInfoStore();
    const identify = useIdentifyStore();

    /* 自定义变量 */
    let blogs_info = ref([]);
    let tags_obj = reactive({});
    let tags_sort_arr = ref([]);
    let selected_tag = ref("");
    let blog_name = ref("");

    /* 事件 */
    // 编程式导航
    async function gottaWrite() {
        try {
            const { data } = await myaxios.post("blogs/newRecord");
            const bid = data.bid;
            router.push({
                path: "/write",
                query: { bid, mode: "w" },
            });
        } catch (err) {
            alert(err);
        }
    }
    // 编程式导航
    function gottaDetail(bloginfo) {
        bloginfostore.bloginfo = bloginfo;
        router.push({
            name: "Detail",
        });
    }
    // 防抖
    let debounceSearch = debounce((value) => {
        blog_name.value = value;
    }, 500);

    /* 生命钩子 */
    onMounted(async () => {
        try {
            const res = await myaxios.get("blogs/all");
            blogs_info.value = res.data.blogsinfo;
            blogs_info.value.forEach((blog) => {
                const tag_str = blog.tags;
                const tag_arr = tag_str.split("|");
                tag_arr.forEach((tag) => {
                    if (tag in tags_obj) tags_obj[tag]++;
                    else tags_obj[tag] = 1;
                });
            });
            tags_sort_arr.value = Object.keys(tags_obj)
                .sort(function (a, b) {
                    return tags_obj[b] - tags_obj[a];
                })
                .slice(0, 11);
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
                width: 100%;
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
                width: 160px;
                margin-left: 20px;
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
                cursor: pointer;
            }
            span,
            div {
                margin-bottom: 10px;
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
                position: relative;
                &:hover {
                    box-shadow: 0px 0px 20px 4px;
                    transform: scale(1.04);
                    cursor: pointer;
                }
                .cover {
                    width: 100%;
                    border-radius: 6px;
                    position: relative; // 确保 img 的绝对定位相对于 cover
                    padding-top: 56.25%; // 16:9 的比例，可以根据需要调整
                    overflow: hidden; // 确保超出部分被隐藏
                    .type {
                        position: absolute;
                        left: 8px;
                        top: 8px;
                        background-color: rgba(228, 133, 116, 0.8);
                        padding: 10px;
                        border-radius: 10px;
                    }
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
                    width: 100%;
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
