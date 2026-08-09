<script setup lang="ts">
import { RouteName } from '@ui/router/enums/route';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <footer
        class="border-surface-200 mx-auto w-full border-t bg-white px-4 py-8 md:px-8"
    >
        <div
            class="flex flex-col items-center justify-between gap-4 md:flex-row"
        >
            <span class="text-surface-400 text-sm">
                © 2024 Sharefolio. {{ t('footer.rights') }}
            </span>

            <nav>
                <ul class="flex items-center gap-6 text-sm">
                    <li>
                        <router-link
                            :to="{ name: RouteName.About }"
                            class="text-surface-600 hover:text-primary-600 transition-colors"
                        >
                            {{ t('footer.about') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            :to="{ name: RouteName.Imprint }"
                            class="text-surface-600 hover:text-primary-600 transition-colors"
                        >
                            {{ t('footer.imprint') }}
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </footer>
</template>

<i18n lang="yaml">
de:
    footer:
        rights: Alle Rechte vorbehalten.
        about: Über uns
        imprint: Impressum
en:
    footer:
        rights: All rights reserved.
        about: About
        imprint: Imprint
</i18n>
