<!-- <template>
    <router-link :to="'/project/' + projectLink">
        <img
            class="teaser__picture"
            :src="projectPicture"
            alt="Random Projektbild"
        />
        <div class="teaser__infobox">
            <h5>Aus den Portfolios</h5>
            <div>
                <h5>{{ projectName }}</h5>
                <p>{{ projectSubline }}</p>
            </div>
        </div>
    </router-link>
</template> -->
<template>
    <router-link :to="'/project/' + projectLink" class="relative">
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

<script>
export default {
    name: 'ProjectInfo',
    props: {
        projectName: {
            type: String,
            required: true,
        },
        projectSubline: {
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
    },
};
</script>
