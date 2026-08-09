<script setup lang="ts">
import { RouteName } from '@ui/router/enums/route';
import { useI18n } from 'vue-i18n';

interface Props {
    error?: Error;
}

defineProps<Props>();

const { t } = useI18n();
</script>

<template>
    <section
        class="flex flex-col items-center justify-center px-4 py-24 text-center"
    >
        <div
            class="bg-primary-50 text-primary-500 mb-8 flex h-24 w-24 items-center justify-center rounded-3xl"
        >
            <span class="material-icons text-5xl">error_outline</span>
        </div>

        <h1 class="text-surface-900 text-5xl font-extrabold tracking-tight">
            404
        </h1>

        <h2 class="text-surface-700 mt-3 text-xl font-bold">
            {{ t('error.title') }}
        </h2>

        <p class="text-surface-500 mt-2 max-w-md text-sm">
            {{ t('error.message') }}
        </p>

        <router-link :to="{ name: RouteName.Home }" class="mt-8">
            <prime-button :label="t('button.home')" icon-pos="right">
                <template #icon>
                    <span class="material-icons text-base">home</span>
                </template>
            </prime-button>
        </router-link>
    </section>
</template>

<i18n lang="yaml">
de:
    error:
        title: Upps, hier fehlt etwas!
        message: Die gesuchte Seite wurde nicht gefunden oder ist nicht mehr verfügbar.
    button:
        home: Zur Startseite
en:
    error:
        title: Oops, something is missing!
        message: The page you are looking for could not be found or is no longer available.
    button:
        home: Return to homepage
</i18n>
