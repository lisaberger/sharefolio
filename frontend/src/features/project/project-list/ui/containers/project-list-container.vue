<script setup lang="ts">
import Project from '@/models/project';
import ProjectListItemComponent from '../components/project-list-item-component.vue';

interface Props {
    projects: Array<Project>;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="flex flex-wrap justify-center gap-4">
        <project-list-item
            v-for="project in props.projects"
            :project="project"
            :key="project.id"
        />
    </div>
</template>
