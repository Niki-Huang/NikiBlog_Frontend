<template>
    <div v-if="isVisible" :class="['root', theme]">
        <div class="container">
            <div class="title">Info</div>
            <form @submit.prevent="onSubmit(formData)" class="form">
                <div class="top">
                    <div class="left" @click="fileInput.click()">
                        <svg class="icon" aria-hidden="true" v-if="!picUrl">
                            <use xlink:href="#icon-tupian"></use>
                        </svg>
                        <img v-if="picUrl" :src="picUrl" alt="" />
                        <input
                            type="file"
                            ref="fileInput"
                            @change="sendCoverPic"
                            style="display: none"
                        />
                    </div>
                    <div class="right">
                        <div>
                            <label for="tag">Tags：</label>
                            <input
                                type="text"
                                id="tag"
                                v-model="tag"
                                placeholder="Writting down some tags for your ariticle"
                            />
                            <button
                                @click.prevent="addTag(tag)"
                                @keyup.enter="addTag(tag)"
                            >
                                add
                            </button>
                        </div>
                        <div class="for_tags">
                            <span
                                v-for="(tag, index) in formData.tags"
                                :key="index"
                                @click="removeTag(index)"
                                >{{ tag }}</span
                            >
                        </div>
                        <div class="for_radio">
                            <span>type：</span>
                            <input
                                type="radio"
                                id="feature"
                                name="type"
                                value="feature"
                                v-model="formData.type"
                            />
                            <label for="feature">Featured</label>
                            <input
                                type="radio"
                                id="none"
                                name="type"
                                value="none"
                                v-model="formData.type"
                            />
                            <label for="none">None</label>
                        </div>
                        <div class="for_radio">
                            <span>Permission</span>
                            <input
                                type="radio"
                                id="public"
                                name="permission"
                                value="public"
                                v-model="formData.permission"
                            />
                            <label for="public">Public</label>
                            <input
                                type="radio"
                                id="private"
                                name="permission"
                                value="private"
                                v-model="formData.permission"
                            />
                            <label for="private">Private</label>
                        </div>
                        <div class="for_radio">
                            <span>Status：</span>
                            <input
                                type="radio"
                                id="draft"
                                name="status"
                                value="draft"
                                v-model="formData.status"
                            />
                            <label for="draft">Draft</label>
                            <input
                                type="radio"
                                id="published"
                                name="status"
                                value="published"
                                v-model="formData.status"
                            />
                            <label for="published">Published</label>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="for_textarea">
                        <label for="description">description：</label>
                        <textarea
                            type="text"
                            id="description"
                            v-model="formData.description"
                            placeholder="Writting down the description for your ariticle"
                        ></textarea>
                    </div>
                    <div class="for_button">
                        <button type="button" @click="onClose" class="cancel">
                            Cancel
                        </button>
                        <button type="submit" class="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup name="Publish">
    /* 引入 */
    import { ref, reactive, defineProps } from "vue";
    import toast from "@/utils/toast";
    import myaxios from "@/utils/myaxios";

    /* prop参数 */
    let props = defineProps([
        "bid",
        "theme",
        "isVisible",
        "onClose",
        "onSubmit",
        "addPic",
    ]);

    /* 自定义参数 */
    const fileInput = ref();
    const picUrl = ref("");
    const tag = ref("");
    const formData = reactive({
        tags: ["note"],
        type: "none",
        permission: "public",
        status: "published",
        description: "",
    });

    /* 事件 */
    // 添加标签
    function addTag(value) {
        if (formData.tags.length > 9) {
            toast.error("标签太多了");
            return;
        } else if (value.trim() === "") {
            toast.error("tag不能为空");
            return;
        } else if (value.indexOf("|") != -1) {
            toast.error("不能包含特殊符号 |");
            return;
        } else if (formData.tags.indexOf(value) != -1) {
            toast.error("该tag已存在");
            return;
        }
        formData.tags.push(value);
        tag.value = "";
    }
    // 移除标签
    function removeTag(index) {
        formData.tags.splice(index, 1);
    }
    // 上传封面
    async function sendCoverPic(event) {
        const input = event.target
        if (input.files && input.files[0]) {
            const file = input.files[0];
            try {
                const form = new FormData();
                form.append("file", file);
                form.append("isCover", "yes");
                const res = await myaxios.post(
                    `imgs/pic/${props.bid}`,
                    form,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                picUrl.value = res.data.url;
                props.addPic(res.data.url);
                toast.success("封面上传成功");
            } catch (err) {
                toast.error(err);
            }
        }
    }
</script>

<style scoped lang="less">
    @import "@/assets/less/index.less";
    @keyframes flash {
        from {
            background-color: transparent;
        }
        to {
            background-color: #15a8a83f;
        }
    }
    .root {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 997;
        .container {
            width: 700px;
            display: flex;
            flex-wrap: wrap;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            .title {
                width: 100%;
                font-size: 20px;
                font-weight: 900;
            }
            .form {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                .top {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    .left {
                        width: 40%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        box-sizing: border-box;
                        padding: 20px;
                        svg {
                            cursor: pointer;
                            transform: scale(6);
                        }
                        img {
                            cursor: pointer;
                            width: 100%;
                        }
                    }
                    .right {
                        display: flex;
                        flex-wrap: wrap;
                        width: 60%;
                        height: 100%;
                        box-sizing: border-box;
                        padding: 20px 20px 0px 0px;
                        div {
                            display: flex;
                            flex-wrap: wrap;
                            align-items: center;
                            align-content: space-between;
                            margin-bottom: 20px;
                            width: 100%;
                            label,
                            span {
                                cursor: pointer;
                                font-size: 15px;
                                font-weight: 900;
                            }
                            input {
                                flex-grow: 1;
                                padding: 4px;
                                font-size: 15px;
                                border-radius: 4px;
                                outline-style: none;
                            }
                            button {
                                margin-left: 10px;
                                font-size: 14px;
                                padding: 5px 10px;
                                border-radius: 4px;
                                border: none;
                                font-weight: 900;
                                cursor: pointer;
                            }
                        }
                        div.for_tags {
                            display: flex;
                            flex-wrap: wrap;
                            margin-bottom: 0px;
                            span {
                                margin-right: 10px;
                                margin-bottom: 20px;
                                padding: 10px;
                                border: 2px dashed @indigo;
                                border-radius: 10px;
                                animation-name: flash;
                                animation-duration: 0.2s;
                                animation-direction: alternate;
                                animation-timing-function: linear;
                                animation-iteration-count: 4;
                            }
                        }
                        div.for_textarea {
                            align-items: start;
                        }
                        div.for_radio input {
                            margin: 0px 10px;
                            cursor: pointer;
                            flex-grow: 0;
                        }
                    }
                }
                .bottom {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    box-sizing: border-box;
                    padding: 0px 20px;
                    div {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        align-content: space-between;
                        margin-top: 20px;
                        width: 100%;
                        label {
                            cursor: pointer;
                            font-size: 15px;
                            font-weight: 900;
                        }
                        textarea {
                            flex-grow: 1;
                            padding: 4px;
                            font-size: 15px;
                            border-radius: 4px;
                            outline-style: none;
                            height: 100px;
                            font-family: "微软雅黑";
                        }
                        textarea {
                        }
                        button {
                            font-size: 20px;
                            padding: 5px 10px;
                            border-radius: 4px;
                            border: none;
                            font-weight: 900;
                            cursor: pointer;
                        }
                    }
                    div.for_textarea {
                        align-items: start;
                    }
                    div.for_button {
                        justify-content: space-evenly;
                    }
                    button.submit {
                        background-image: linear-gradient(
                            to right top,
                            @indigo + 22,
                            @orange + 22
                        );
                    }
                }
            }
        }
    }
    .dark {
        .container,
        input,
        button {
            color: @dark;
        }
    }
</style>
