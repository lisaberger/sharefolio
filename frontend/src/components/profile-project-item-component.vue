<template>
    <div>
        <img
            class="projectProfile__Img"
            :src="projectPicture"
            alt="Projektbild"
        />
        <div>
            <h4>{{ projectName }}</h4>
            <p class="project__sub">{{ projectSubline }}</p>
            <p>{{ projectDesctiption }}</p>
            <router-link :to="'/project/' + projectLink">
                <Button
                    type="button"
                    label="Projektdetails"
                    theme="secondary__btn"
                />
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/form/button.vue';

interface Props {
    projectName: string;
    projectSubline: string;
    projectDesctiption: string;
    projectPicture: string;
    projectLink: string;
}

defineProps<Props>();
</script>
