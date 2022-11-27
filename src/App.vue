<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { RouterLink, RouterView } from "vue-router";
import Button from "/src/components/form/Button.vue";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "vue-router";

const userLoggedIn = ref(false);
const userID = ref();
const user = ref({});
const router = useRouter();
// const isLoading = true
onBeforeMount(() => {
  if (Cookies.get("isLoggedIn")) {
    userLoggedIn.value = true;
    userID.value = Cookies.get("isLoggedIn");
    axios.get(`http://localhost:4000/user/id/${userID.value}`).then((response) => {
      user.value = response.data[0];
    });
  }
});

const logoutUser = () => {
  axios.get("http://localhost:4000/logout");
  Cookies.remove("isLoggedIn");
  router.go();
};
</script>

<template>
  <header>
    <nav class="navbar">
      <ul class="nav-menu">
        <li class="nav-item">
          <router-link to="/"
            ><img
              id="logo__big"
              src="./assets/links/sharefolio_rgb_3c.svg"
              alt="Sharefolio-Logo"
            />
            <!-- <img id="logo__small" src="./links/sharefolio_rgb_3c_var2.svg" alt="Sharefolio-Logo small"
          /> --></router-link
          >
        </li>
        <li>
          <div>
            <div class="logged__out" v-if="!userLoggedIn">
              <router-link to="/login">
                <Button type="button" label="Anmelden" theme="secondary__btn" />
              </router-link>
            </div>
            <div class="logged__in" v-if="userLoggedIn">
              <Button
                type="button"
                label="Abmelden"
                theme="secondary__btn"
                @click="logoutUser"
              />
              <router-link class="link" :to="'/profile/' + user.username">
                {{ user.username }}
              </router-link>
              <img
                class="login__picture"
                :src="'http://localhost:3000/' + user.profilbild"
                alt="Profile Picture"
              />
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </header>
  <hr />
  <main class="wrapper">
    <router-view />
  </main>
  <hr />
  <footer>
    <div>
      <h4>Sharefolio</h4>
      <p>Share your Portfolio</p>
    </div>
    <p>​© 2022 By Sharefolio</p>
  </footer>
</template>

<style lang="scss">
@import "@/css/App.scss";
</style>
