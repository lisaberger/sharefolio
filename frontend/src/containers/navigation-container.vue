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
import NavigationAvatarComponent from '@/components/navigation-avatar-component.vue';
import navigationSearchbarComponent from '@/components/navigation-searchbar-component.vue';
import type { AutoCompleteCompleteEvent } from 'primevue/autocomplete';

interface Props {
    userLoggedIn: boolean;
    currentUser?: User;
}
const props = withDefaults(defineProps<Props>(), {
    currentUser: undefined,
});

const { t } = useI18n();
const router = useRouter();

const projectApi = ProjectApi.getInstance();

const selectedProject = ref<Project>();
const filteredProjects = ref<Array<Project>>();

const search = async (event: AutoCompleteCompleteEvent): Promise<void> => {
    const allProjects = await projectApi.getProjects();

    filteredProjects.value = allProjects.filter((project) =>
        project.name.toLowerCase().includes(event.query.toLowerCase())
    );
};

const debouncedSearch = debounce(search, 300);
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
                <navigation-searchbar-component
                    :suggestions="filteredProjects"
                    v-model:selected-project="selectedProject"
                    @complete="debouncedSearch"
                />
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
                <navigation-avatar-component
                    v-if="props.userLoggedIn && props.currentUser"
                    :user="props.currentUser"
                />
            </li>
        </ul>
    </nav>
</template>

<i18n lang="yaml">
de:
    button:
        login: Anmelden
        register: Registrieren
en:
    button:
        login: Sign in
        register: Register
</i18n>
