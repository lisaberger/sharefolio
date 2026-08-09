<script setup lang="ts">
import { Project } from '@core/project';
import ProjectListItemComponent from '../components/project-list-item-component.vue';

interface Props {
    projects: Array<Project>;
}

defineProps<Props>();
</script>

<template>
    <div
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
        <ProjectListItemComponent
            v-for="project in projects"
            :key="project.id"
            :project="project"
        />
    </div>
</template>
