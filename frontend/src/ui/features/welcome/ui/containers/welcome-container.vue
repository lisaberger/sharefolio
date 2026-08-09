<script setup lang="ts">
import { User } from '@core/user';
import { RouteName } from '@ui/router/enums/route';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

interface Props {
    userLoggedIn: boolean;
    currentUser?: User;
}

const props = defineProps<Props>();

const { t } = useI18n();
const router = useRouter();

const welcomeText = computed(() => ({
    title: props.userLoggedIn
        ? t('hero.title.user', { name: props.currentUser?.firstname })
        : t('hero.title.default'),
    subtitle: t('hero.subtitle'),
    description: props.userLoggedIn
        ? t('hero.description.user')
        : t('hero.description.default'),
}));
</script>

<template>
    <section class="flex flex-col items-center px-4 py-20 text-center md:py-24">
        <span
            class="border-surface-200 text-primary-500 mb-6 inline-flex items-center rounded-full border bg-white px-4 py-1.5 text-sm font-semibold tracking-wide shadow-xs"
        >
            <span class="material-icons mr-1.5 text-base">palette</span>
            {{ t('hero.badge') }}
        </span>

        <h1
            class="text-surface-900 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl"
        >
            {{ welcomeText.title }}
        </h1>

        <p
            class="text-surface-500 mt-6 max-w-xl text-lg font-medium md:text-xl"
        >
            {{ welcomeText.subtitle }}
        </p>

        <p class="text-surface-400 mt-3 max-w-lg text-sm md:text-base">
            {{ welcomeText.description }}
        </p>

        <div class="mt-10 flex flex-wrap items-center justify-center gap-3">
            <template v-if="!props.userLoggedIn">
                <prime-button
                    data-testid="hero-login-button"
                    icon-pos="right"
                    @click="router.push({ name: RouteName.Login })"
                >
                    <template #icon>
                        <span class="material-icons">arrow_forward</span>
                    </template>
                    {{ t('hero.action.login') }}
                </prime-button>
                <prime-button
                    severity="secondary"
                    outlined
                    data-testid="hero-register-button"
                    @click="router.push({ name: RouteName.Register })"
                >
                    {{ t('hero.action.register') }}
                </prime-button>
            </template>
            <prime-button
                v-else
                icon-pos="right"
                data-testid="hero-new-project-button"
                @click="router.push({ name: RouteName.NewProject })"
            >
                <template #icon>
                    <span class="material-icons">add</span>
                </template>
                {{ t('hero.action.newProject') }}
            </prime-button>
        </div>
    </section>
</template>

<i18n lang="yaml">
de:
    hero:
        badge: 'Deine kreative Community'
        title:
            default: 'Willkommen auf Sharefolio'
            user: 'Willkommen, {name}!'
        subtitle: 'Teile deine schönsten Projekte'
        description:
            default: 'Melde dich an und teile dein Portfolio. Oder lass dich von den kreativen Arbeiten anderer Designer inspirieren.'
            user: 'Lass dich von den kreativen Arbeiten anderer Designer inspirieren.'
        action:
            login: 'Anmelden'
            register: 'Registrieren'
            newProject: 'Neues Projekt'
en:
    hero:
        badge: 'Your creative community'
        title:
            default: 'Welcome to Sharefolio'
            user: 'Welcome, {name}!'
        subtitle: 'Share your best work'
        description:
            default: 'Sign up and share your portfolio. Or get inspired by the creative work of other designers.'
            user: 'Get inspired by the creative work of other designers.'
        action:
            login: 'Sign in'
            register: 'Register'
            newProject: 'New project'
</i18n>
