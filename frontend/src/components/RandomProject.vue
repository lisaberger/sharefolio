<template>
  <router-link :to="'/project/' + projectLink">
    <img class="teaser__picture" :src="projectPicture" alt="Random Projektbild" />
    <div class="teaser__infobox">
      <h5>Aus den Portfolios</h5>
      <div>
        <h5>{{ projectName }}</h5>
        <p>{{ projectSubline }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ProjectInfo",
  props: {
    projectName: {
      type: String,
      required: true,
    },
    projectSubline: {
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
@import "../assets/css/components/RandomProject.scss";
</style>
