<template>
    <div class="flex flex-wrap justify-center gap-4">
        <project-list-item
            v-for="project in projects"
            :key="project.id"
            :project-name="project.name"
            :project-subline="project.art"
            :project-author="project.mitwirkende"
            :project-picture="project.titelbild"
            :project-link="linkify(project.name)"
        />
    </div>
</template>

<script setup lang="ts">
import ProjectListItem from '@/components/project-list-item-component.vue';

defineProps({
    projects: {
        type: Array,
        required: true,
    },
});

// throws an error for unknown reasons but works anyways
const linkify = (name: string) => {
    return name.replace(/ /g, '-').trim().toLowerCase();
};
</script>
