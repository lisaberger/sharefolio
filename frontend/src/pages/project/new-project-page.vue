<script setup lang="ts">
import Textfield from '../../components/form/textfield.vue';
import Button from '../../components/form/button.vue';
import Cookies from 'js-cookie';
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

/* define props */
const router = useRouter();
const categories = ref([]);
const users = ref([]);
const isLoading = ref(true);
const userID = ref();

/* Files */
const files = ref([]);
const titlePic = ref();
const pic1 = ref();
const pic2 = ref();

/* project data object */
const projectData = ref({
    creatorId: '',
    title: '',
    art: '',
    link: '',
    tools: '',
    descr: '',
    category: '',
    collabs: '',
});

/* methods */
/* file uploads */
const selectTitlePic = () => {
    files.value[0] = titlePic.value.files[0];
};

const selectPic1 = () => {
    files.value[1] = pic1.value.files[0];
};

const selectPic2 = () => {
    files.value[2] = pic2.value.files[0];
};

/* submit */

const onSubmit = () => {
    /* Get currently logged in user */
    userID.value = Cookies.get('isLoggedIn');

    /* rename files */
    const tempTitleName =
        new Date().toISOString().replace(/:/g, '-') + files.value[0].name;
    const tempPic1Name =
        new Date().toISOString().replace(/:/g, '-') + files.value[1].name;
    const tempPic2Name =
        new Date().toISOString().replace(/:/g, '-') + files.value[2].name;

    /* add uploaded files to Form Data */
    const fd = new FormData();
    fd.append('pics', files.value[0], tempTitleName);
    fd.append('pics', files.value[1], tempPic1Name);
    fd.append('pics', files.value[2], tempPic2Name);

    /* fill project data */
    const tempProjectData = {
        creatorId: userID.value,
        headerPath: '/projects/' + tempTitleName,
        title: projectData.value.title,
        art: projectData.value.art,
        tools: projectData.value.tools,
        descr: projectData.value.descr,
        category: projectData.value.category,
        collabs: projectData.value.collabs,
        pic1Path: '/projects/' + tempPic1Name,
        pic2Path: '/projects/' + tempPic2Name,
    };
    /* add data to Form Data and send to backend */
    fd.append('projectData', JSON.stringify(tempProjectData));
    axios
        .post('http://localhost:4000/projects/create', fd)
        .then(async (res) => {
            await router.push({ path: '/project/' + projectData.value.title });
        });
};
/*******************/
/* Lifecycle Hooks */
/*******************/

onBeforeMount(() => {
    /* get categories */
    axios.get('http://localhost:4000/categories').then((response) => {
        categories.value = response.data;
    });
    /* get users */
    axios.get('http://localhost:4000/users').then((response) => {
        users.value = response.data;
        isLoading.value = false;
    });
});
</script>

<template>
    <div v-if="!isLoading" class="wrapper__overall">
        <section class="new__project">
            <h2>Neues Projekt</h2>
            <form
                class="input__fields"
                enctype="multipart/form-data"
                @submit.prevent="onSubmit"
            >
                <div class="upload">
                    <input
                        id="titlepic"
                        ref="titlePic"
                        class="file__input"
                        type="file"
                        @change="selectTitlePic"
                    />
                    <label for="titlepic">+</label>
                    <span class="label">Titelbild</span>
                    <p v-if="files[0]" class="file__name">
                        {{ files[0].name }}
                    </p>
                </div>
                <h4>Projektinfos</h4>
                <div class="wrapper__form">
                    <div class="first__row">
                        <Textfield
                            id="project_title"
                            v-model="projectData.title"
                            label="Projekttitel"
                            placeholder="projekt"
                        />
                        <Textfield
                            id="type"
                            v-model="art"
                            label="Art"
                            placeholder="Webanwendung"
                        />
                        <Textfield
                            id="link"
                            v-model="projectData.link"
                            label="Link zur Anwendung"
                            placeholder="https://test.de"
                        />
                        <Textfield
                            id="tools"
                            v-model="projectData.tools"
                            label="Tools"
                            placeholder="HTML, CSS"
                        />

                        <div class="upload">
                            <input
                                id="pic1"
                                ref="pic1"
                                class="file__input"
                                type="file"
                                @change="selectPic1"
                            />
                            <label for="pic1">+</label>
                            <span class="label">Projektbild 1</span>
                            <p v-if="files[1]" class="file__name">
                                {{ files[1].name }}
                            </p>
                        </div>
                        <div class="upload">
                            <input
                                id="pic2"
                                ref="pic2"
                                class="file__input"
                                type="file"
                                @change="selectPic2"
                            />
                            <label for="pic2">+</label>
                            <span class="label">Projektbild 2</span>
                            <p v-if="files[2]" class="file__name">
                                {{ files[2].name }}
                            </p>
                        </div>
                    </div>
                    <div class="second__row">
                        <label class="input__label">Projektbeschreibung</label>
                        <textarea
                            id="description"
                            v-model="projectData.descr"
                            type="text"
                            placeholder="Im Projekt geht es um..."
                            class="textarea"
                        ></textarea>

                        <label class="input__label">Kategorie</label>
                        <select
                            v-model="projectData.category"
                            class="dropdown"
                            name="Kategorie"
                        >
                            <option
                                v-for="category in categories"
                                :key="category.id"
                                :value="category.id"
                            >
                                {{ category.name }}
                            </option>
                        </select>

                        <label class="input__label">Mitwirkende</label>
                        <select
                            v-model="projectData.collabs"
                            class="dropdown"
                            name="mitwirkende"
                        >
                            <option
                                v-for="user in users"
                                :key="user.id"
                                :value="user.id"
                            >
                                {{ user.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <Button
                    type="submit"
                    label="Projekt anlegen"
                    theme="primary__btn"
                />
            </form>
        </section>
    </div>
</template>

<style scoped lang="scss">
// @import '@/assets/css/views/Newproject.scss';
</style>
