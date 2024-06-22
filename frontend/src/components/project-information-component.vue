<script setup lang="ts">
interface Props {
    project: Project;
}
const props = defineProps<Props>();
</script>

<template>
    <section class="m-8 flex gap-4">
        <div class="w-2/3 flex-auto">
            <h1 class="text-3xl font-bold">{{ props.project.name }}</h1>
            <p class="mb-2 text-lg">{{ props.project.kind }}</p>
            <p>{{ props.project.description }}</p>

            <prime-button label="Demo" rounded class="mt-2" />
        </div>
        <div clas="w-1/3 flex-auto">
            <div class="mb-2 text-sm">
                <h5 class="font-semibold">Ersteller</h5>
                <div>
                    <router-link
                        :to="'/profile/' + props.project.name + '/'"
                        class="flex items-center"
                    >
                        <prime-avatar shape="circle" />
                        <p class="ml-2">{{ props.project.creator }}</p>
                    </router-link>
                </div>
            </div>
            <div class="mb-2 text-sm">
                <h5 class="font-semibold">Tools</h5>
                <p>{{ projectTools }}</p>
            </div>
            <div class="mb-2 text-sm">
                <h5 class="font-semibold">Kategorie</h5>
                <p>{{ props.project.category }}</p>
            </div>
            <div class="mb-2 text-sm" v-if="props.project.contributors">
                <h5 class="font-semibold">Mitwirkende</h5>
                <prime-avatar-group class="ml-4">
                    <prime-avatar
                        shape="circle"
                        v-for="(
                            author, index
                        ) in props.project.contributors.split(', ')"
                        :key="index"
                    />
                </prime-avatar-group>
            </div>
        </div>
    </section>
</template>
