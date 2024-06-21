<template>
    <router-link
        :to="{ name: 'Project', params: { name: projectLink } }"
        class="relative"
    >
        <img
            class="h-80 w-full rounded-b-3xl object-cover drop-shadow-sm"
            :src="projectPicture"
            alt="Zufälliges Projektbild"
        />
        <div
            class="from-primary-500 absolute bottom-0 flex h-40 w-full items-end justify-between rounded-b-3xl bg-gradient-to-t to-95% px-8 py-2 text-white opacity-0 transition-opacity hover:opacity-100"
        >
            <div class="py-2">
                <h5 class="mb-2 text-sm font-semibold">Aus den Portfolios</h5>

                <p class="text-xs font-semibold">{{ projectName }}</p>
                <p class="text-xs">{{ projectSubline }}</p>
            </div>
            <div>
                <p class="text-xs">lisaberger</p>
                <p>[Icons]</p>
            </div>
        </div>
    </router-link>
</template>

<script setup lang="ts">
interface Props {
    projectName: string;
    projectSubline: string;
    projectPicture: string;
    projectLink: string;
}

defineProps<Props>();
</script>
