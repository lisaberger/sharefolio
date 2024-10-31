<script setup lang="ts">
import axios from 'axios';
import Cookies from 'js-cookie';
import { onBeforeMount, ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import NavigationContainer from '@/features/navigation/ui/container/navigation-container.vue';
import type User from './models/user';
import footerComponent from './features/common/ui/component/footer-component.vue';

const userLoggedIn = ref(false);
const userId = ref<string>();
const user = ref<User>();
const router = useRouter();

onBeforeMount(() => {
    if (Cookies.get('isLoggedIn')) {
        userLoggedIn.value = true;
        userId.value = Cookies.get('isLoggedIn');
        axios
            .get(`http://localhost:4000/users/id/${userID.value}`)
            .then((response) => {
                user.value = response.data[0];
            });
    }
});

const logoutUser = () => {
    axios.get('http://localhost:4000/auth/logout');
    Cookies.remove('isLoggedIn');
    router.go(0);
};
</script>

<template>
    <header class="mb-16 flex-none">
        <navigation-container
            :user-logged-in="userLoggedIn"
            :current-user="user"
            @logout="logoutUser"
        />
    </header>

    <main class="mx-auto max-w-screen-2xl flex-1 p-4 pt-0 md:p-8 md:pt-0">
        <router-view />
    </main>

    <footer class="flex-none">
        <footer-component />
    </footer>
</template>
