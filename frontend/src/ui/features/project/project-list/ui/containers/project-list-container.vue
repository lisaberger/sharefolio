<script setup lang="ts">
import { Project } from '@core/project';
import ProjectListItemComponent from '../components/project-list-item-component.vue';

interface Props {
    projects: Array<Project>;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="flex flex-wrap justify-center gap-4">
        <ProjectListItemComponent
            v-for="project in props.projects"
            :key="project.id"
            :project="project"
        />
    </div>
</template>
