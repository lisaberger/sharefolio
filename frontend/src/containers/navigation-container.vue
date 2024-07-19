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
import NavigationLanguageComponent from '@/components/navigation-language-component.vue';
import NavigationAvatarComponent from '@/components/navigation-avatar-component.vue';
import navigationSearchbarComponent from '@/components/navigation-searchbar-component.vue';
import type {
    AutoCompleteCompleteEvent,
    AutoCompleteOptionSelectEvent,
} from 'primevue/autocomplete';

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

const filteredProjects = ref<Array<Project>>();

const search = async (event: AutoCompleteCompleteEvent): Promise<void> => {
    const allProjects = await projectApi.getProjects();

    filteredProjects.value = allProjects.filter((project) =>
        project.name.toLowerCase().includes(event.query.toLowerCase())
    );
};

const debouncedSearch = debounce(search, 300);

const handleSelect = (event: AutoCompleteOptionSelectEvent) => {
    router.push({
        name: RouteName.Project,
        params: { name: event.value.name },
    });
};
</script>

<template>
    <nav
        class="border-surface-300 fixed z-10 h-16 w-full border-b bg-white px-4 py-3 md:px-8"
    >
        <ul class="flex items-center justify-between">
            <li class="flex-0">
                <logo-component />
            </li>
            <li class="z-30 mx-4 flex-1 md:mx-8">
                <prime-input-group>
                    <prime-input-group-addon>
                        <span class="material-icons">search</span>
                    </prime-input-group-addon>
                    <navigation-searchbar-component
                        :suggestions="filteredProjects"
                        @complete="debouncedSearch"
                        @option-select="handleSelect"
                    />
                </prime-input-group>
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
                        severity="secondary"
                        text
                        size="small"
                        @click="router.push({ name: RouteName.Register })"
                    />
                    <prime-button
                        text
                        severity="secondary"
                        size="small"
                        data-testid="login-button"
                        @click="router.push({ name: RouteName.Login })"
                    >
                        <template #icon>
                            <span class="material-icons">login</span>
                        </template>
                    </prime-button>
                </div>
                <navigation-avatar-component
                    v-if="props.userLoggedIn && props.currentUser"
                    :user="props.currentUser"
                />
            </li>
            <prime-divider layout="vertical" />
            <navigation-language-component />
        </ul>
    </nav>
</template>

<i18n lang="yaml">
de:
    button:
        login: Anmelden
        register: Noch kein Profil?
en:
    button:
        login: Sign in
        register: Register
</i18n>
