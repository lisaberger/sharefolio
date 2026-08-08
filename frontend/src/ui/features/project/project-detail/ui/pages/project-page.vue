<script setup lang="ts">
import ProjectInformationComponent from '@ui/features/project/project-detail/ui/components/profile-project-item-component.vue';
import { useRoute } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import { Project } from '@core/project';
import { projectRepository } from '@config';

const project = ref<Project | null>(null);
const route = useRoute();

const fetchProjectByName = async (name: string): Promise<void> => {
    const result = await projectRepository.getByName(name);

    project.value = result.data ?? null;
};

onBeforeMount(() => fetchProjectByName(route.params.name as string));
</script>

<template>
    <section>
        <img
            :src="project?.teaserImage"
            alt="Projektbild"
            class="h-80 w-full rounded-b-3xl object-cover drop-shadow-sm"
        />
    </section>

    <project-information-component v-if="project" :project="project" />

    <section>
        <div>
            <img
                id="b1"
                class="mt-2 rounded-3xl"
                :src="project?.image1"
                alt="Project Picture"
            />
            <img
                id="b2"
                class="mt-2 rounded-3xl"
                :src="project?.image2"
                alt="Project Picture"
            />
        </div>
    </section>
</template>
