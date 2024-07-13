<script setup lang="ts">
import type Project from '@/models/project';
import type { AutoCompleteCompleteEvent } from 'primevue/autocomplete';
import { useI18n } from 'vue-i18n';

interface Props {
    suggestions?: Array<Project>;
}

const props = defineProps<Props>();

type Emits = {
    complete: [AutoCompleteCompleteEvent];
};

const emit = defineEmits<Emits>();

const { t } = useI18n();

const selectedProject = defineModel<Project>({});

const handleComplete = (event: AutoCompleteCompleteEvent): void => {
    emit('complete', event);
};
</script>

<template>
    <prime-auto-complete
        :placeholder="t('searchPlaceholder')"
        v-model="selectedProject"
        :pt="{
            root: {
                class: ['w-full'],
            },
            input: {
                style: {
                    width: '100%',
                    fontSize: '0.85rem',
                },
            },
        }"
        :suggestions="props.suggestions"
        option-label="name"
        @complete="handleComplete"
    >
        <template #loading-icon>
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </template>
    </prime-auto-complete>
</template>

<i18n lang="yaml">
de:
    searchPlaceholder: Suche nach kreativen Arbeiten ...
en:
    searchPlaceholder: Search a project ...
</i18n>
