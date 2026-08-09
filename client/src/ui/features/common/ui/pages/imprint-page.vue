<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <div class="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <h1 class="text-surface-900 text-3xl font-extrabold tracking-tight">
            {{ t('imprint.title') }}
        </h1>

        <div class="text-surface-600 mt-8 space-y-8 leading-relaxed">
            <section>
                <h2 class="text-surface-900 text-lg font-bold">
                    {{ t('imprint.publisher') }}
                </h2>
                <p class="mt-2">
                    Hochschule Augsburg<br />
                    An der Hochschule 1<br />
                    86161 Augsburg
                </p>
            </section>

            <section>
                <h2 class="text-surface-900 text-lg font-bold">
                    {{ t('imprint.responsible') }}
                </h2>
                <p class="mt-2">
                    {{ t('imprint.projectBy') }}<br />
                    Sharefolio – Studienprojekt im Studiengang Interaktive
                    Medien
                </p>
            </section>

            <section>
                <h2 class="text-surface-900 text-lg font-bold">
                    {{ t('imprint.contact') }}
                </h2>
                <p class="mt-2">
                    E-Mail:
                    <a
                        href="mailto:sharefolio@hs-augsburg.de"
                        class="text-primary-600 hover:underline"
                        >sharefolio@hs-augsburg.de</a
                    >
                </p>
            </section>

            <section>
                <h2 class="text-surface-900 text-lg font-bold">
                    {{ t('imprint.disclaimer') }}
                </h2>
                <p class="mt-2">
                    {{ t('imprint.disclaimerBody') }}
                </p>
            </section>
        </div>
    </div>
</template>

<i18n lang="yaml">
de:
    imprint:
        title: Impressum
        publisher: Herausgeber
        responsible: Verantwortlich für den Inhalt
        projectBy: Projektteam Sharefolio
        contact: Kontakt
        disclaimer: Haftungsausschluss
        disclaimerBody: Diese Website ist ein studentisches Projekt. Die Inhalte dienen ausschließlich zu Studien- und Demonstrationszwecken und stellen keine offiziellen Informationen der Hochschule Augsburg dar.
en:
    imprint:
        title: Imprint
        publisher: Publisher
        responsible: Responsible for content
        projectBy: Sharefolio project team
        contact: Contact
        disclaimer: Disclaimer
        disclaimerBody: This website is a student project. Its content serves study and demonstration purposes only and does not represent official information from Augsburg University of Applied Sciences.
</i18n>
