<script setup>
import ProfileProjectItem from '../../components/ProfileProjectItem.vue';
import Button from '../../components/form/Button.vue';
import UploadButton from '../../components/form/UploadButton.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { onBeforeMount, ref } from 'vue';

/* Define Props */
const account = ref({});
const projects = ref([]);
const route = useRoute();
const isLoading = ref(true);

/*******************/
/* Lifecycle Hooks */
/*******************/

onBeforeMount(() => {
    /* API Request for user data */
    axios
        .get(`http://localhost:4000/user/${route.params.user}`)
        .then((response) => {
            account.value = response.data[0];
            console.log(account.value);
            isLoading.value = false;
            d;
        });

    /* API Request for projects associated with the user */
    axios
        .get(`http://localhost:4000/user/${route.params.user}/projects`)
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
                :src="'http://localhost:3000/' + account.profilbild"
                alt="Profile Picture"
            />
            <div class="profile__info">
                <h1>{{ account.vorname }} {{ account.name }}</h1>
                <p>{{ account.jobtitel }}</p>
                <p>
                    {{ account.beschreibung }}
                </p>
                <div class="location__container">
                    <span class="location">
                        <img
                            src="../../assets/links/Locoation Icon.svg"
                            alt=""
                        />
                        <h5>{{ account.ort }}</h5>
                    </span>
                    <a :href="'mailto:' + account.email"
                        ><Button
                            type="button"
                            label="Kontakt"
                            theme="primary__btn"
                    /></a>
                </div>
            </div>
        </section>
        <hr />
        <section class="personal__projects">
            <router-link to="/new">
                <UploadButton label="Neues Projekt" />
            </router-link>
            <section class="projects">
                <div class="projects__info">
                    <ProfileProjectItem
                        v-for="project in projects"
                        :key="project.id"
                        class="project"
                        :project-name="project.name"
                        :project-subline="project.art"
                        :project-desctiption="project.beschreibung"
                        :project-picture="project.titelbild"
                        :project-link="linkify(project.name)"
                    >
                    </ProfileProjectItem>
                </div>
            </section>
        </section>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/css/views/Profilepage.scss';
</style>
