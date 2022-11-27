<script setup>
import { RouterLink, RouterView } from "vue-router";
import Textfield from "../../components/form/Textfield.vue";
import Button from "../../components/form/Button.vue";
import Cookies from "js-cookie";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

/* Login Data */
const loginData = ref({ email: "", password: "" });
const errorData = ref();

/* redirect */
const router = useRouter();

/* Login functionality */
const login = () => {
  /* Send post request with Login Data */
  axios
    .post("http://localhost:4000/login", loginData.value)
    .then((res) => {
      /* set "logged in" - cookie to user is */
      Cookies.set("isLoggedIn", res.data.id, { expires: 1, sameSite: "Lax" });
      /* redirect */
      router.push({ path: "/" });
      router.go("/");
    })
    .catch((err) => {
      /* Display error for false login data */
      errorData.value = err.response.data[2].message;
    });
};
</script>

<template>
  <section class="login">
    <form class="input__fields" @submit.prevent="login">
      <h2>Login</h2>
      <p>Logge dich ein, um dein Sharefolio zu verwalten.</p>

      <Textfield
        v-model="loginData.email"
        type="text"
        label="Benutzername"
        id="benutzer"
        placeholder="username"
      />
      <Textfield
        v-model="loginData.password"
        type="password"
        label="Passwort"
        id="passwort"
        placeholder="passwort"
      />
      <Button type="submit" label="Login" theme="primary__btn" />
      {{ errorData }}
      <p id="register__text">Noch kein Profil? Dann registriere dich kostenlos!</p>
      <router-link to="/register">
        <Button type="button" label="Registrieren" theme="secondary__btn" />
      </router-link>
    </form>
  </section>
</template>

<style scoped lang="scss">
@import "@/css/Login.scss";
</style>
