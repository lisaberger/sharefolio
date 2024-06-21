<script setup>
import { ref } from 'vue';

defineProps({
    projectName: {
        type: String,
        required: true,
    },
    projectSubline: {
        type: String,
        required: true,
    },
    projectAuthor: {
        type: String,
        required: true,
    },
    projectPicture: {
        type: String,
        required: true,
    },
    projectLink: {
        type: String,
        required: true,
    },
});

const customCard = ref({
    content: 'py-0',
    root: {
        class: ['rounded-3xl'],
    },
});
</script>

<template>
    <router-link :to="'/project/' + projectLink">
        <prime-card
            class="border-grey-100 w-72 border bg-white shadow-sm"
            :pt="customCard"
        >
            <template #header>
                <img
                    class="h-40 w-full rounded-t-3xl object-cover"
                    :src="projectPicture"
                    alt="Projektbild"
                />
            </template>
            <template #content>
                <div class="flex w-full justify-between">
                    <div>
                        <h5 class="text-sm font-bold">{{ projectName }}</h5>
                        <p class="text-xs">{{ projectSubline }}</p>
                    </div>

                    <div class="ml-1 text-xs">
                        <prime-avatar-group>
                            <prime-avatar
                                :image="projectPicture"
                                shape="circle"
                                v-for="(author, index) in projectAuthor.split(
                                    ', '
                                )"
                                :key="index"
                            />
                        </prime-avatar-group>
                    </div>
                </div>
            </template>
        </prime-card>
    </router-link>
</template>
