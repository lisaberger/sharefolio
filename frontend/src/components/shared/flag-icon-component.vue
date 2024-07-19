<script setup lang="ts">
import FlagIconGermanyComponent from '@/components/shared/flag-icons/flag-icon-germany-component.vue';
import FlagIconUkComponent from '@/components/shared/flag-icons/flag-icon-uk-component.vue';
import { computed } from 'vue';

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
