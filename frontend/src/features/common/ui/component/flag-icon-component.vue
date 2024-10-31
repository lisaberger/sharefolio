<script setup lang="ts">
import { computed } from 'vue';
import FlagIconGermanyComponent from './flag-icons/flag-icon-germany-component.vue';
import FlagIconUkComponent from './flag-icons/flag-icon-uk-component.vue';

interface Props {
    locale: 'en' | 'de';
}

const props = defineProps<Props>();

const flagComponentMapping = {
    de: FlagIconGermanyComponent,
    en: FlagIconUkComponent,
};

const flagComponent = computed(() => {
    return flagComponentMapping[props.locale];
});
</script>

<template>
    <div class="w-6">
        <component :is="flagComponent" />
    </div>
</template>
