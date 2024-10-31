<script setup lang="ts">
import Project from '@/models/project';
import { RouteName } from '@/router/enums/route';
import { computed } from 'vue';

interface Props {
    titleProject: Project;
}

const props = defineProps<Props>();

// throws an error for unknown reasons but works anyways
const linkify = (name: string): string => {
    return name.replace(/ /g, '-').trim().toLowerCase();
};

const projectLink = computed(() => linkify(props.titleProject.name));
</script>

<template>
    <router-link
        :to="{ name: RouteName.Project, params: { name: projectLink } }"
        class="z-1 relative mt-8"
    >
        <img
            class="h-80 w-full rounded-lg object-cover drop-shadow-sm"
            :src="props.titleProject.teaserImage"
            alt="Zufälliges Projektbild"
        />
        <div
            class="from-primary-500 absolute bottom-0 flex h-40 w-full items-end justify-between rounded-b-lg bg-gradient-to-t to-95% px-8 py-2 text-white opacity-0 transition-opacity hover:opacity-100"
        >
            <div class="py-2">
                <h5 class="mb-2 text-sm font-semibold">Aus den Portfolios</h5>

                <p class="text-xs font-semibold">
                    {{ props.titleProject.name }}
                </p>
                <p class="text-xs">{{ props.titleProject.kind }}</p>
            </div>
            <div>
                <p class="text-xs">lisaberger</p>
                <p>[Icons]</p>
            </div>
        </div>
    </router-link>
</template>
