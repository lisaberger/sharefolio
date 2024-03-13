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
        :project-description="project.beschreibung"
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

<script setup>
import ProjectInformationComponent from '@/components/ProjectInformation.component.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { onBeforeMount, ref } from 'vue';

/* Define Props */
const project = ref({});
const route = useRoute();

/*******************/
/* Lifecycle Hooks */
/*******************/

onBeforeMount(() => {
    /* API Request */
    axios
        .get(`http://localhost:4000/project/${route.params.name}`)
        .then((response) => {
            project.value = response.data[0];
        });
});
</script>
