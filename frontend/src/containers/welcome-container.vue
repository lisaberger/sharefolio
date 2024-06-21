<script setup lang="ts">
import User from '@/models/user';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

interface Props {
    userLoggedIn: boolean;
    currentUser?: User;
}

const props = defineProps<Props>();

const { t } = useI18n();

const welcomeText = computed(() => ({
    title: props.userLoggedIn
        ? t('welcome.title.user', { name: props.currentUser?.name })
        : t('welcome.title.default'),
    subTitle: t('welcome.subTitle'),
    description: props.userLoggedIn
        ? t('welcome.description.user')
        : t('welcome.description.default'),
}));
</script>

<template>
    <section class="flex flex-col justify-center py-10 text-center">
        <h1 class="text-4xl font-extrabold">
            {{ welcomeText.title }}
        </h1>
        <p class="mb-4 text-lg">{{ welcomeText.subTitle }}</p>
        <p class="mb-2 text-sm">{{ welcomeText.description }}</p>

        <router-link to="Login">
            <prime-button :label="t('action.login')" rounded class="mb-4" />
        </router-link>
        <router-link to="Register">
            <div class="text-sm">{{ t('action.register') }}</div>
        </router-link>
    </section>
</template>

<i18n lang="yaml">
de:
    welcome:
        title:
            default: 'Willkommen auf Sharefolio!'
            user: 'Willkommen, {name}!'
        subTitle: 'Teile deine schönsten Projekte'
        description:
            default: 'Melde dich an und teile dein Portfolio. Oder lass dich von den kreativen Arbeiten anderer Designer inspirieren.'
            user: 'oder lass dich von den kreativen Arbeiten anderer Designer inspirieren.'
    action:
        login: 'Anmelden'
        register: 'Noch kein Profil?'
en:
    welcome:
        title:
            default: 'Welcome to Sharefolio!'
            user: 'Welcome, {name}!'
        subTitle: 'Share your best work'
        description:
            default: 'Sign up and share your portfolio. Or get inspired by the creative work of other designers.'
            user: ' Or get inspired by the creative work of other designers.'
        action:
            login: 'Sign up'
            register: 'No profile yet?'
</i18n>
