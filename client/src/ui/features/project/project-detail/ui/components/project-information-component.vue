<script setup lang="ts">
import { Project } from '@core/project';
import { RouteName } from '@ui/router/enums/route';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

interface Props {
    project: Project;
}

const props = defineProps<Props>();

const { t } = useI18n();

const contributors = computed(() =>
    props.project.contributors
        ? props.project.contributors.split(',').map((c) => c.trim())
        : []
);

const creatorInitials = computed(() => {
    const first = props.project.creator?.firstname ?? '';
    const last = props.project.creator?.lastname ?? '';
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
});
</script>

<template>
    <div class="space-y-8">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
            <div class="flex-1">
                <div class="mb-4 flex flex-wrap items-center gap-2">
                    <span
                        v-if="props.project.kind"
                        class="bg-primary-50 text-primary-600 rounded-full px-3 py-1 text-xs font-semibold"
                    >
                        {{ props.project.kind }}
                    </span>
                    <span
                        v-if="props.project.category"
                        class="border-surface-200 text-surface-500 rounded-full border px-3 py-1 text-xs font-medium"
                    >
                        {{ props.project.category }}
                    </span>
                </div>

                <p class="text-surface-600 text-lg leading-relaxed">
                    {{ props.project.description }}
                </p>
            </div>

            <aside
                class="border-surface-200 w-full shrink-0 space-y-5 rounded-2xl border bg-white p-6 shadow-xs lg:w-80"
            >
                <div
                    v-if="props.project.creator"
                    class="flex items-center gap-3"
                >
                    <prime-avatar
                        :label="creatorInitials"
                        shape="circle"
                        size="large"
                        style="background-color: #dee9fc; color: #1a2551"
                    />
                    <div class="min-w-0">
                        <p class="text-surface-900 text-sm font-semibold">
                            {{ props.project.creator.fullname }}
                        </p>
                        <p class="text-surface-500 text-xs">
                            {{ props.project.creator.job }}
                        </p>
                    </div>
                </div>

                <div class="border-surface-100 border-t pt-5">
                    <p
                        class="text-surface-400 mb-2 text-xs font-semibold uppercase tracking-wider"
                    >
                        {{ t('detail.tools') }}
                    </p>
                    <div class="flex flex-wrap gap-1.5">
                        <template v-if="props.project.tools">
                            <span
                                v-for="tool in props.project.tools.split(',')"
                                :key="tool"
                                class="bg-surface-100 text-surface-700 rounded-full px-2.5 py-1 text-xs font-medium"
                            >
                                {{ tool.trim() }}
                            </span>
                        </template>
                    </div>
                </div>

                <div
                    v-if="contributors.length > 0"
                    class="border-surface-100 border-t pt-5"
                >
                    <p
                        class="text-surface-400 mb-2 text-xs font-semibold uppercase tracking-wider"
                    >
                        {{ t('detail.contributors') }}
                    </p>
                    <div class="flex flex-wrap gap-1.5">
                        <span
                            v-for="contributor in contributors"
                            :key="contributor"
                            class="border-surface-200 text-surface-600 rounded-full border px-2.5 py-1 text-xs font-medium"
                        >
                            {{ contributor }}
                        </span>
                    </div>
                </div>

                <div class="border-surface-100 border-t pt-5">
                    <prime-button
                        v-if="props.project.demo"
                        as="a"
                        :href="props.project.demo"
                        target="_blank"
                        rel="noopener noreferrer"
                        icon-pos="right"
                        class="w-full"
                    >
                        <template #icon>
                            <span class="material-icons text-base">
                                open_in_new
                            </span>
                        </template>
                        {{ t('detail.visit') }}
                    </prime-button>
                    <router-link
                        v-else
                        :to="{ name: RouteName.NewProject }"
                        class="block"
                    >
                        <prime-button
                            severity="secondary"
                            outlined
                            class="w-full"
                        >
                            {{ t('detail.noDemo') }}
                        </prime-button>
                    </router-link>
                </div>
            </aside>
        </div>
    </div>
</template>

<i18n lang="yaml">
de:
    detail:
        tools: 'Tools'
        contributors: 'Mitwirkende'
        visit: 'Demo ansehen'
        noDemo: 'Keine Demo verfügbar'
en:
    detail:
        tools: 'Tools'
        contributors: 'Contributors'
        visit: 'View demo'
        noDemo: 'No demo available'
</i18n>
