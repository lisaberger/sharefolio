<script setup lang="ts">
import ProfileProjectItem from '@ui/features/project/project-detail/ui/components/profile-project-item-component.vue';
import { useRoute } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import { User } from '@core/user';
import { Project } from '@core/project';
import { userRepository } from '@config';
import { useI18n } from 'vue-i18n';

const account = ref<User | null>(null);
const projects = ref<Array<Project> | null>(null);
const route = useRoute();
const isLoading = ref(true);
const { t } = useI18n();

onBeforeMount(() => {
    const username = route.params.user as string;

    userRepository.getByName(username).then((result) => {
        account.value = result.data ?? null;
        isLoading.value = false;
    });

    userRepository.getProjectsByUsername(username).then((result) => {
        projects.value = result.data ?? null;
    });
});
</script>

<template>
    <div v-if="!isLoading" class="space-y-12 md:space-y-16">
        <section
            class="border-surface-200 flex flex-col items-center gap-8 rounded-3xl border bg-white p-8 shadow-xs md:flex-row md:items-start md:gap-12 md:p-12"
        >
            <prime-avatar
                :image="account?.image || undefined"
                :label="account?.initials"
                shape="circle"
                size="xlarge"
                style="
                    background-color: #dee9fc;
                    color: #1a2551;
                    width: 10rem;
                    height: 10rem;
                    font-size: 3rem;
                "
            />

            <div class="flex-1 text-center md:text-left">
                <h1
                    class="text-surface-900 text-3xl font-extrabold tracking-tight md:text-4xl"
                >
                    {{ account?.fullname }}
                </h1>
                <p class="text-primary-600 mt-1 text-sm font-semibold">
                    {{ account?.job }}
                </p>

                <p class="text-surface-500 mx-auto mt-4 max-w-2xl md:mx-0">
                    {{ account?.description }}
                </p>

                <div
                    class="mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start"
                >
                    <span
                        v-if="account?.location"
                        class="text-surface-500 inline-flex items-center gap-1.5 text-sm"
                    >
                        <span class="material-icons text-base">place</span>
                        {{ account?.location }}
                    </span>
                    <a v-if="account?.email" :href="'mailto:' + account?.email">
                        <prime-button
                            :label="t('profile.contact')"
                            size="small"
                        >
                            <template #icon>
                                <span class="material-icons text-base">
                                    mail
                                </span>
                            </template>
                        </prime-button>
                    </a>
                </div>
            </div>
        </section>

        <section>
            <div class="mb-8">
                <h2 class="text-surface-900 text-2xl font-bold tracking-tight">
                    {{ t('profile.projects') }}
                </h2>
                <p class="text-surface-500 mt-1 text-sm">
                    {{ t('profile.projectsHint') }}
                </p>
            </div>

            <div
                v-if="projects && projects.length > 0"
                class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                <ProfileProjectItem
                    v-for="project in projects"
                    :key="project.id"
                    :project="project"
                />
            </div>

            <div
                v-else
                class="border-surface-200 text-surface-500 rounded-2xl border border-dashed p-12 text-center"
            >
                {{ t('profile.noProjects') }}
            </div>
        </section>
    </div>
</template>

<i18n lang="yaml">
de:
    profile:
        contact: Kontakt
        projects: Projekte
        projectsHint: Arbeiten aus dem Portfolio
        noProjects: Dieses Profil hat noch keine Projekte veröffentlicht.
en:
    profile:
        contact: Contact
        projects: Projects
        projectsHint: Work from the portfolio
        noProjects: This profile has not published any projects yet.
</i18n>
