<script setup>
import Textfield from "../../components/form/Textfield.vue";
import Button from "../../components/form/Button.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";

/* Define props */
const router = useRouter();
const file = ref();
const pfp = ref();

/* User data object */
const userData = ref({
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  job: "",
  location: "",
  descr: "",
  password: "",
  passwordConf: "",
});

/* methods */
/* upload function */
const selectFile = () => {
  file.value = pfp.value.files[0];
};

/* submit */
const onSubmit = () => {
  /* append file and set name */
  const fd = new FormData();
  let tempFileName = "";
  if (file.value) {
    tempFileName = new Date().toISOString().replace(/:/g, "-") + file.value.name;
    fd.append("profilePic", file.value, tempFileName);
  } else {
    tempFileName = "avatar_placeholder.png";
  }

  /* fill user data */
  const tempUserData = {
    userName: userData.value.userName,
    firstName: userData.value.firstName,
    lastName: userData.value.lastName,
    email: userData.value.email,
    job: userData.value.job,
    location: userData.value.location,
    descr: userData.value.descr,
    password: userData.value.password,
    passwordConf: userData.value.passwordConf,
    profilePic: "profile/" + tempFileName,
  };
  /* append to Form Data */
  fd.append("userData", JSON.stringify(tempUserData));

  axios.post("http://localhost:4000/createUser", fd).then(async (res) => {
    /* redirect to login */
    await router.push({ path: "/login" });
  });
};
</script>

<template>
  <section class="register">
    <form class="input__fields" @submit.prevent="onSubmit" enctype="multipart/form-data">
      <h2>Registrieren</h2>
      <p>Erstelle ein neues Profil und teile dein Portfolio</p>
      <div class="wrapper__form">
        <div class="first__row">
          <Textfield
            v-model="userData.userName"
            label="Benutzername"
            id="username"
            placeholder="username"
          />
          <label for="password">Passwort</label>
          <input
            class="input"
            label="Passwort"
            type="password"
            id="passwort"
            placeholder="passwort"
            v-model="userData.password"
          />
          <label for="passwot_repeat">Passwort wiederholen</label>
          <input
            class="input"
            label="Passwort wiederholen"
            type="password"
            id="passwort_repeat"
            placeholder="passwort"
            v-model="userData.passwordConf"
          />
          <label for="email">E-Mail</label>
          <input
            class="input"
            label="E-Mail"
            id="email"
            placeholder="max.mustermann@web.de"
            v-model="userData.email"
          />
          <div class="upload">
            <input
              class="file__input"
              id="profilepic"
              type="file"
              ref="pfp"
              @change="selectFile"
            />
            <label id="register__label" for="profilepic">+</label>
            <span class="label">Profilbild</span>
            <p v-if="file" id="upload__name">{{ file.name }}</p>
          </div>

          <p id="register__text">
            Du hast bereits ein Profil bei Sharefolio?<br />
            Dann logge dich hier ein!
          </p>
          <router-link to="/login">
            <Button type="button" label="Anmelden" theme="secondary__btn" />
          </router-link>
        </div>
        <div class="second__row">
          <label for="firstname">Vorname</label>
          <input
            class="input"
            label="Vorname"
            id="firstname"
            placeholder="Max"
            v-model="userData.firstName"
          />
          <label for="firstname">Nachname</label>
          <input
            class="input"
            label="Nachname"
            id="lastname"
            placeholder="Mustermann"
            v-model="userData.lastName"
          />
          <label for="job">Berufsbezeichnung</label>
          <input
            class="input"
            label="Berufsbezeichnung"
            id="job"
            placeholder="Interactive Media Student"
            v-model="userData.job"
          />
          <label for="place">Standort</label>
          <input
            class="input"
            label="Standort"
            id="place"
            placeholder="Augsburg"
            v-model="userData.location"
          />

          <label class="input__label">Personenbeschreibung</label>
          <textarea
            type="text"
            placeholder="Ich bin..."
            class="textarea"
            id="personal__description"
            v-model="userData.descr"
          ></textarea>

          <Button type="submit" label="Profil hinzufügen" theme="primary__btn" />
        </div>
      </div>
    </form>
  </section>
</template>

<style scoped lang="scss">
@import "@/css/Register.scss";
</style>
