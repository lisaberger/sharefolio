<script setup lang="ts">
import RandomProjectComponent from '@ui/features/header/ui/components/random-project-component.vue';
import { Project } from '@core/project';

interface Props {
    titleProject?: Project;
}

const props = defineProps<Props>();
</script>

<template>
    <section class="my-4">
        <random-project-component :title-project="props.titleProject" />
    </section>
</template>
