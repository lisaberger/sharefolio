<script setup lang="ts">
import LogoComponent from '@ui/features/common/ui/component/logo-component.vue';
import { RouteName } from '@ui/router/enums/route';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <div class="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <section class="text-center">
            <logo-component :extended="false" class="mb-6 justify-center" />
            <h1 class="text-surface-900 text-4xl font-extrabold tracking-tight">
                {{ t('about.title') }}
            </h1>
            <p class="text-primary-600 mt-3 text-lg font-medium">
                {{ t('about.tagline') }}
            </p>
        </section>

        <section class="mt-12 space-y-12">
            <div
                class="border-surface-200 rounded-3xl border bg-white p-8 shadow-sm md:p-10"
            >
                <h2
                    class="text-surface-900 flex items-center gap-2 text-xl font-bold"
                >
                    <span class="material-icons text-primary-500"
                        >auto_stories</span
                    >
                    {{ t('about.mission.title') }}
                </h2>
                <p class="text-surface-600 mt-4 leading-relaxed">
                    {{ t('about.mission.body') }}
                </p>
            </div>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div
                    class="border-surface-200 rounded-2xl border bg-white p-6 shadow-sm"
                >
                    <span
                        class="bg-primary-50 text-primary-500 flex h-12 w-12 items-center justify-center rounded-xl"
                    >
                        <span class="material-icons">visibility</span>
                    </span>
                    <h3 class="text-surface-900 mt-4 font-bold">
                        {{ t('about.features.1.title') }}
                    </h3>
                    <p class="text-surface-500 mt-2 text-sm leading-relaxed">
                        {{ t('about.features.1.body') }}
                    </p>
                </div>

                <div
                    class="border-surface-200 rounded-2xl border bg-white p-6 shadow-sm"
                >
                    <span
                        class="bg-primary-50 text-primary-500 flex h-12 w-12 items-center justify-center rounded-xl"
                    >
                        <span class="material-icons">group</span>
                    </span>
                    <h3 class="text-surface-900 mt-4 font-bold">
                        {{ t('about.features.2.title') }}
                    </h3>
                    <p class="text-surface-500 mt-2 text-sm leading-relaxed">
                        {{ t('about.features.2.body') }}
                    </p>
                </div>

                <div
                    class="border-surface-200 rounded-2xl border bg-white p-6 shadow-sm"
                >
                    <span
                        class="bg-primary-50 text-primary-500 flex h-12 w-12 items-center justify-center rounded-xl"
                    >
                        <span class="material-icons">rocket_launch</span>
                    </span>
                    <h3 class="text-surface-900 mt-4 font-bold">
                        {{ t('about.features.3.title') }}
                    </h3>
                    <p class="text-surface-500 mt-2 text-sm leading-relaxed">
                        {{ t('about.features.3.body') }}
                    </p>
                </div>
            </div>

            <div class="text-center">
                <router-link :to="{ name: RouteName.Home }">
                    <prime-button icon-pos="right">
                        <template #icon>
                            <span class="material-icons text-base"
                                >explore</span
                            >
                        </template>
                        {{ t('about.cta') }}
                    </prime-button>
                </router-link>
            </div>
        </section>
    </div>
</template>

<i18n lang="yaml">
de:
    about:
        title: Über Sharefolio
        tagline: Die Plattform für kreative Arbeiten aus dem Studiengang Interaktive Medien.
        mission:
            title: Unsere Idee
            body: Sharefolio verbindet Studierende der Hochschule Augsburg und gibt ihnen eine Bühne, um ihre kreativen Projekte zu präsentieren, sich gegenseitig zu inspirieren und als Community zusammenzuwachsen.
        features:
            1:
                title: Inspirieren
                body: Entdecke die vielfältigen Arbeiten deiner Kommilitoninnen und Kommilitonen und lass dich für deine eigenen Projekte begeistern.
            2:
                title: Teilen
                body: Präsentiere deine Projekte mit Bildern, Beschreibungen und Demos – einfach und unkompliziert.
            3:
                title: Vernetzen
                body: Lerne die Menschen hinter den Projekten kennen und knüpfe Kontakte für deine nächste Zusammenarbeit.
        cta: Projekte entdecken
en:
    about:
        title: About Sharefolio
        tagline: The platform for creative work from the Interactive Media programme.
        mission:
            title: Our idea
            body: Sharefolio connects students of Augsburg University of Applied Sciences and gives them a stage to showcase their creative projects, inspire each other and grow together as a community.
        features:
            1:
                title: Get inspired
                body: Discover the diverse work of your fellow students and get excited for your own projects.
            2:
                title: Share
                body: Present your projects with images, descriptions and demos – simple and effortless.
            3:
                title: Connect
                body: Get to know the people behind the projects and make connections for your next collaboration.
        cta: Discover projects
</i18n>
