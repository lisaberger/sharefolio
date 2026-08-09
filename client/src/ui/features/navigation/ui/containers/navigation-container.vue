<script setup lang="ts">
import LogoComponent from '@ui/features/common/ui/component/logo-component.vue';
import { User } from '@core/user';
import { RouteName } from '@ui/router/enums/route';
import { useI18n } from 'vue-i18n';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { projectRepository } from '@config';
import { Project } from '@core/project';
import { debounce } from '@ui/features/common/utils/debounce';
import NavigationLanguageComponent from '@ui/features/navigation/ui/components/navigation-language-component.vue';
import NavigationAvatarComponent from '@ui/features/navigation/ui/components/navigation-avatar-component.vue';
import NavigationSearchbarComponent from '@ui/features/navigation/ui/components/navigation-searchbar-component.vue';
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

type Emits = {
    logout: [];
};

const emit = defineEmits<Emits>();

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const filteredProjects = ref<Array<Project>>();
const mobileMenuOpen = ref(false);

const navLinks = computed(() =>
    props.userLoggedIn
        ? [
              {
                  name: RouteName.NewProject,
                  label: t('nav.newProject'),
                  icon: 'add_circle_outline',
              },
          ]
        : []
);

const isActive = (name: RouteName): boolean => route.name === name;

const search = async (event: AutoCompleteCompleteEvent): Promise<void> => {
    const result = await projectRepository.readAll();

    if (result.data) {
        filteredProjects.value = result.data.filter((project) =>
            project.name.toLowerCase().includes(event.query.toLowerCase())
        );
    }
};

const debouncedSearch = debounce(search, 300);

const handleSelect = (event: AutoCompleteOptionSelectEvent): void => {
    router.push({
        name: RouteName.Project,
        params: { name: event.value.name },
    });
};

const navigateTo = (name: RouteName): void => {
    router.push({ name });
    mobileMenuOpen.value = false;
};

watch(mobileMenuOpen, (open) => {
    document.body.style.overflow = open ? 'hidden' : '';
});

watch(
    () => route.fullPath,
    () => {
        mobileMenuOpen.value = false;
    }
);
</script>

<template>
    <header
        class="border-surface-200/80 fixed inset-x-0 top-0 z-40 h-16 border-b bg-white/80 backdrop-blur-md"
    >
        <nav
            class="mx-auto flex h-full max-w-(--breakpoint-2xl) items-center gap-3 px-4 md:gap-4 md:px-8"
        >
            <logo-component class="shrink-0" />

            <ul
                v-if="navLinks.length > 0"
                class="hidden items-center gap-1 md:flex lg:gap-2"
                data-testid="desktop-nav"
            >
                <li v-for="link in navLinks" :key="link.name">
                    <router-link
                        :to="{ name: link.name }"
                        class="text-surface-600 hover:text-primary-600 hover:bg-primary-50 rounded-full px-4 py-2 text-sm font-medium transition-colors"
                        :class="{
                            'bg-primary-50 text-primary-600 font-semibold':
                                isActive(link.name),
                        }"
                    >
                        {{ link.label }}
                    </router-link>
                </li>
            </ul>

            <div
                class="z-30 mx-1 hidden min-w-0 flex-1 justify-center md:flex lg:mx-4"
                data-testid="desktop-search"
            >
                <div class="w-full max-w-xl">
                    <prime-input-group
                        class="hover:border-primary-300 !border-surface-200 !bg-surface-50 w-full !overflow-hidden rounded-full !border transition-colors"
                    >
                        <prime-input-group-addon
                            class="!border-0 !bg-transparent !px-3"
                        >
                            <span
                                class="material-icons text-surface-400 text-lg"
                            >
                                search
                            </span>
                        </prime-input-group-addon>
                        <navigation-searchbar-component
                            :suggestions="filteredProjects"
                            @complete="debouncedSearch"
                            @option-select="handleSelect"
                        />
                    </prime-input-group>
                </div>
            </div>

            <div class="ml-auto flex shrink-0 items-center gap-1 md:ml-0">
                <div
                    v-if="!props.userLoggedIn && !props.currentUser"
                    class="hidden items-center gap-2 sm:flex"
                    data-testid="auth-actions"
                >
                    <prime-button
                        :label="t('button.login')"
                        data-testid="login-button"
                        size="small"
                        @click="router.push({ name: RouteName.Login })"
                    />
                    <prime-button
                        class="hidden lg:block"
                        :label="t('button.register')"
                        data-testid="register-button"
                        severity="secondary"
                        outlined
                        size="small"
                        @click="router.push({ name: RouteName.Register })"
                    />
                </div>

                <navigation-avatar-component
                    v-if="props.userLoggedIn && props.currentUser"
                    :user="props.currentUser"
                    @logout="emit('logout')"
                />

                <navigation-language-component />

                <prime-button
                    v-if="!props.userLoggedIn"
                    text
                    severity="secondary"
                    size="small"
                    class="sm:hidden"
                    data-testid="mobile-login-icon-button"
                    aria-label="Anmelden"
                    @click="router.push({ name: RouteName.Login })"
                >
                    <span class="material-icons">login</span>
                </prime-button>

                <div class="md:hidden">
                    <prime-button
                        text
                        severity="secondary"
                        size="small"
                        data-testid="mobile-menu-button"
                        aria-label="Menü"
                        :aria-expanded="mobileMenuOpen"
                        @click="mobileMenuOpen = !mobileMenuOpen"
                    >
                        <span class="material-icons">
                            {{ mobileMenuOpen ? 'close' : 'menu' }}
                        </span>
                    </prime-button>
                </div>
            </div>
        </nav>

        <div v-if="mobileMenuOpen" class="relative md:hidden">
            <div
                class="bg-surface-950/30 fixed inset-0 top-16 z-20 md:hidden"
                aria-hidden="true"
                @click="mobileMenuOpen = false"
            />
            <div
                class="bg-surface-50 border-surface-200 absolute inset-x-0 z-30 border-b shadow-xl md:hidden"
                data-testid="mobile-menu"
            >
                <div class="mx-auto max-w-7xl space-y-4 px-4 py-4">
                    <navigation-searchbar-component
                        :suggestions="filteredProjects"
                        @complete="debouncedSearch"
                        @option-select="handleSelect"
                    />

                    <ul v-if="navLinks.length > 0" class="space-y-1">
                        <li v-for="link in navLinks" :key="link.name">
                            <button
                                type="button"
                                class="text-surface-700 hover:bg-primary-50 hover:text-primary-600 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors"
                                :class="{
                                    'bg-primary-50 text-primary-600 font-semibold':
                                        isActive(link.name),
                                }"
                                @click="navigateTo(link.name)"
                            >
                                <span class="material-icons text-lg">
                                    {{ link.icon }}
                                </span>
                                {{ link.label }}
                            </button>
                        </li>
                    </ul>

                    <div v-if="!props.userLoggedIn">
                        <hr class="border-surface-200 mb-4" />
                        <div class="grid grid-cols-2 gap-2">
                            <prime-button
                                severity="secondary"
                                outlined
                                size="small"
                                :label="t('button.register')"
                                data-testid="mobile-register-button"
                                @click="navigateTo(RouteName.Register)"
                            />
                            <prime-button
                                size="small"
                                :label="t('button.login')"
                                @click="navigateTo(RouteName.Login)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<i18n lang="yaml">
de:
    button:
        login: Anmelden
        register: Registrieren
    nav:
        newProject: Neues Projekt
en:
    button:
        login: Sign in
        register: Register
    nav:
        newProject: New project
</i18n>
