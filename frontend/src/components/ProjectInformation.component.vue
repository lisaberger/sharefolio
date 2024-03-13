<template>
    <section class="m-8 flex gap-4">
        <div class="w-2/3 flex-auto">
            <h1 class="text-3xl font-bold">{{ projectName }}</h1>
            <p class="mb-2 text-lg">{{ projectSubline }}</p>
            <p>{{ projectDescription }}</p>

            <prime-button label="Demo" rounded class="mt-2" />
        </div>
        <div clas="w-1/3 flex-auto">
            <div class="mb-2 text-sm">
                <h5 class="font-semibold">Ersteller</h5>
                <div>
                    <router-link
                        :to="'/profile/' + projectLink + '/'"
                        class="flex items-center"
                    >
                        <prime-avatar shape="circle" />
                        <p class="ml-2">{{ projectAuthor }}</p>
                    </router-link>
                </div>
            </div>
            <div class="mb-2 text-sm">
                <h5 class="font-semibold">Tools</h5>
                <p>{{ projectTools }}</p>
            </div>
            <div class="mb-2 text-sm">
                <h5 class="font-semibold">Kategorie</h5>
                <p>{{ projectCategory }}</p>
            </div>
            <div class="mb-2 text-sm" v-if="projectParticipants">
                <h5 class="font-semibold">Mitwirkende</h5>
                <prime-avatar-group class="ml-4">
                    <prime-avatar
                        shape="circle"
                        v-for="(author, index) in projectParticipants.split(
                            ', '
                        )"
                        :key="index"
                    />
                </prime-avatar-group>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
defineProps({
    project: {
        type: Object,
        required: true,
    },
    projectName: {
        type: String,
        required: true,
    },
    projectSubline: {
        type: String,
        required: true,
    },
    projectDescription: {
        type: String,
        required: true,
    },
    projectTools: {
        type: String,
        required: true,
    },
    projectCategory: {
        type: String,
        required: true,
    },
    projectAuthor: {
        type: String,
        required: true,
    },
    projectParticipants: {
        type: String,
        required: true,
    },
    projectLink: {
        type: String,
        required: true,
    },
});
</script>
