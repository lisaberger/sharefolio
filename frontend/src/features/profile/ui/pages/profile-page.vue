<script setup lang="ts">
import ProfileProjectItemComponent from '@/features/project/project-detail/ui/components/profile-project-item-component.vue';
// import UploadButton from '@/components/form/upload-button.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import User from '@/models/user';
import Project from '@/models/project';
import { RouteName } from '@/router/enums/route';

/* Define Props */
const account = ref<User | null>(null);
const projects = ref<Array<Project> | null>(null);
const route = useRoute();
const isLoading = ref(true);

/*******************/
/* Lifecycle Hooks */
/*******************/

onBeforeMount(() => {
    /* API Request for user data */
    axios
        .get(`http://localhost:4000/users/${route.params.user}`)
        .then((response) => {
            account.value = response.data[0];
            isLoading.value = false;
        });

    /* API Request for projects associated with the user */
    axios
        .get(`http://localhost:4000/users/${route.params.user}/projects`)
        .then((response) => {
            projects.value = response.data;
        });
});

function linkify(nameString) {
    return nameString.replace(/ /g, '-').trim().toLowerCase();
}
</script>

<template>
    <div v-if="!isLoading">
        <section class="profile">
            <img
                id="pfp"
                :src="'http://localhost:4000/' + account.image"
                alt="Profile Picture"
            />
            <div class="profile__info">
                <h1>{{ account.firstname }} {{ account.lastname }}</h1>
                <p>{{ account.job }}</p>
                <p>
                    {{ account.description }}
                </p>
                <div class="location__container">
                    <span class="location">
                        <img
                            src="../../assets/links/Locoation Icon.svg"
                            alt=""
                        />
                        <h5>{{ account.location }}</h5>
                    </span>
                    <a :href="'mailto:' + account.email">
                        <prime-button label="Kontakt" />
                    </a>
                </div>
            </div>
        </section>
        <hr />
        <section class="personal__projects">
            <!-- <router-link :to="{ name: RouteName.NewProject }">
                <UploadButton label="Neues Projekt" />
            </router-link> -->
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
