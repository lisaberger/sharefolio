<script setup lang="ts">
import { RouteName } from '@/router/enum/route';
import { useI18n } from 'vue-i18n';

interface Props {
    error?: Error;
}

const props = defineProps<Props>();

const { t } = useI18n();
</script>

<template>
    <section class="flex h-full flex-col items-center justify-center">
        <dot-lottie-vue autoplay src="error-not-found.lottie" class="w-64" />
        <h1 class="text-2xl font-bold">{{ t('error.title') }}</h1>
        <p class="mb-2 text-sm font-semibold">
            {{ t('error.code', { code: props.error?.name || '' }) }}
        </p>
        <p class="mb-8">{{ t('error.message') }}</p>

        <router-link :to="{ name: RouteName.Home }">
            <prime-button :label="t('button.home')" outlined size="small" />
        </router-link>
    </section>
</template>

<i18n lang="yaml">
de:
    error:
        title: Upps!
        code: Fehlercode {code}
        message: Die gesuchte Seite wurde nicht gefunden.
    button:
        home: Zur Startseite
en:
    error:
        title: Oops!
        code: Error code {code}
        message: We can't seem to find the page you're looking for.
    button:
        home: Return to homepage
</i18n>
