<template>
    <div class="container">
        <div class="search">
            <div class="left">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                <input type="text" value="" />
            </div>
            <div class="right" @click="gotta('/write')">Publish</div>
        </div>
        <div class="tags">
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
            <div class="card">
                <img src="@/assets/imgs/mysql.jpg" alt="" />
                <div class="infos">
                    <div class="title">Data Fetch in Nuxt.js</div>
                    <div class="viewer">15 views</div>
                    <div class="datetime">February 10,2024</div>
                    <div class="description">
                        要让文本最多显示三行，超出的部分采用省略号，可以使用 CSS
                        的 line-clamp 技术。这个技术在现代浏览器中广泛支持
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    /* 引入 */
    import { useRouter } from "vue-router";
    import myaxios from "@/utils/myaxios";

    /* 库函数实例 */
    const router = useRouter();

    /* 事件 */
    // 编程式导航
    async function gotta(where: string) {
        const { data: res } = await myaxios.post("blogs/newRecord");
        const bid = res.data.bid;
        router.push({
            path: where,
            query: { bid, status: "unsaved" },
        });
    }
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
    }
    .tags {
        width: 100%;
        margin-top: 20px;
        display: flex;
        justify-content: flex-start;
        div {
            border: 1px solid gray;
            padding: 8px;
            border-radius: 8px;
            margin-right: 10px;
        }
    }
    .cards {
        width: 100%;
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .card {
            box-sizing: border-box;
            width: 32%;
            margin-bottom: 10px;
            border: 4px solid rgb(182, 182, 182);
            border-radius: 6px;
            transition: 0.2s all linear;
            &:hover {
                box-shadow: 0px 0px 20px 4px;
                transform: scale(1.04);
                cursor: pointer;
            }
            img {
                position: relative;
                width: 100%;
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
            .viewer {
                font-size: 18px;
                font-weight: 700;
            }
            .datetime {
                font-size: 18px;
                font-weight: 900;
            }
            .description {
                font-size: 15px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3; /* 最多显示三行 */
            }
        }
    }
</style>
