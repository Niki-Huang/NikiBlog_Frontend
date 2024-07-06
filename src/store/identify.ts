import myaxios from "@/utils/myaxios";
import { defineStore } from "pinia";

export const useIdentifyStore = defineStore('identify', {
    state() {
        return {
            isShow: false,
            isLogged: false
        }
    },
    actions: {
        async verify() {
            let token = localStorage.getItem('token')
            if (!token) {
                this.isLogged = false;
                return false
            };
            try {
                await myaxios.post('/login/verification', { token })
                this.isLogged = true;
                return true;
            }
            catch (err) {
                this.isLogged = false;
                return false;
            }
        }
    }
})