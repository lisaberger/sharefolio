<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

type Emit = {
    submit: [];
};

const emit = defineEmits<Emit>();

const submit = () => emit('submit');
</script>

<template>
    <prime-step-panel
        v-slot="{ activateCallback }"
        value="4"
        class="flex w-full flex-col items-center"
    >
        <div class="mt-8 w-full md:w-2/3"></div>
        <div class="flex justify-between pt-6">
            <prime-button
                label="cancel"
                severity="secondary"
                icon="pi pi-arrow-left"
                @click="activateCallback('2')"
            />
            <prime-button
                :label="t('button.submit')"
                severity="primary"
                icon-pos="right"
                @click="submit"
            >
                <template #icon>
                    <span class="material-icons">arrow_right</span>
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
