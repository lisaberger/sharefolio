<script setup lang="ts">
import RandomProjectComponent from '@/components/random-project-component.vue';

defineProps({
    titleProject: {
        type: Object,
        required: true,
    },
});

// throws an error for unknown reasons but works anyways
const linkify = (name: string) => {
    return name.replace(/ /g, '-').trim().toLowerCase();
};
</script>

<template>
    <section>
        <random-project-component
            :project-name="titleProject.name"
            :project-subline="titleProject.art"
            :project-picture="titleProject.titelbild"
            :project-link="linkify(titleProject.name)"
        >
        </random-project-component>
    </section>
</template>
