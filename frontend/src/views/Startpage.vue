<script setup>
import ProjectItem from '../components/ProjectItem.vue';
import Button from '../components/form/Button.vue';
import RandomProject from '../components/RandomProject.vue';
import UploadButton from '../components/form/UploadButton.vue';
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

// throws an error for unknown reasons but works anyways
function linkify(nameString) {
    return nameString.replace(/ /g, '-').trim().toLowerCase();
}
</script>

<template>
    <div v-if="!isLoading">
        <section>
            <RandomProject
                :project-name="titleproject.name"
                :project-subline="titleproject.art"
                :project-picture="titleproject.titelbild"
                :project-link="linkify(titleproject.name)"
            >
            </RandomProject>
        </section>
        <section class="flex justify-center py-10 text-center">
            <div v-if="userLoggedIn">
                <h1 class="text-3xl">Willkommen, {{ user.username }}</h1>
                <p>Teile deine schönsten Projekte</p>
                <p>
                    Oder lass dich von den kreativen Arbeiten anderer Designer
                    inspirieren.
                </p>
            </div>
            <div else>
                <h1 class="text-4xl font-extrabold">
                    Willkommen bei Sharefolio
                </h1>
                <p class="mb-4 text-lg">Teile deine schönsten Projekte</p>
                <p class="mb-2 text-sm">
                    Melde dich an und teile dein Portfolio. Oder lass dich<br />
                    von den kreativen Arbeiten anderer Designer inspirieren.
                </p>
                <router-link to="/login/">
                    <prime-button label="Anmelden" rounded class="mb-4" />
                </router-link>
                <router-link to="/register/">
                    <div class="text-sm">Noch kein Profil?</div>
                </router-link>
            </div>
        </section>
        <hr class="border-grey-100 mb-4" />
        <div class="flex justify-center">
            <router-link to="/new/">
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
        <section class="mt-4">
            <div class="flex flex-wrap justify-center gap-4 px-8">
                <ProjectItem
                    v-for="project in projects"
                    :key="project.id"
                    :project-name="project.name"
                    :project-subline="project.art"
                    :project-author="project.mitwirkende"
                    :project-picture="project.titelbild"
                    :project-link="linkify(project.name)"
                >
                </ProjectItem>
            </div>
        </section>
    </div>
</template>
