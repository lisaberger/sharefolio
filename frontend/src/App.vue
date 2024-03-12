<template>
    <header>
        <main-navigation
            :user-logged-in="userLoggedIn"
            :user="user"
            @logout="logoutUser"
        />
    </header>
    <main>
        <router-view />
    </main>
    <footer>
        <the-footer />
    </footer>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { RouterView } from 'vue-router';
import MainNavigation from '@/components/MainNavigation.vue';
import TheFooter from '@/components/TheFooter.vue';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'vue-router';

const userLoggedIn = ref(false);
const userID = ref();
const user = ref({});
const router = useRouter();

onBeforeMount(() => {
    if (Cookies.get('isLoggedIn')) {
        userLoggedIn.value = true;
        userID.value = Cookies.get('isLoggedIn');
        axios
            .get(`http://localhost:4000/user/id/${userID.value}`)
            .then((response) => {
                user.value = response.data[0];
            });
    }
});

const logoutUser = () => {
    axios.get('http://localhost:4000/logout');
    Cookies.remove('isLoggedIn');
    router.go(0);
};
</script>
