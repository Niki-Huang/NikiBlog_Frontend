<template>
    <!-- 版心 -->
    <div class="container">
        <!-- 文字排版 -->
        <div class="left">
            <div class="welcome">
                <div class="firstline animate__animated">HI! 👋</div>
                <div class="secondline animate__animated animate__flipInX">
                    <span class="left">HERE IS</span>
                    <span class="right">Niki</span>
                </div>
            </div>
            <div class="phrase">
                Strive to share new knowledge here
                <span class="del">every day</span><br />
                wherever having spare time
            </div>
            <div class="btns">
                <div>Gotta latest blog</div>
                <div>About me</div>
            </div>
            <div class="icons">
                <a
                    href="https://github.com/Niki-Huang?tab=repositories"
                    target="_blank"
                >
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-github"></use>
                    </svg>
                </a>
                <svg
                    class="icon"
                    aria-hidden="true"
                    @click.once="ale('暂未开启~')"
                >
                    <use xlink:href="#icon-bilibili"></use>
                </svg>
                <svg
                    class="icon"
                    aria-hidden="true"
                    @click.once="ale('暂未开启~')"
                >
                    <use xlink:href="#icon-twi"></use>
                </svg>
                <a href="https://blog.csdn.net/Eddie_hyh" target="_blank">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-csdn"></use>
                    </svg>
                </a>
            </div>
        </div>
        <!-- 头像 -->
        <div class="right">
            <div class="head-sculpture"></div>
        </div>
    </div>
</template>

<script setup name="Home">
    /* 事件 */
    // 警告
    function ale(msg) {
        alert(msg);
    }
</script>

<style scoped lang="less">
    @import "@/assets/less/index.less";
    @mypic_width: 480px;
    @position_top: 80px;
    .container {
        width: @container-width;
        height: 700px;
        margin: 0px auto;
        padding: 0px 40px;
        box-sizing: border-box;
        display: flex;
        align-items: stretch;
        .left {
            width: @container-width - @mypic_width;
            display: flex;
            flex-wrap: wrap;
            align-content: center;
            .welcome {
                width: 100%;
                font-weight: 900;
                .firstline {
                    font-size: 100px;
                    animation: shakeX 2s linear infinite;
                }
                .secondline {
                    font-size: 0px;
                    .left {
                        font-size: 80px;
                        display: inline;
                        vertical-align: middle;
                    }
                    .right {
                        @keyframes zoom{
                            from{
                                transform: scale(1.0);
                            }
                            to{
                                transform: scale(1.05);
                            }
                        }
                        position: absolute;
                        left: 350px;
                        top: -32px;
                        font-size: 80px;
                        vertical-align: middle;
                        font-size: 120px;
                        background-clip: text;
                        color: transparent;
                        background-image: linear-gradient(@indigo, @orange);
                        animation: zoom 0.4s linear infinite alternate;
                    }
                }
            }
            .phrase {
                margin-top: 20px;
                font-weight: 800;
                font-size: 20px;
                .del {
                    text-decoration: line-through;
                    text-decoration-thickness: 4px;
                }
            }
            .btns {
                margin: 60px 0px 0px 20px;
                display: flex;
                div {
                    font-size: 20px;
                    font-weight: 800;
                    margin-right: 50px;
                    padding: 10px;
                    background-color: transparent;
                    border-radius: 10px;
                    border: 4px solid;
                    cursor: pointer;
                }
            }
            .icons {
                margin-top: 60px;
                svg {
                    margin-right: 25px;
                    transition: 0.2s all linear;
                    transform: scale(1.4);
                    cursor: pointer;
                    &:hover {
                        transform: scale(1.6);
                    }
                }
            }
        }
    }
    .right {
        width: 480px;
        display: flex;
        align-items: center;
        .head-sculpture {
            width: @mypic_width - 20px;
            height: @mypic_width - 20px;
            background-image: url("@{my-pic-url}");
            background-size: @mypic_width;
            border-radius: 240px;
            box-shadow: 15px 15px 20px;
            transition: 0.3s all linear;
            &:hover {
                transform: scale(1.1);
            }
        }
    }
</style>
