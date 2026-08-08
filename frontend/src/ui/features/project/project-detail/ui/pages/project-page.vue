<script setup lang="ts">
import ProjectInformationComponent from '@ui/features/project/project-detail/ui/components/project-information-component.vue';
import { useRoute } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import { Project } from '@core/project';
import { projectRepository } from '@config';

const project = ref<Project | null>(null);
const route = useRoute();

const fetchProjectByName = async (name: string): Promise<void> => {
    const result = await projectRepository.getByName(name);

    project.value = result.data ?? null;
};

onBeforeMount(() => fetchProjectByName(route.params.name as string));
</script>

<template>
    <div v-if="project" class="space-y-12 md:space-y-16">
        <section class="relative overflow-hidden rounded-3xl">
            <img
                :src="project.teaserImage"
                :alt="project.name"
                class="h-72 w-full object-cover md:h-96"
            />

            <div
                class="from-surface-950/85 via-surface-950/30 absolute inset-0 flex flex-col justify-end bg-gradient-to-t to-transparent p-6 md:p-12"
            >
                <h1
                    class="text-surface-900 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl"
                >
                    {{ project.name }}
                </h1>
                <div
                    v-if="project.creator"
                    class="mt-4 flex items-center gap-2 text-sm text-white/80"
                >
                    <span class="material-icons text-base">person</span>
                    <span>{{ project.creator.fullname }}</span>
                    <span class="mx-1">·</span>
                    <span>{{ project.kind }}</span>
                </div>
            </div>
        </section>

        <section class="mx-auto max-w-5xl">
            <project-information-component :project="project" />
        </section>

        <section
            v-if="project.image1 || project.image2"
            class="mx-auto max-w-5xl space-y-6"
        >
            <h2 class="text-surface-900 text-xl font-bold tracking-tight">
                Galerie
            </h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <img
                    v-if="project.image1"
                    :src="project.image1"
                    alt="Projektbild 1"
                    class="h-80 w-full rounded-2xl object-cover shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                />
                <img
                    v-if="project.image2"
                    :src="project.image2"
                    alt="Projektbild 2"
                    class="h-80 w-full rounded-2xl object-cover shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                />
            </div>
        </section>
    </div>
</template>
