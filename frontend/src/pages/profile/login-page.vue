<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { RouteName } from '@/router/enum/route';

/* Login Data */
const loginData = ref({ username: '', password: '' });
const errorData = ref('');

/* redirect */
const router = useRouter();

const login = () => {
    /* Send post request with Login Data */
    axios
        .post('http://localhost:4000/auth/login', loginData.value)
        .then((res) => {
            console.log('res', res);
            /* set "logged in" - cookie to user is */
            // Cookies.set('isLoggedIn', res.data.id, {
            //     expires: 1,
            //     sameSite: 'Lax',
            // });
            /* redirect */
            router.push({ name: RouteName.Home });
        })
        .catch((err) => {
            /* Display error for false login data */
            errorData.value = err.response.data[2].message;
        });
};
</script>

<template>
    <section class="mt-8">
        <prime-panel header="Login">
            <form @submit.prevent="login">
                <p class="mb-8">
                    Logge dich ein, um dein Sharefolio zu verwalten.
                </p>
                <div class="mb-2 flex flex-col gap-2">
                    <label for="username">Benutzername</label>
                    <prime-input-text
                        id="username"
                        v-model="loginData.username"
                        aria-describedby="username-help"
                    />
                    <!-- <small id="username-help"
                        >Enter your username to reset your password.</small
                    > -->
                </div>
                <div class="mb-2 flex flex-col gap-2">
                    <label for="password">Passwort</label>
                    <prime-password
                        id="password"
                        v-model="loginData.password"
                        toggleMask
                    />
                    <!-- <small id="password-help"
                        >Enter your username to reset your password.</small
                    > -->
                </div>
                <prime-button
                    type="submit"
                    label="Login"
                    class="mt-2"
                    rounded
                />
                <prime-message severity="error" v-if="errorData">
                    {{ errorData }}
                </prime-message>
            </form>
            <p class="mb-2 mt-8 text-sm">
                Noch kein Profil? Dann registriere dich kostenlos!
            </p>
            <router-link :to="{ name: RouteName.Register }">
                <prime-button label="Registrieren" rounded outlined />
            </router-link>
        </prime-panel>
    </section>
</template>
