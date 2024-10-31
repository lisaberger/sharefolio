<script setup lang="ts">
import Project from '@/models/project';

interface Props {
    project: Project;
}

const props = defineProps<Props>();
</script>

<template>
    <div>
        <img
            class="projectProfile__Img"
            :src="props.project.teaserImage"
            alt="Projektbild"
        />
        <div>
            <h4>{{ props.project.name }}</h4>
            <p class="project__sub">{{ props.project.kind }}</p>
            <p>{{ props.project.description }}</p>
            <router-link :to="'/project/' + props.project.name">
                <prime-button label="Projektdetails" severity="secondary" />
            </router-link>
        </div>
    </div>
</template>
