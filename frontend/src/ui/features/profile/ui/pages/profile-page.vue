<script setup lang="ts">
import ProfileProjectItem from '@ui/features/project/project-detail/ui/components/profile-project-item-component.vue';
import { useRoute } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import { User } from '@core/user';
import { Project } from '@core/project';
import { getApiBasePath, userRepository } from '@config';

/* Define Props */
const account = ref<User | null>(null);
const projects = ref<Array<Project> | null>(null);
const route = useRoute();
const isLoading = ref(true);

/*******************/
/* Lifecycle Hooks */
/*******************/

onBeforeMount(() => {
    const username = route.params.user as string;

    /* API Request for user data */
    userRepository.getByName(username).then((result) => {
        account.value = result.data ?? null;
        isLoading.value = false;
    });

    /* API Request for projects associated with the user */
    userRepository.getProjectsByUsername(username).then((result) => {
        projects.value = result.data ?? null;
    });
});
</script>

<template>
    <div v-if="!isLoading">
        <section class="profile">
            <img
                id="pfp"
                :src="getApiBasePath() + account?.image"
                alt="Profile Picture"
            />
            <div class="profile__info">
                <h1>{{ account?.firstname }} {{ account?.lastname }}</h1>
                <p>{{ account?.job }}</p>
                <p>
                    {{ account?.description }}
                </p>
                <div class="location__container">
                    <span class="location">
                        <img src="@/assets/links/Locoation Icon.svg" alt="" />
                        <h5>{{ account?.location }}</h5>
                    </span>
                    <a :href="'mailto:' + account?.email">
                        <prime-button label="Kontakt" />
                    </a>
                </div>
            </div>
        </section>
        <hr />
        <section class="personal__projects">
            <section class="projects">
                <div class="projects__info">
                    <ProfileProjectItem
                        v-for="project in projects"
                        :key="project.id"
                        :project="project"
                    >
                    </ProfileProjectItem>
                </div>
            </section>
        </section>
    </div>
</template>
