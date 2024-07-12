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
const props = withDefaults(defineProps<Props>(), {
    currentUser: undefined,
});

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

const selectedProject = ref<Project>();
const filteredProjects = ref<Array<Project>>();

const search = async (event: Event): Promise<void> => {
    const allProjects = await projectApi.getProjects();

    filteredProjects.value = allProjects.filter((project) =>
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
                    v-model="selectedProject"
                    :pt="{
                        root: {
                            class: ['w-full'],
                        },
                        input: {
                            style: {
                                width: '100%',
                                fontSize: '0.85rem',
                            },
                        },
                    }"
                    :suggestions="filteredProjects"
                    option-label="name"
                    @complete="debouncedSearch"
                >
                    <template #loading-icon>
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
                    <prime-button
                        class="hidden md:block"
                        :label="t('button.register')"
                        data-testid="register-button"
                        rounded
                        severity="secondary"
                        text
                        size="small"
                        @click="router.push({ name: RouteName.Register })"
                    />
                    <prime-button
                        text
                        rounded
                        severity="secondary"
                        size="small"
                        data-testid="login-button"
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
                    data-testid="profile-element"
                    aria-haspopup="true"
                    aria-controls="options"
                    @click="toggle"
                >
                    <div class="mr-3 hidden text-right text-sm md:block">
                        <p>{{ props.currentUser?.fullname }}</p>
                        <p class="text-xs">{{ props.currentUser?.username }}</p>
                    </div>
                    <prime-avatar
                        data-testid="avatar-element"
                        :image="
                            'http://localhost:3000/' + props.currentUser?.image
                        "
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

<i18n lang="yaml">
de:
    searchPlaceholder: Suche nach kreativen Arbeiten ...
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
