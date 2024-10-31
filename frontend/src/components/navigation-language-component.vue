<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { i18n } from '@/i18n/i18n';
import FlagIconComponent from '@/components/shared/flag-icon-component.vue';

const { t } = useI18n();

const menu = ref();

const toggle = (event: MouseEvent): void => {
    menu.value.toggle(event);
};

const locale = ref<'de' | 'en'>(i18n.global.locale.value);

watch(locale, (newValue) => {
    i18n.global.locale.value = newValue;
});

const languageMenuItems = ref([
    {
        label: t('menu.de'),
        flag: 'de',
        command: () => {
            locale.value = 'de';
        },
    },
    {
        label: t('menu.en'),
        flag: 'en',
        command: () => {
            locale.value = 'en';
        },
    },
]);
</script>

<template>
    <prime-button
        text
        severity="secondary"
        size="small"
        data-testid="language-button"
        aria-haspopup="true"
        aria-controls="languages"
        :label="locale"
        @click="toggle"
    >
        <template #icon>
            <span class="material-icons">language</span>
        </template>
    </prime-button>
    <prime-menu
        ref="menu"
        id="languages"
        :model="languageMenuItems"
        :popup="true"
        @select=""
    >
        <template #itemicon="{ item }">
            <flag-icon-component :locale="item.flag" />
        </template>
    </prime-menu>
</template>

<i18n lang="yaml">
de:
    menu:
        de: Deutsch
        en: English
en:
    menu:
        de: Deutsch
        en: English
</i18n>
