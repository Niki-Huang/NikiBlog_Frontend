import { defineStore } from 'pinia'

export const useBlogInfoStore = defineStore(
    'bloginfo',
    {
        state() {
            return {
                bloginfo: {},
                content: ''
            }
        },
        actions: {

        }
    }
)
