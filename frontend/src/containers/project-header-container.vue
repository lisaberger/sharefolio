<script setup lang="ts">
import TeaserCarouselComponent from '@/components/teaser-carousel-component.vue';
import { onBeforeMount, ref } from 'vue';
import ProjectApi from '@/api/project-api';
import Project from '@/models/project';

const projectApi = ProjectApi.getInstance();

const allProjects = ref<Project[]>([]);
const teaserProjects = ref<Project[]>([]);
const numTeaserProjects = 3;

const fetchProjects = async (): Promise<void> => {
    allProjects.value = await projectApi.getProjects();
};

const setTeaserProjects = (): void => {
    if (allProjects.value) {
        const numberProjects = allProjects.value.length;

        let randomProjects = [];

        for (let i = 0; i <= numTeaserProjects; i++) {
            const randomIndex = Math.floor(Math.random() * numberProjects);
            randomProjects.push(allProjects.value[randomIndex]);
        }

        teaserProjects.value = randomProjects;
    }
};

onBeforeMount(async () => {
    await fetchProjects();
    setTeaserProjects();
});
</script>

<template>
    <section class="my-4">
        <teaser-carousel-component :projects="teaserProjects" />
    </section>
</template>
