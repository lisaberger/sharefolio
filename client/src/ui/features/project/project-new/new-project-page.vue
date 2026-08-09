<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Category } from '@core/project';
import { User } from '@core/user';
import { projectRepository, userRepository } from '@config';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const categories = ref<Category[]>([]);
const users = ref<User[]>([]);
const isLoading = ref(true);
const { t } = useI18n();

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
    const result = await projectRepository.create({
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
    <div v-if="!isLoading" class="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <div class="mb-8 text-center">
            <h1 class="text-surface-900 text-3xl font-extrabold tracking-tight">
                {{ t('new.title') }}
            </h1>
            <p class="text-surface-500 mt-2 text-sm">
                {{ t('new.subtitle') }}
            </p>
        </div>

        <form
            class="border-surface-200 space-y-8 rounded-3xl border bg-white p-6 shadow-xs md:p-10"
            enctype="multipart/form-data"
            @submit.prevent="onSubmit"
        >
            <!-- Uploads -->
            <div>
                <h2 class="text-surface-900 mb-4 text-lg font-bold">
                    {{ t('new.images') }}
                </h2>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <label
                        class="border-surface-200 hover:border-primary-300 cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-colors"
                        :class="{
                            'border-primary-400 bg-primary-50': files[0],
                        }"
                    >
                        <input
                            ref="titlePic"
                            class="hidden"
                            type="file"
                            accept="image/*"
                            @change="selectTitlePic"
                        />
                        <span class="material-icons text-surface-400 text-3xl">
                            {{
                                files[0]
                                    ? 'check_circle'
                                    : 'add_photo_alternate'
                            }}
                        </span>
                        <p class="text-surface-600 mt-2 text-sm font-medium">
                            {{ t('new.titleImage') }}
                        </p>
                        <p
                            v-if="files[0]"
                            class="text-surface-500 mt-1 truncate text-xs"
                        >
                            {{ files[0].name }}
                        </p>
                    </label>

                    <label
                        class="border-surface-200 hover:border-primary-300 cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-colors"
                        :class="{
                            'border-primary-400 bg-primary-50': files[1],
                        }"
                    >
                        <input
                            ref="pic1"
                            class="hidden"
                            type="file"
                            accept="image/*"
                            @change="selectPic1"
                        />
                        <span class="material-icons text-surface-400 text-3xl">
                            {{
                                files[1]
                                    ? 'check_circle'
                                    : 'add_photo_alternate'
                            }}
                        </span>
                        <p class="text-surface-600 mt-2 text-sm font-medium">
                            {{ t('new.image1') }}
                        </p>
                        <p
                            v-if="files[1]"
                            class="text-surface-500 mt-1 truncate text-xs"
                        >
                            {{ files[1].name }}
                        </p>
                    </label>

                    <label
                        class="border-surface-200 hover:border-primary-300 cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-colors"
                        :class="{
                            'border-primary-400 bg-primary-50': files[2],
                        }"
                    >
                        <input
                            ref="pic2"
                            class="hidden"
                            type="file"
                            accept="image/*"
                            @change="selectPic2"
                        />
                        <span class="material-icons text-surface-400 text-3xl">
                            {{
                                files[2]
                                    ? 'check_circle'
                                    : 'add_photo_alternate'
                            }}
                        </span>
                        <p class="text-surface-600 mt-2 text-sm font-medium">
                            {{ t('new.image2') }}
                        </p>
                        <p
                            v-if="files[2]"
                            class="text-surface-500 mt-1 truncate text-xs"
                        >
                            {{ files[2].name }}
                        </p>
                    </label>
                </div>
            </div>

            <div class="border-surface-100 border-t pt-8">
                <h2 class="text-surface-900 mb-4 text-lg font-bold">
                    {{ t('new.details') }}
                </h2>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div class="flex flex-col gap-1.5">
                        <label
                            for="project_title"
                            class="text-surface-700 text-sm font-medium"
                        >
                            {{ t('new.form.title') }}
                        </label>
                        <prime-input-text
                            id="project_title"
                            v-model="projectData.title"
                            :placeholder="t('new.form.titlePlaceholder')"
                        />
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label
                            for="type"
                            class="text-surface-700 text-sm font-medium"
                        >
                            {{ t('new.form.kind') }}
                        </label>
                        <prime-input-text
                            id="type"
                            v-model="projectData.art"
                            :placeholder="t('new.form.kindPlaceholder')"
                        />
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label
                            for="link"
                            class="text-surface-700 text-sm font-medium"
                        >
                            {{ t('new.form.link') }}
                        </label>
                        <prime-input-text
                            id="link"
                            v-model="projectData.link"
                            :placeholder="t('new.form.linkPlaceholder')"
                        />
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label
                            for="tools"
                            class="text-surface-700 text-sm font-medium"
                        >
                            {{ t('new.form.tools') }}
                        </label>
                        <prime-input-text
                            id="tools"
                            v-model="projectData.tools"
                            :placeholder="t('new.form.toolsPlaceholder')"
                        />
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label
                            for="category"
                            class="text-surface-700 text-sm font-medium"
                        >
                            {{ t('new.form.category') }}
                        </label>
                        <select
                            id="category"
                            v-model="projectData.category"
                            class="border-surface-300 text-surface-700 focus:border-primary-400 rounded-lg border px-3 py-2 text-sm outline-none transition-colors"
                        >
                            <option value="" disabled selected>
                                {{ t('new.form.select') }}
                            </option>
                            <option
                                v-for="category in categories"
                                :key="category.id"
                                :value="category.id"
                            >
                                {{ category.name }}
                            </option>
                        </select>
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label
                            for="collabs"
                            class="text-surface-700 text-sm font-medium"
                        >
                            {{ t('new.form.contributors') }}
                        </label>
                        <select
                            id="collabs"
                            v-model="projectData.collabs"
                            class="border-surface-300 text-surface-700 focus:border-primary-400 rounded-lg border px-3 py-2 text-sm outline-none transition-colors"
                        >
                            <option value="" disabled selected>
                                {{ t('new.form.select') }}
                            </option>
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

                <div class="mt-4 flex flex-col gap-1.5">
                    <label
                        for="description"
                        class="text-surface-700 text-sm font-medium"
                    >
                        {{ t('new.form.description') }}
                    </label>
                    <prime-textarea
                        id="description"
                        v-model="projectData.descr"
                        :placeholder="t('new.form.descriptionPlaceholder')"
                        rows="4"
                        auto-resize
                    />
                </div>
            </div>

            <div class="border-surface-100 border-t pt-6">
                <prime-button type="submit" icon-pos="right" class="w-full">
                    <template #icon>
                        <span class="material-icons text-base">add</span>
                    </template>
                    {{ t('new.submit') }}
                </prime-button>
            </div>
        </form>
    </div>
</template>

<i18n lang="yaml">
de:
    new:
        title: Neues Projekt
        subtitle: Teile deine kreative Arbeit mit der Community.
        images: Projektbilder
        titleImage: Titelbild
        image1: Projektbild 1
        image2: Projektbild 2
        details: Projektinfos
        submit: Projekt anlegen
        form:
            title: Projekttitel
            titlePlaceholder: z.B. Mein Portfolio
            kind: Art
            kindPlaceholder: z.B. Webanwendung
            link: Link zur Anwendung
            linkPlaceholder: https://example.de
            tools: Tools
            toolsPlaceholder: HTML, CSS, JavaScript
            category: Kategorie
            contributors: Mitwirkende
            description: Projektbeschreibung
            descriptionPlaceholder: Worum geht es in deinem Projekt?
            select: Bitte wählen ...
en:
    new:
        title: New project
        subtitle: Share your creative work with the community.
        images: Project images
        titleImage: Title image
        image1: Project image 1
        image2: Project image 2
        details: Project details
        submit: Create project
        form:
            title: Project title
            titlePlaceholder: e.g. My portfolio
            kind: Type
            kindPlaceholder: e.g. Web app
            link: Application link
            linkPlaceholder: https://example.com
            tools: Tools
            toolsPlaceholder: HTML, CSS, JavaScript
            category: Category
            contributors: Contributors
            description: Project description
            descriptionPlaceholder: What is your project about?
            select: Please select ...
</i18n>
