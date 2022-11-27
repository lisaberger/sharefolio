<script setup>
import Button from "../../src/components/form/Button.vue"; 
</script>

<template>
  <section class="error">
    <img src="../assets/links/sadlogo.png" alt="Error Logo">
    <h1>Oops!</h1>
    <h2>We can't seem to find the page you're looking for.</h2>
    <p>Error Code: 404</p>
    <router-link to="/">
      <Button type="button" label="Startseite" theme="primary__btn"/>
    </router-link>
  </section>
</template>

<style scoped lang="scss">
@import "@/css/Error.scss";
</style>
