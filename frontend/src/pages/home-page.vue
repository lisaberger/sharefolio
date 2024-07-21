<script setup lang="ts">
import ProjectListContainer from '@/containers/project-list-container.vue';
import ProjectHeaderContainer from '@/containers/project-header-container.vue';
import WelcomeContainer from '@/containers/welcome-container.vue';
import { onBeforeMount, ref } from 'vue';
import Cookies from 'js-cookie';
import Project from '@/models/project';
import User from '@/models/user';

import ProjectApi from '@/api/project-api';
import UserApi from '@/api/user-api';
import { RouteName } from '@/router/enum/route';

const projectApi = ProjectApi.getInstance();
const userApi = UserApi.getInstance();

const projects = ref<Array<Project>>();
const titleProject = ref<Project>();
const isLoading = ref<boolean>(false);
const userLoggedIn = ref<boolean>();
const userId = ref<string>();
const user = ref<User>();

const fetchProjects = async (): Promise<void> => {
    projects.value = await projectApi.getProjects();
};

const fetchUserById = async (id: string): Promise<void> => {
    user.value = await userApi.getUserById(id);
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
        fetchUserById(userId.value);
    }
});
</script>

<template>
    <div v-if="!isLoading">
        <project-header-container />
        <welcome-container
            :user-logged-in="userLoggedIn"
            :current-user="user"
        />
        <hr class="border-grey-100 mb-4" />

        <section class="mt-4 p-8">
            <project-list-container :projects="projects" />

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
