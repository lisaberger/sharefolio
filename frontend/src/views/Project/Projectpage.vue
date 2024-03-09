<script setup>
import ProjectInfo from "../../components/ProjectInfo.vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { onBeforeMount, ref } from "vue";

/* Define Props */
const project = ref({});
const route = useRoute();

/*******************/
/* Lifecycle Hooks */
/*******************/

onBeforeMount(() => {
  /* API Request */
  axios.get(`http://localhost:4000/project/${route.params.name}`).then((response) => {
    project.value = response.data[0];
    console.log(project.value);
  });
});
</script>

<template>
  <section class="titlepicture">
    <img id="titlepic" :src="project.titelbild" alt="Random Projektbild" />
  </section>
  <section class="project">
    <ProjectInfo
      class="project__info"
      :projectName="project.name"
      :projectSubline="project.art"
      :projectDescription="project.beschreibung"
      :projectTools="project.tools"
      :projectCategory="project.kategorie"
      :projectParticipants="project.mitwirkende"
      :projectAuthor="project.ersteller"
      :projectLink="project.author"
    >
    </ProjectInfo>
  </section>
  <section class="project__pictures">
    <div class="project__bigpictures">
      <img id="b1" :src="project.bild1" alt="Project Picture" />
      <img id="b2" :src="project.bild2" alt="Project Picture" />
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@/css/Projectpage.scss";
</style>
