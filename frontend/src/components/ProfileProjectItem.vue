<script setup>
import Button from "/src/components/form/Button.vue";
</script>
<template>
    <div>
      <img class="projectProfile__Img" :src="projectPicture" alt="Projektbild" />
      <div>
        <h4>{{ projectName }}</h4>
        <p class="project__sub">{{ projectSubline }}</p>
        <p>{{ projectDesctiption }}</p>
        <router-link :to="'/project/' + projectLink">
          <Button type="button" label="Projektdetails" theme="secondary__btn" />
        </router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: "ProfileProjectItem",
  props: {
    projectName: {
      type: String,
      required: true,
    },
    projectSubline: {
      type: String,
      required: true,
    },
    projectDesctiption: {
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
@import "../assets/css/components/ProfileProjectItem.scss";
</style>
