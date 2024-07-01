import { defineStore } from 'pinia'

export const useThemeStore = defineStore(
    'theme',
    {
        state() {
            return {
                theme_style: 'dark'
            }
        },
        actions: {
            changeThemeForCreating() {
                this.theme_style = this.theme_style === 'dark' ? 'light' : 'dark'
                document.documentElement.className = this.theme_style
            }
        }
    }
)
