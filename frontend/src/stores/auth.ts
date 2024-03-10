import { defineStore } from 'pinia';

export interface AuthState {
    authData: {
        token: string;
        refreshToken: string;
        userName: string;
        userId: string;
        exp: string;
    };
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        authData: {
            token: '',
            refreshToken: '',
            userName: '',
            userId: '',
            exp: '',
        },
    }),
});
