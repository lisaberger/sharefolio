<script setup lang="ts">
import ProjectInformationComponent from '@/components/project-information-component.vue';
import { useRoute } from 'vue-router';
import { onBeforeMount, ref } from 'vue';

import ProjectApi from '@/api/project-api';

const project = ref({});
const route = useRoute();

const projectApi = ProjectApi.getInstance();

const fetchProjectByName = async (name: string): Promise<void> => {
    project.value = projectApi.getProjectByName(name)[0];
};

onBeforeMount(() => fetchProjectByName(route.params.name));
</script>

<template>
    <section>
        <img
            :src="project.titelbild"
            alt="Projektbild"
            class="h-80 w-full rounded-b-3xl object-cover drop-shadow-sm"
        />
    </section>

    <project-information-component
        :project-name="project.name"
        :project-subline="project.art"
        :project-description="project.description"
        :project-tools="project.tools"
        :project-category="project.kategorie"
        :project-participants="project.mitwirkende"
        :project-author="project.ersteller"
        :project-link="project.author"
    >
    </project-information-component>

    <section>
        <div>
            <img
                id="b1"
                class="mt-2 rounded-3xl"
                :src="project.bild1"
                alt="Project Picture"
            />
            <img
                id="b2"
                class="mt-2 rounded-3xl"
                :src="project.bild2"
                alt="Project Picture"
            />
        </div>
    </section>
</template>
