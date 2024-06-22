<script setup lang="ts">
import Project from '@/models/project';
import { ref } from 'vue';

interface Props {
    project: Project;
}

const props = defineProps<Props>();

// throws an error for unknown reasons but works anyways
const linkify = (name: string): string => {
    return name.replace(/ /g, '-').trim().toLowerCase();
};

const customCard = ref({
    content: 'py-0',
    root: {
        class: ['rounded-xl'],
    },
});
</script>

<template>
    <router-link :to="'/project/' + linkify(props.project.name)">
        <prime-card
            class="border-grey-100 w-72 border bg-white shadow-sm"
            :pt="customCard"
        >
            <template #header>
                <img
                    class="h-40 w-full rounded-t-3xl object-cover"
                    :src="props.project.image"
                    alt="Projektbild"
                />
            </template>
            <template #content>
                <div class="flex w-full justify-between">
                    <div>
                        <h5 class="text-sm font-bold">
                            {{ props.project.name }}
                        </h5>
                        <p class="text-xs">{{ props.project.kind }}</p>
                    </div>

                    <div class="ml-1 text-xs">
                        <prime-avatar-group>
                            <prime-avatar
                                :image="props.project.image"
                                shape="circle"
                                v-for="(
                                    author, index
                                ) in props.project.contributors.split(', ')"
                                :key="index"
                            />
                        </prime-avatar-group>
                    </div>
                </div>
            </template>
        </prime-card>
    </router-link>
</template>
