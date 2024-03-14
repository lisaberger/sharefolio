<template>
    <header class="flex-none">
        <main-navigation-component
            :user-logged-in="userLoggedIn"
            :user="user"
            @logout="logoutUser"
        />
    </header>

    <main class="mx-auto max-w-screen-xl flex-1 p-8 pt-0">
        <router-view />
    </main>

    <footer class="flex-none">
        <footer-component />
    </footer>
</template>

<script setup lang="ts">
import axios from 'axios';
import Cookies from 'js-cookie';
import { onBeforeMount, ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import MainNavigationComponent from '@/components/MainNavigation.component.vue';
import FooterComponent from '@/components/Footer.component.vue';

const userLoggedIn = ref(false);
const userID = ref();
const user = ref({});
const router = useRouter();

onBeforeMount(() => {
    if (Cookies.get('isLoggedIn')) {
        userLoggedIn.value = true;
        userID.value = Cookies.get('isLoggedIn');
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
