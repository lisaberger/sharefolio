<script setup lang="ts">
import type Project from '@/models/project';
import type {
    AutoCompleteCompleteEvent,
    AutoCompleteOptionSelectEvent,
} from 'primevue/autocomplete';
import { useI18n } from 'vue-i18n';

interface Props {
    suggestions?: Array<Project>;
}

const props = defineProps<Props>();

type Emits = {
    complete: [AutoCompleteCompleteEvent];
    optionSelect: [AutoCompleteOptionSelectEvent];
};

const emit = defineEmits<Emits>();

const { t } = useI18n();

const selectedProject = defineModel<Project>({});

const handleComplete = (event: AutoCompleteCompleteEvent): void => {
    emit('complete', event);
};

const handleSelect = (event: AutoCompleteOptionSelectEvent): void => {
    emit('optionSelect', event);
};
</script>

<template>
    <prime-auto-complete
        :placeholder="t('searchPlaceholder')"
        :empty-search-message="t('emptySearchMessage')"
        v-model="selectedProject"
        :pt="{
            root: {
                class: ['w-full'],
            },
            pcInput: {
                root: {
                    class: ['w-full !text-sm'],
                },
            },
        }"
        :suggestions="props.suggestions"
        option-label="name"
        @complete="handleComplete"
        @option-select="handleSelect"
    >
        <template #option="slotProps">
            <div class="align-center my-2 flex w-full">
                <img
                    class="mr-2 h-10 w-12 rounded-md border object-cover"
                    :src="slotProps.option.teaserImage"
                />
                <div>
                    <h4 class="font-bold">
                        {{ slotProps.option.name }}
                    </h4>
                    <div class="text-surface-600 text-xs">
                        {{ slotProps.option.kind }}
                    </div>
                </div>
            </div>
        </template>
    </prime-auto-complete>
</template>

<i18n lang="yaml">
de:
    searchPlaceholder: Suche nach kreativen Arbeiten ...
    emptySearchMessage: Kein Projekt gefunden
en:
    searchPlaceholder: Search a project ...
    emptySearchMessage: No selected item
</i18n>
