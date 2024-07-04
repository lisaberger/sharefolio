<script setup lang="ts">
import LogoComponent from '@/components/logo-component.vue';
import User from '@/models/user';
import { RouteName } from '@/router/enum/route';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ProjectApi from '@/api/project-api';
import Project from '@/models/project';
import { debounce } from '@/utils/debounce';
import type { Event } from 'happy-dom';

interface Props {
    userLoggedIn: boolean;
    currentUser?: User;
}

const props = defineProps<Props>();

const { t } = useI18n();
const router = useRouter();

const menu = ref();
const toggle = (event: MouseEvent): void => {
    menu.value.toggle(event);
};

const userMenuItems = ref([
    {
        label: 'Profile',
        icon: 'fa-solid fa-user',
        command: () => {
            router.push({ name: RouteName.Profile });
        },
    },
    {
        label: 'Logout',
        icon: 'fa-solid fa-right-from-bracket',
        command: () => {
            emit('logout');
        },
    },
]);

const projectApi = ProjectApi.getInstance();

const value = ref<Project | undefined>();
const items = ref<Array<Project>>([]);

const search = async (event: Event): Promise<void> => {
    let _projects = await projectApi.getProjects();

    items.value = _projects.filter((project) =>
        project.name.toLowerCase().includes(event.query.toLowerCase())
    );
};

const debouncedSearch = debounce(search, 300);

type Emits = {
    logout: [];
};
const emit = defineEmits<Emits>();
</script>

<template>
    <nav
        class="border-surface-500 fixed z-10 w-full border-b bg-white px-4 py-2"
    >
        <ul class="flex items-center justify-between">
            <li class="flex-0">
                <logo-component />
            </li>
            <li class="z-30 mx-4 flex-1 md:mx-8">
                <prime-auto-complete
                    :placeholder="t('searchPlaceholder')"
                    v-model="value"
                    pt:root:class="w-full"
                    :pt:input:style="{ width: '100%' }"
                    pt:drowdown:class="bg-white"
                    :suggestions="items"
                    option-label="name"
                    @complete="debouncedSearch"
                >
                    <template #loadingIcon>
                        <font-awesome-icon
                            :icon="['fas', 'magnifying-glass']"
                        />
                    </template>
                </prime-auto-complete>
            </li>
            <li class="flex-0 flex">
                <div
                    v-if="!props.userLoggedIn && !props.currentUser"
                    class="flex items-center"
                >
                    <router-link
                        :to="{ name: RouteName.Register }"
                        class="hidden md:block"
                    >
                        <prime-button
                            :label="t('button.register')"
                            rounded
                            severity="secondary"
                            text
                            size="small"
                        />
                    </router-link>
                    <prime-button
                        text
                        rounded
                        severity="secondary"
                        size="small"
                    >
                        <template #icon>
                            <font-awesome-icon
                                :icon="['fas', 'right-to-bracket']"
                            />
                        </template>
                    </prime-button>
                </div>
                <div
                    v-else
                    class="flex items-center hover:cursor-pointer"
                    aria-haspopup="true"
                    aria-controls="options"
                    @click="toggle"
                >
                    <div class="mr-3 hidden text-right text-sm md:block">
                        <p>
                            {{ currentUser?.firstname
                            }}{{ currentUser?.lastname }}
                            Test User
                        </p>
                        <p class="text-xs">test</p>
                    </div>
                    <prime-avatar
                        :image="'http://localhost:3000/' + currentUser?.image"
                        shape="circle"
                    />
                    <prime-menu
                        ref="menu"
                        id="options"
                        :model="userMenuItems"
                        :popup="true"
                        class="bg-white"
                    >
                        <template #itemicon="{ item }">
                            <font-awesome-icon :icon="item.icon" class="mr-2" />
                        </template>
                    </prime-menu>
                </div>
            </li>
        </ul>
    </nav>
</template>

<style>
.p-autocomplete-panel {
    @apply bg-white;
}
</style>

<i18n lang="yaml">
de:
    searchPlaceholder: Suche nach spannenden Arbeiten oder Künstler ...
    button:
        login: Anmelden
        register: Registrieren
    menu:
        profile: Profil
        logout: Abmelden
en:
    searchPlaceholder: Search a project ...
    button:
        login: Sign in
        register: Register
    menu:
        profile: Profile
        logout: Sign out
</i18n>
