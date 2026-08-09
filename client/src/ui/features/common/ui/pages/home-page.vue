<script setup lang="ts">
import ProjectHeaderContainer from '@ui/features/header/ui/containers/project-header-container.vue';
import WelcomeContainer from '@ui/features/welcome/ui/containers/welcome-container.vue';
import { onBeforeMount, ref } from 'vue';
import Cookies from 'js-cookie';
import { Project } from '@core/project';
import { User } from '@core/user';

import { projectRepository, userRepository } from '@config';
import { RouteName } from '@ui/router/enums/route';
import ProjectListContainer from '@ui/features/project/project-list/ui/containers/project-list-container.vue';

const projects = ref<Array<Project>>([]);
const titleProject = ref<Project>();
const isLoading = ref<boolean>(false);
const userLoggedIn = ref<boolean>(false);
const userId = ref<string>();
const user = ref<User>();

const fetchProjects = async (): Promise<void> => {
    const result = await projectRepository.readAll();

    projects.value = result.data ?? [];
};

const fetchUserById = async (id: string): Promise<void> => {
    const result = await userRepository.getById(id);

    user.value = result.data;
};

const setTitleProject = (): void => {
    if (projects.value.length > 0) {
        const randomIndex = Math.floor(Math.random() * projects.value.length);
        titleProject.value = projects.value[randomIndex];
    }
};

onBeforeMount(async () => {
    isLoading.value = true;
    await fetchProjects();
    setTitleProject();
    isLoading.value = false;

    if (Cookies.get('isLoggedIn')) {
        userLoggedIn.value = true;
        userId.value = Cookies.get('isLoggedIn');
        if (userId.value) {
            fetchUserById(userId.value);
        }
    }
});
</script>

<template>
    <div v-if="!isLoading" class="space-y-16 md:space-y-20">
        <welcome-container
            :user-logged-in="userLoggedIn"
            :current-user="user"
        />

        <section v-if="titleProject" class="mx-auto max-w-5xl">
            <project-header-container :title-project="titleProject" />
        </section>

        <section class="mx-auto max-w-7xl">
            <div class="mb-8 flex items-end justify-between gap-4">
                <div>
                    <h2
                        class="text-surface-900 text-2xl font-bold tracking-tight"
                    >
                        Aus den Portfolios
                    </h2>
                    <p class="text-surface-500 mt-1 text-sm">
                        Eine Auswahl aktueller Projekte der Community
                    </p>
                </div>

                <router-link
                    :to="{ name: RouteName.NewProject }"
                    class="text-primary-500 hover:text-primary-600 inline-flex items-center gap-1 text-sm font-semibold"
                >
                    <span class="material-icons text-base">add</span>
                    Neues Projekt
                </router-link>
            </div>

            <project-list-container :projects="projects" />
        </section>
    </div>
</template>
