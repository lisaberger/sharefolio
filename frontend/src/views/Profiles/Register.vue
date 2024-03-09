<script setup>
import Textfield from '../../components/form/Textfield.vue';
import Button from '../../components/form/Button.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

/* Define props */
const router = useRouter();
const file = ref();
const pfp = ref();

/* User data object */
const userData = ref({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    job: '',
    location: '',
    descr: '',
    password: '',
    passwordConf: '',
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
    let tempFileName = '';
    if (file.value) {
        tempFileName =
            new Date().toISOString().replace(/:/g, '-') + file.value.name;
        fd.append('profilePic', file.value, tempFileName);
    } else {
        tempFileName = 'avatar_placeholder.png';
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
        profilePic: 'profile/' + tempFileName,
    };
    /* append to Form Data */
    fd.append('userData', JSON.stringify(tempUserData));

    axios.post('http://localhost:4000/createUser', fd).then(async (res) => {
        /* redirect to login */
        await router.push({ path: '/login' });
    });
};
</script>

<template>
    <section class="register">
        <form
            class="input__fields"
            enctype="multipart/form-data"
            @submit.prevent="onSubmit"
        >
            <h2>Registrieren</h2>
            <p>Erstelle ein neues Profil und teile dein Portfolio</p>
            <div class="wrapper__form">
                <div class="first__row">
                    <Textfield
                        id="username"
                        v-model="userData.userName"
                        label="Benutzername"
                        placeholder="username"
                    />
                    <label for="password">Passwort</label>
                    <input
                        id="passwort"
                        v-model="userData.password"
                        class="input"
                        label="Passwort"
                        type="password"
                        placeholder="passwort"
                    />
                    <label for="passwot_repeat">Passwort wiederholen</label>
                    <input
                        id="passwort_repeat"
                        v-model="userData.passwordConf"
                        class="input"
                        label="Passwort wiederholen"
                        type="password"
                        placeholder="passwort"
                    />
                    <label for="email">E-Mail</label>
                    <input
                        id="email"
                        v-model="userData.email"
                        class="input"
                        label="E-Mail"
                        placeholder="max.mustermann@web.de"
                    />
                    <div class="upload">
                        <input
                            id="profilepic"
                            ref="pfp"
                            class="file__input"
                            type="file"
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
                        <Button
                            type="button"
                            label="Anmelden"
                            theme="secondary__btn"
                        />
                    </router-link>
                </div>
                <div class="second__row">
                    <label for="firstname">Vorname</label>
                    <input
                        id="firstname"
                        v-model="userData.firstName"
                        class="input"
                        label="Vorname"
                        placeholder="Max"
                    />
                    <label for="firstname">Nachname</label>
                    <input
                        id="lastname"
                        v-model="userData.lastName"
                        class="input"
                        label="Nachname"
                        placeholder="Mustermann"
                    />
                    <label for="job">Berufsbezeichnung</label>
                    <input
                        id="job"
                        v-model="userData.job"
                        class="input"
                        label="Berufsbezeichnung"
                        placeholder="Interactive Media Student"
                    />
                    <label for="place">Standort</label>
                    <input
                        id="place"
                        v-model="userData.location"
                        class="input"
                        label="Standort"
                        placeholder="Augsburg"
                    />

                    <label class="input__label">Personenbeschreibung</label>
                    <textarea
                        id="personal__description"
                        v-model="userData.descr"
                        type="text"
                        placeholder="Ich bin..."
                        class="textarea"
                    ></textarea>

                    <Button
                        type="submit"
                        label="Profil hinzufügen"
                        theme="primary__btn"
                    />
                </div>
            </div>
        </form>
    </section>
</template>

<style scoped lang="scss">
@import '@/css/Register.scss';
</style>
