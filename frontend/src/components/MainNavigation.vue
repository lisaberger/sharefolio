<template>
    <nav class="border-b-2 border-gray-100 bg-white px-4 py-2">
        <ul class="flex items-center justify-between">
            <li>
                <router-link to="/">
                    <the-logo />
                </router-link>
            </li>
            <li>
                <prime-icon-field icon-position="left">
                    <prime-input-icon>
                        <svg
                            width="35"
                            height="40"
                            viewBox="0 0 35 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="..." fill="var(--primary-color)" />
                            <path d="..." fill="var(--text-color)" /></svg
                    ></prime-input-icon>
                    <prime-input-text placeholder="Search" />
                </prime-icon-field>
            </li>
            <li>
                <div v-if="!userLoggedIn">
                    <router-link to="/login">
                        <prime-button
                            label="Anmelden"
                            rounded
                            class="font-normal"
                        />
                    </router-link>
                </div>
                <div v-if="userLoggedIn && user">
                    <prime-button label="Abmelden" @click="$emit('logout')" />
                    <router-link class="link" :to="'/profile/' + user.username">
                        {{ user.username }}
                    </router-link>
                    <img
                        class="login__picture"
                        :src="'http://localhost:3000/' + user.profilbild"
                        alt="Profile Picture"
                    />
                </div>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
// import Button from '@/components/form/Button.vue';
import TheLogo from './TheLogo.vue';

defineProps({
    userLoggedIn: {
        type: Boolean,
        default: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    user: {
        type: Object,
        required: false,
    },
});

defineEmits(['logout']);
</script>

<style lang="scss">
// @import '@/assets/css/components/MainNavigation.scss';
</style>
