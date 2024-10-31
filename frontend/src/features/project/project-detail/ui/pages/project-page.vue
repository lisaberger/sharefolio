<script setup lang="ts">
import ProjectInformationComponent from '@/features/project/project-detail/ui/components/profile-project-item-component.vue';
import { useRoute } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import Project from '@/models/project';

import ProjectApi from '@/api/project-api';

const project = ref<Project | null>(null);
const route = useRoute();

const projectApi = ProjectApi.getInstance();

const fetchProjectByName = async (name: string): Promise<void> => {
    const projectResponse = await projectApi.getProjectByName(name);
    project.value = projectResponse;
};

onBeforeMount(() => fetchProjectByName(route.params.name as string));
</script>

<template>
    <section>
        <img
            :src="project?.teaserImage"
            alt="Projektbild"
            class="h-80 w-full rounded-b-3xl object-cover drop-shadow-sm"
        />
    </section>

    <project-information-component :project="project ? project : []" />

    <section>
        <div>
            <img
                id="b1"
                class="mt-2 rounded-3xl"
                :src="project?.image1"
                alt="Project Picture"
            />
            <img
                id="b2"
                class="mt-2 rounded-3xl"
                :src="project?.image2"
                alt="Project Picture"
            />
        </div>
    </section>
</template>
