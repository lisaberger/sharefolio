<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';

const { t } = useI18n();

type Emit = {
    done: [];
};

const emit = defineEmits<Emit>();

const handleDone = () => emit('done');
</script>

<template>
    <prime-step-panel
        v-slot="{ activateCallback }"
        value="4"
        class="flex w-full flex-col items-center"
    >
        <div class="mt-8 flex w-full justify-center md:w-2/3">
            <DotLottieVue class="h-32 w-32" autoplay src="check.lottie" />
        </div>
        <div class="flex justify-between pt-6">
            <prime-button
                :label="t('button.submit')"
                severity="primary"
                icon-pos="right"
                @click="handleDone"
            >
                <template #icon>
                    <span class="material-icons">check</span>
                </template>
            </prime-button>
        </div>
    </prime-step-panel>
</template>

<i18n lang="yaml">
de:
    button:
        submit: Profil hinzufügen
en:
    button:
        submit: Submit profile
</i18n>
