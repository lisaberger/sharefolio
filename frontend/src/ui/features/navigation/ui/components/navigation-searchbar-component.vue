<script setup lang="ts">
import type { Project } from '@core/project';
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
        v-model="selectedProject"
        :placeholder="t('searchPlaceholder')"
        :empty-search-message="t('emptySearchMessage')"
        :pt="{
            root: {
                class: ['w-full!'],
            },
            pcInput: {
                root: {
                    class: [
                        'w-full !rounded-full !text-sm',
                        'focus:!shadow-none focus:!border-primary-300',
                    ],
                },
            },
        }"
        :suggestions="props.suggestions"
        option-label="name"
        @complete="handleComplete"
        @option-select="handleSelect"
    >
        <template #option="slotProps">
            <div class="my-1 flex w-full items-center gap-3 px-1">
                <img
                    class="border-surface-100 h-10 w-12 shrink-0 rounded-md border object-cover"
                    :src="slotProps.option.teaserImage"
                />
                <div class="min-w-0">
                    <h4 class="truncate text-sm font-semibold">
                        {{ slotProps.option.name }}
                    </h4>
                    <div class="text-surface-500 truncate text-xs">
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
    emptySearchMessage: No project found
</i18n>
