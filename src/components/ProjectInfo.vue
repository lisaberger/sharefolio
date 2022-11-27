<template>
  <div class="project__info">
    <h1>{{ projectName }}</h1>
    <p>{{ projectSubline }}</p>
    <p>{{ projectDescription }}</p>
    <Button type="button" label="Demo" theme="primary__btn" />
  </div>
  <div class="sidefacts">
    <div class="participants">
      <h5>Author</h5>
      <router-link :to="'/profile/' + projectLink + '/'">
        <p class="link">{{ projectAuthor }}</p></router-link
      >
    </div>
    <div>
      <h5>Tools</h5>
      <p>{{ projectTools }}</p>
    </div>
    <div>
      <h5>Kategorie</h5>
      <p>{{ projectCategory }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectInfo",
  props: {
    project: {
      type: Object,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    projectSubline: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    projectTools: {
      type: String,
      required: true,
    },
    projectCategory: {
      type: String,
      required: true,
    },
    projectAuthor: {
      type: String,
      required: true,
    },
    projectParticipants: {
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
@import "../assets/css/components/ProjectInfo.scss";
</style>
