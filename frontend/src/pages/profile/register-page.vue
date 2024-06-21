<script setup lang="ts">
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

    console.log(tempUserData);

    /* append to Form Data */
    fd.append('userData', JSON.stringify(tempUserData));

    axios.post('http://localhost:4000/users/create', fd).then(async (res) => {
        /* redirect to login */
        await router.push({ path: '/login' });
    });
};
</script>

<template>
    <section class="mt-8">
        <prime-panel header="Registrieren">
            <form enctype="multipart/form-data" @submit.prevent="onSubmit">
                <p class="mb-8">
                    Erstelle ein eigenes Profil und teile dein Portfolio.
                </p>
                <div>
                    <div>
                        <div class="mb-2 flex flex-col gap-2">
                            <label for="username">Benutzername</label>
                            <prime-input-text
                                id="username"
                                v-model="userData.userName"
                                aria-describedby="username-help"
                            />
                        </div>
                        <div class="mb-2 flex flex-col gap-2">
                            <label for="password">Passwort</label>
                            <prime-password
                                id="password"
                                v-model="userData.password"
                                toggleMask
                            />
                        </div>
                        <div class="mb-2 flex flex-col gap-2">
                            <label for="password-repeat"
                                >Passwort wiederholen</label
                            >
                            <prime-password
                                id="password-repeat"
                                v-model="userData.passwordConf"
                                toggleMask
                            />
                        </div>
                        <div class="mb-2 flex flex-col gap-2">
                            <label for="email">Email</label>
                            <prime-input-text
                                id="email"
                                v-model="userData.email"
                                aria-describedby="username-help"
                            />
                        </div>
                        <div class="mb-2">
                            <prime-file-upload
                                name="pfp"
                                url="/api/upload"
                                @upload="onAdvancedUpload($event)"
                                :multiple="false"
                                accept="image/*"
                                :maxFileSize="1000000"
                            >
                                <template #empty>
                                    <p>Drag and drop a file here to upload.</p>
                                </template>
                            </prime-file-upload>
                        </div>
                        <!-- <div class="upload">
                            <input
                                id="profilepic"
                                ref="pfp"
                                class="file__input"
                                type="file"
                                @change="selectFile"
                            />
                            <label id="register__label" for="profilepic"
                                >+</label
                            >
                            <span class="label">Profilbild</span>
                            <p v-if="file" id="upload__name">{{ file.name }}</p>
                        </div> -->

                        <div class="mb-2 flex flex-col gap-2">
                            <label for="first-name">Vorname</label>
                            <prime-input-text
                                id="first-name"
                                v-model="userData.firstName"
                                aria-describedby="firstname-help"
                            />
                        </div>

                        <div class="mb-2 flex flex-col gap-2">
                            <label for="last-name">Nachname</label>
                            <prime-input-text
                                id="last-name"
                                v-model="userData.lastName"
                                aria-describedby="lastname-help"
                            />
                        </div>
                        <div class="mb-2 flex flex-col gap-2">
                            <label for="job">Berufsbezeichnung</label>
                            <prime-input-text
                                id="job"
                                v-model="userData.job"
                                aria-describedby="job-help"
                            />
                        </div>
                        <div class="mb-2 flex flex-col gap-2">
                            <label for="location">Standort</label>
                            <prime-input-text
                                id="location"
                                v-model="userData.location"
                                aria-describedby="location-help"
                            />
                        </div>

                        <div>
                            <div class="mb-2 flex flex-col gap-2">
                                <label for="description">Beschreibung</label>
                                <prime-text-area
                                    id="description"
                                    v-model="userData.descr"
                                    autoResize
                                    rows="3"
                                />
                            </div>
                        </div>

                        <prime-button
                            type="submit"
                            label="Profil hinzufügen"
                            rounded
                        />
                    </div>
                </div>
            </form>
            <p class="mb-2 mt-4 text-sm">
                Du hast bereits ein Profil bei Sharefolio?<br />
                Dann logge dich hier ein!
            </p>
            <router-link :to="{ name: 'Login' }">
                <prime-button label="Anmelden" outlined rounded />
            </router-link>
        </prime-panel>
    </section>
</template>
