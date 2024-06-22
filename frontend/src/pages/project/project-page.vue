<script setup lang="ts">
import ProjectInformationComponent from '@/components/project-information-component.vue';
import { useRoute } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import Project from '@/models/project';

import ProjectApi from '@/api/project-api';

const project = ref<Project>(null);
const route = useRoute();

const projectApi = ProjectApi.getInstance();

const fetchProjectByName = async (name: string): Promise<void> => {
    const projectResponse = await projectApi.getProjectByName(name);
    console.log(projectResponse);
};

onBeforeMount(() => fetchProjectByName(route.params.name));
</script>

<template>
    <section>
        <img
            :src="project.teaserImage"
            alt="Projektbild"
            class="h-80 w-full rounded-b-3xl object-cover drop-shadow-sm"
        />
    </section>

    <project-information-component :project="project" />

    <section>
        <div>
            <img
                id="b1"
                class="mt-2 rounded-3xl"
                :src="project.image1"
                alt="Project Picture"
            />
            <img
                id="b2"
                class="mt-2 rounded-3xl"
                :src="project.image2"
                alt="Project Picture"
            />
        </div>
    </section>
</template>
