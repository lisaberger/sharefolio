<script setup lang="ts">
import LogoComponent from '@ui/features/common/ui/component/logo-component.vue';
import { User } from '@core/user';
import { RouteName } from '@ui/router/enums/route';
import { useI18n } from 'vue-i18n';
import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
} from 'vue';
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
const searching = ref(false);
const scrolled = ref(false);

const mobileMenuPanel = ref<HTMLElement | null>(null);
const lastFocused = ref<HTMLElement | null>(null);

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

const desktopNavLinkClasses = (name: RouteName): Record<string, boolean> => {
    const active = isActive(name);

    return {
        'text-surface-600 hover:bg-primary-50 hover:text-primary-600': !active,
        'bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:text-white':
            active,
    };
};

const search = async (event: AutoCompleteCompleteEvent): Promise<void> => {
    searching.value = true;

    try {
        const result = await projectRepository.readAll();

        if (result.data) {
            filteredProjects.value = result.data.filter((project) =>
                project.name.toLowerCase().includes(event.query.toLowerCase())
            );
        }
    } finally {
        searching.value = false;
    }
};

const debouncedSearch = debounce(search, 300);

const handleSelect = (event: AutoCompleteOptionSelectEvent): void => {
    router.push({
        name: RouteName.Project,
        params: { name: event.value.name },
    });
};

const handleSearchEnter = (): void => {
    const firstProject = filteredProjects.value?.[0];

    if (firstProject) {
        router.push({
            name: RouteName.Project,
            params: { name: firstProject.name },
        });
    }
};

const navigateTo = (name: RouteName): void => {
    router.push({ name });
    mobileMenuOpen.value = false;
};

const toggleMobileMenu = (event: MouseEvent): void => {
    lastFocused.value = event.currentTarget as HTMLElement;
    mobileMenuOpen.value = !mobileMenuOpen.value;
};

const trapFocus = (event: KeyboardEvent): void => {
    if (event.key !== 'Tab') {
        return;
    }

    const focusableElements =
        mobileMenuPanel.value?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
        );

    if (!focusableElements || focusableElements.length === 0) {
        return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
};

const onScroll = (): void => {
    scrolled.value = window.scrollY > 8;
};

const onGlobalKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && mobileMenuOpen.value) {
        mobileMenuOpen.value = false;
    }
};

watch(mobileMenuOpen, async (open) => {
    document.body.style.overflow = open ? 'hidden' : '';

    if (open) {
        await nextTick();
        mobileMenuPanel.value
            ?.querySelector<HTMLElement>('input, button, a')
            ?.focus();
    } else {
        lastFocused.value?.focus?.();
        lastFocused.value = null;
    }
});

watch(
    () => route.fullPath,
    () => {
        mobileMenuOpen.value = false;
    }
);

onMounted(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onGlobalKeydown);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('keydown', onGlobalKeydown);
});
</script>

<template>
    <header
        class="border-surface-200/80 fixed inset-x-0 top-0 z-40 h-16 border-b bg-white/80 backdrop-blur-md transition-shadow duration-300 motion-reduce:transition-none"
        :class="{ 'shadow-sm': scrolled }"
    >
        <nav
            class="max-w-(--breakpoint-2xl) mx-auto flex h-full items-center gap-3 px-4 md:gap-4 md:px-8"
        >
            <logo-component class="shrink-0" />

            <div
                class="bg-surface-200 hidden h-8 w-px shrink-0 md:block"
                aria-hidden="true"
            />

            <ul
                v-if="navLinks.length > 0"
                class="hidden items-center gap-1 md:flex lg:gap-2"
                data-testid="desktop-nav"
            >
                <li v-for="link in navLinks" :key="link.name">
                    <router-link
                        :to="{ name: link.name }"
                        class="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 motion-reduce:transition-none"
                        :class="desktopNavLinkClasses(link.name)"
                        :aria-current="isActive(link.name) ? 'page' : undefined"
                    >
                        {{ link.label }}
                    </router-link>
                </li>
            </ul>

            <div
                class="z-30 mx-1 hidden min-w-0 flex-1 justify-center md:flex lg:mx-4"
                data-testid="desktop-search"
                role="search"
            >
                <div class="w-full max-w-xl">
                    <prime-input-group
                        class="hover:border-primary-300 border-surface-200! !bg-surface-50 w-full !overflow-hidden rounded-full !border transition-colors"
                    >
                        <prime-input-group-addon
                            class="!border-0 !bg-transparent !px-3"
                        >
                            <span
                                v-if="searching"
                                class="material-icons text-surface-400 animate-spin text-lg"
                            >
                                autorenew
                            </span>
                            <span
                                v-else
                                class="material-icons text-surface-400 text-lg"
                            >
                                search
                            </span>
                        </prime-input-group-addon>
                        <navigation-searchbar-component
                            :suggestions="filteredProjects"
                            @complete="debouncedSearch"
                            @option-select="handleSelect"
                            @enter="handleSearchEnter"
                        />
                        <prime-input-group-addon
                            class="hidden border-0! bg-transparent! px-3! lg:flex"
                        >
                            <kbd
                                class="text-surface-400 border-surface-300 rounded-md border bg-white px-1.5 py-0.5 font-mono text-[10px] font-medium"
                            >
                                ⌘K
                            </kbd>
                        </prime-input-group-addon>
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

                <div class="md:hidden">
                    <prime-button
                        text
                        severity="secondary"
                        size="small"
                        data-testid="mobile-menu-button"
                        :aria-label="
                            t(
                                mobileMenuOpen
                                    ? 'aria.closeMenu'
                                    : 'aria.openMenu'
                            )
                        "
                        :aria-expanded="mobileMenuOpen"
                        aria-controls="mobile-menu"
                        @click="toggleMobileMenu"
                    >
                        <span class="material-icons">
                            {{ mobileMenuOpen ? 'close' : 'menu' }}
                        </span>
                    </prime-button>
                </div>
            </div>
        </nav>

        <transition name="mobile-menu">
            <div v-if="mobileMenuOpen" class="relative md:hidden">
                <div
                    class="bg-surface-950/30 fixed inset-0 top-16 z-20 md:hidden"
                    aria-hidden="true"
                    @click="mobileMenuOpen = false"
                />
                <div
                    id="mobile-menu"
                    ref="mobileMenuPanel"
                    class="bg-surface-50 border-surface-200 absolute inset-x-0 z-30 border-b shadow-xl md:hidden"
                    data-testid="mobile-menu"
                    role="dialog"
                    :aria-label="t('aria.menu')"
                    @keydown="trapFocus"
                >
                    <div class="mx-auto max-w-7xl space-y-4 px-4 py-4">
                        <div class="relative">
                            <navigation-searchbar-component
                                :suggestions="filteredProjects"
                                @complete="debouncedSearch"
                                @option-select="handleSelect"
                                @enter="handleSearchEnter"
                            />
                            <span
                                v-if="searching"
                                class="material-icons text-surface-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-lg"
                            >
                                autorenew
                            </span>
                        </div>

                        <ul v-if="navLinks.length > 0" class="space-y-1">
                            <li v-for="link in navLinks" :key="link.name">
                                <button
                                    type="button"
                                    class="text-surface-700 hover:bg-primary-50 hover:text-primary-600 flex min-h-11 w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors"
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
        </transition>
    </header>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
    transition: opacity 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
    opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
    .mobile-menu-enter-active,
    .mobile-menu-leave-active {
        transition: none;
    }
}
</style>

<i18n lang="yaml">
de:
    button:
        login: Anmelden
        register: Registrieren
    nav:
        newProject: Neues Projekt
    aria:
        openMenu: Menü öffnen
        closeMenu: Menü schließen
        login: Anmelden
        menu: Navigation
en:
    button:
        login: Sign in
        register: Register
    nav:
        newProject: New project
    aria:
        openMenu: Open menu
        closeMenu: Close menu
        login: Sign in
        menu: Navigation
</i18n>
