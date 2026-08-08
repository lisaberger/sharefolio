<script setup lang="ts">
import { Project } from '@core/project';
import { computed } from 'vue';

interface Props {
    project: Project;
}

const props = defineProps<Props>();

const linkify = (name: string): string => {
    return name.replace(/ /g, '-').trim().toLowerCase();
};

const contributors = computed(() =>
    props.project.contributors
        ? props.project.contributors.split(',').map((c) => c.trim())
        : []
);
</script>

<template>
    <router-link
        :to="'/project/' + linkify(props.project.name)"
        class="border-surface-200 group flex w-72 flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
        <div class="relative h-44 overflow-hidden">
            <img
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                :src="props.project.teaserImage"
                :alt="props.project.name"
            />

            <span
                v-if="props.project.category"
                class="bg-surface-900/60 absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
            >
                {{ props.project.category }}
            </span>
        </div>

        <div class="flex flex-1 flex-col gap-2 p-4">
            <div class="flex items-start justify-between gap-2">
                <div class="min-w-0">
                    <h5 class="text-surface-900 truncate text-sm font-bold">
                        {{ props.project.name }}
                    </h5>
                    <p class="text-surface-500 text-xs">
                        {{ props.project.kind }}
                    </p>
                </div>

                <span
                    v-if="contributors.length > 0"
                    class="material-icons text-surface-300 text-xl"
                >
                    group
                </span>
            </div>

            <p
                v-if="props.project.description"
                class="text-surface-500 line-clamp-2 text-xs leading-relaxed"
            >
                {{ props.project.description }}
            </p>

            <div class="mt-auto flex items-center justify-between pt-2">
                <span
                    v-if="props.project.demo"
                    class="material-icons text-primary-500 text-base"
                >
                    open_in_new
                </span>
                <span class="flex-1" />
                <span
                    class="text-primary-500 inline-flex items-center gap-1 text-xs font-semibold transition-transform group-hover:translate-x-0.5"
                >
                    Ansehen
                    <span class="material-icons text-sm">arrow_forward</span>
                </span>
            </div>
        </div>
    </router-link>
</template>
