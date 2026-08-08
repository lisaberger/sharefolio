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

const projects = ref<Array<Project>>();
const titleProject = ref<Project>();
const isLoading = ref<boolean>(false);
const userLoggedIn = ref<boolean>(false);
const userId = ref<string>();
const user = ref<User>();

const fetchProjects = async (): Promise<void> => {
    const result = await projectRepository.readAll();

    projects.value = result.data;
};

const fetchUserById = async (id: string): Promise<void> => {
    const result = await userRepository.getById(id);

    user.value = result.data;
};

const setTitleProject = (): void => {
    if (projects.value) {
        const numberProjects = projects.value.length;
        const randomIndex = Math.floor(Math.random() * numberProjects);
        titleProject.value = projects.value[randomIndex];
    }
};

onBeforeMount(() => {
    isLoading.value = true;
    fetchProjects();
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
    <div v-if="!isLoading">
        <project-header-container :title-project="titleProject" />
        <welcome-container
            :user-logged-in="userLoggedIn"
            :current-user="user"
        />
        <hr class="border-grey-100 mb-4" />

        <section class="mt-4 p-8">
            <project-list-container :projects="projects ?? []" />

            <div class="mt-4 flex justify-center">
                <router-link :to="{ name: RouteName.NewProject }">
                    <prime-button label="Neues Projekt" rounded outlined>
                        <template #icon>
                            <font-awesome-icon
                                :icon="['fas', 'plus']"
                                class="mr-2"
                            />
                        </template>
                    </prime-button>
                </router-link>
            </div>
        </section>
    </div>
</template>
