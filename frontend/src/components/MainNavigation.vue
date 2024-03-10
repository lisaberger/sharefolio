<template>
    <nav class="navbar">
        <ul class="nav-menu">
            <li class="nav-item">
                <router-link to="/">
                    <img
                        id="logo__big"
                        src="@/assets/links/sharefolio_rgb_3c.svg"
                        alt="Sharefolio-Logo"
                    />
                </router-link>
            </li>
            <li>
                <div>
                    <div v-if="!userLoggedIn" class="logged__out">
                        <router-link to="/login">
                            <Button
                                type="button"
                                label="Anmelden"
                                theme="secondary__btn"
                            />
                        </router-link>
                    </div>
                    <div v-if="userLoggedIn && user" class="logged__in">
                        <button
                            type="button"
                            label="Abmelden"
                            theme="secondary__btn"
                            @click="emit('logout')"
                        />
                        <router-link
                            class="link"
                            :to="'/profile/' + user.username"
                        >
                            {{ user.username }}
                        </router-link>
                        <img
                            class="login__picture"
                            :src="'http://localhost:3000/' + user.profilbild"
                            alt="Profile Picture"
                        />
                    </div>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import Button from '@/components/form/Button.vue';

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
@import '@/assets/css/components/MainNavigation.scss';
</style>
