<template>
    <div v-if="!isLoading">
        <project-header-container :title-project="titleproject" />
        <welcome-container :user-logged-in="userLoggedIn" />
        <hr class="border-grey-100 mb-4" />

        <section class="mt-4 p-8">
            <project-list-container :projects="projects" />

            <div class="mt-4 flex justify-center">
                <router-link :to="{ name: 'NewProject' }">
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

<script setup lang="ts">
import ProjectListContainer from '@/containers/ProjectList.container.vue';
import ProjectHeaderContainer from '@/containers/ProjectHeader.container.vue';
import WelcomeContainer from '@/containers/Welcome.container.vue';
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';

/* Define props */
const projects = ref([]);
const titleproject = ref({}); // Big project on the top of the page
const isLoading = ref(true);
const userLoggedIn = ref(false);
const userID = ref();
const user = ref({});

/*******************/
/* Lifecycle Hooks */
/*******************/

onBeforeMount(() => {
    /* API Request */
    axios.get('http://localhost:4000/projects').then((response) => {
        projects.value = response.data;

        /* Generate random number */
        const randN = Math.floor(Math.random() * response.data.length);
        console.log(randN);

        /* Decide the random project */
        titleproject.value = response.data[randN];
        isLoading.value = false;
    });

    if (Cookies.get('isLoggedIn')) {
        userLoggedIn.value = true;
        userID.value = Cookies.get('isLoggedIn');
        axios
            .get(`http://localhost:4000/user/id/${userID.value}`)
            .then((response) => {
                user.value = response.data[0];
            });
    }
});
</script>
