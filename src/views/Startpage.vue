<script setup>
import ProjectItem from "../components/ProjectItem.vue";
import Button from "../components/form/Button.vue";
import MoreButton from "../components/form/MoreButton.vue";
import RandomProject from "../components/RandomProject.vue";
import UploadButton from "../components/form/UploadButton.vue";
import { onBeforeMount, ref } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

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
  axios.get("http://localhost:4000/projects").then((response) => {
    projects.value = response.data;

    /* Generate random number */
    const randN = Math.floor(Math.random() * response.data.length);
    console.log(randN);

    /* Decide the random project */
    titleproject.value = response.data[randN];
    isLoading.value = false;
  });

  if (Cookies.get("isLoggedIn")) {
    userLoggedIn.value = true;
    userID.value = Cookies.get("isLoggedIn")
    axios.get(`http://localhost:4000/user/id/${userID.value}`).then((response) => {
      user.value = response.data[0];
    })
  }
});

// throws an error for unknown reasons but works anyways
function linkify(nameString) {
  return nameString.replace(/ /g, "-").trim().toLowerCase();
}
</script>

<template>
  <div v-if="!isLoading">
    <section class="teaser">
      <RandomProject
        :projectName="titleproject.name"
        :projectSubline="titleproject.art"
        :projectPicture="titleproject.titelbild"
        :projectLink="linkify(titleproject.name)"
      >
      </RandomProject>
    </section>
    <section class="welcome">
      <div v-if="userLoggedIn">
        <h1>Willkommen, {{ user.username }}</h1>
        <p>Teile deine schönsten Projekte</p>
      <p>
        Oder lass dich von den kreativen Arbeiten anderer Designer inspirieren.
      </p>
      </div>
      <div class="logged__out" v-if="!userLoggedIn">
        <h1>Willkommen bei Sharefolio</h1>
        <p>Teile deine schönsten Projekte</p>
        <p>
          Melde dich an und erstelle dein eigenes Portfolio. Oder lass dich<br />
          von den kreativen Arbeiten anderer Designer inspirieren.
        </p>
        <router-link to="/login/">
          <Button type="button" label="Anmelden" theme="primary__btn" />
        </router-link>
        <router-link to="/register/">
          <div class="link">Noch kein Profil?</div>
        </router-link>
      </div>
    </section>
    <hr class="start__row" />
    <div class="centered__button">
      <router-link to="/new/">
        <UploadButton label="Neues Projekt" />
      </router-link>
    </div>
    <section class="projects">
      <div class="projects__container">
        <ProjectItem
          class="project"
          v-for="project in projects"
          :key="project.id"
          :projectName="project.name"
          :projectSubline="project.art"
          :projectAuthor="project.mitwirkende"
          :projectPicture="project.titelbild"
          :projectLink="linkify(project.name)"
        >
        </ProjectItem>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import "@/css/Startpage.scss";
</style>
