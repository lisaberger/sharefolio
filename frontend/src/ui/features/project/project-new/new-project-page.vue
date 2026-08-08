<script setup lang="ts">
import Cookies from 'js-cookie';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Category } from '@core/project';
import { User } from '@core/user';
import { projectRepository, userRepository } from '@config';

/* define props */
const router = useRouter();
const categories = ref<Category[]>([]);
const users = ref<User[]>([]);
const isLoading = ref(true);

/* Files */
const files = ref<File[]>([]);
const titlePic = ref<HTMLInputElement>();
const pic1 = ref<HTMLInputElement>();
const pic2 = ref<HTMLInputElement>();

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
    if (titlePic.value?.files?.[0]) {
        files.value[0] = titlePic.value.files[0];
    }
};

const selectPic1 = () => {
    if (pic1.value?.files?.[0]) {
        files.value[1] = pic1.value.files[0];
    }
};

const selectPic2 = () => {
    if (pic2.value?.files?.[0]) {
        files.value[2] = pic2.value.files[0];
    }
};

/* submit */
const onSubmit = async (): Promise<void> => {
    const userId = Cookies.get('isLoggedIn');

    const result = await projectRepository.create({
        creatorId: userId,
        files: files.value,
        title: projectData.value.title,
        kind: projectData.value.art,
        tools: projectData.value.tools,
        description: projectData.value.descr,
        category: projectData.value.category,
        demo: projectData.value.link,
        contributors: projectData.value.collabs,
    });

    if (result.data) {
        await router.push({ path: '/project/' + projectData.value.title });
    }
};
/*******************/
/* Lifecycle Hooks */
/*******************/

onBeforeMount(async () => {
    const [categoriesResult, usersResult] = await Promise.all([
        projectRepository.getCategories(),
        userRepository.readAll(),
    ]);

    categories.value = categoriesResult.data ?? [];
    users.value = usersResult.data ?? [];
    isLoading.value = false;
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
                        <input
                            id="project_title"
                            v-model="projectData.title"
                            label="Projekttitel"
                            placeholder="projekt"
                        />
                        <input
                            id="type"
                            v-model="projectData.art"
                            label="Art"
                            placeholder="Webanwendung"
                        />
                        <input
                            id="link"
                            v-model="projectData.link"
                            label="Link zur Anwendung"
                            placeholder="https://test.de"
                        />
                        <input
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
                                {{ user.username }}
                            </option>
                        </select>
                    </div>
                </div>
                <prime-button type="submit" label="Projekt anlegen" />
            </form>
        </section>
    </div>
</template>
