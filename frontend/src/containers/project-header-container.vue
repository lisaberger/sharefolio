<script setup lang="ts">
import RandomProjectComponent from '@/components/random-project-component.vue';
import Project from '@/models/project';

interface Props {
    titleProject: Project;
}

const props = defineProps<Props>();
</script>

<template>
    <section>
        <random-project-component :title-project="props.titleProject" />
    </section>
</template>
