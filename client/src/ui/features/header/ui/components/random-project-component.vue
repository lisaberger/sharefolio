<script setup lang="ts">
import { Project } from '@core/project';
import { RouteName } from '@ui/router/enums/route';
import { computed } from 'vue';

interface Props {
    titleProject?: Project;
}

const props = defineProps<Props>();

const linkify = (name: string): string => {
    return name.replace(/ /g, '-').trim().toLowerCase();
};

const projectLink = computed(() =>
    props.titleProject ? linkify(props.titleProject.name) : ''
);
</script>

<template>
    <router-link
        v-if="props.titleProject"
        :to="{ name: RouteName.Project, params: { name: projectLink } }"
        class="group relative block overflow-hidden rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
        <img
            class="h-96 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            :src="props.titleProject.teaserImage"
            alt="Ausgewähltes Projekt"
        />

        <div
            class="from-surface-950/90 absolute inset-0 flex flex-col justify-end bg-linear-to-t via-transparent to-transparent p-8 md:p-10"
        >
            <span
                class="bg-primary-500 mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
            >
                {{ props.titleProject.kind }}
            </span>

            <h2 class="text-2xl font-bold text-white md:text-3xl">
                {{ props.titleProject.name }}
            </h2>

            <p
                class="mt-2 flex items-center gap-2 text-sm font-medium text-white/80"
            >
                <span class="material-icons text-base">auto_awesome</span>
                Aus den Portfolios
            </p>

            <div
                class="group-hover:text-primary-600 mt-6 flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors group-hover:bg-white"
            >
                <span>Projekt ansehen</span>
                <span class="material-icons text-base">arrow_forward</span>
            </div>
        </div>
    </router-link>
</template>
