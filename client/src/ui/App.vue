<script setup lang="ts">
import Cookies from 'node_modules/@types/js-cookie';
import { onBeforeMount, ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import NavigationContainer from '@ui/features/navigation/ui/containers/navigation-container.vue';
import { authRepository, userRepository } from '@config';
import { User } from '@core/user';
import footerComponent from '@ui/features/common/ui/component/footer-component.vue';

const userLoggedIn = ref(false);
const user = ref<User>();
const router = useRouter();

const fetchCurrentUser = async (): Promise<void> => {
    const userId = Cookies.get('isLoggedIn');

    if (!userId) {
        return;
    }

    const result = await userRepository.getById(userId);

    user.value = result.data;
};

onBeforeMount(() => {
    if (Cookies.get('isLoggedIn')) {
        userLoggedIn.value = true;
        fetchCurrentUser();
    }
});

const logoutUser = async (): Promise<void> => {
    await authRepository.logout();
    Cookies.remove('isLoggedIn');
    Cookies.remove('sharefolio_token');
    router.go(0);
};
</script>

<template>
    <header class="flex-none">
        <navigation-container
            :user-logged-in="userLoggedIn"
            :current-user="user"
            @logout="logoutUser"
        />
    </header>

    <main class="mx-auto max-w-(--breakpoint-2xl) flex-1 p-4 pt-20 md:p-8 md:pt-24">
        <router-view />
    </main>

    <footer class="flex-none">
        <footer-component />
    </footer>
</template>
