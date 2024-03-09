<template>
  <router-link :to="'/project/' + projectLink">
    <div>
      <img class="projectImg" :src="projectPicture" alt="Projektbild" />
      <div class="startproject__info">
        <h5>{{ projectName }}</h5>
        <p class="project__sub">{{ projectSubline }}</p>
        <p>{{ projectAuthor }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ProjectItem",
  props: {
    projectName: {
      type: String,
      required: true,
    },
    projectSubline: {
      type: String,
      required: true,
    },
    projectAuthor: {
      type: String,
      required: true,
    },
    projectPicture: {
      type: String,
      required: true,
    },
    projectLink: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "../assets/css/components/ProjectItem.scss";
</style>
