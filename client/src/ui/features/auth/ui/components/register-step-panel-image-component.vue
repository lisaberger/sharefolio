<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const file = defineModel<File>('file');

const handleSelect = (event: { files?: File[] }): void => {
    file.value = event.files?.[0];
};
</script>

<template>
    <prime-step-panel
        v-slot="{ activateCallback }"
        value="3"
        class="flex w-full flex-col items-center"
    >
        <div class="mt-8 w-full max-w-md">
            <prime-file-upload
                name="avatar"
                :show-upload-button="false"
                :show-cancel-button="false"
                :multiple="false"
                accept="image/*"
                :max-file-size="1000000"
                @select="handleSelect"
            >
                <template #empty>
                    <div class="flex flex-col items-center justify-center">
                        <span class="material-icons text-4xl font-light"
                            >face</span
                        >
                        <p class="text-sm">
                            {{ t('fileUpload.empty') }}
                        </p>
                    </div>
                </template>
            </prime-file-upload>

            <div class="flex justify-between pt-6">
                <prime-button
                    severity="secondary"
                    @click="activateCallback('2')"
                >
                    <span class="material-icons text-sm">arrow_back</span>
                    {{ t('button.back') }}
                </prime-button>
                <prime-button @click="activateCallback('4')">
                    {{ t('button.next') }}
                    <span class="material-icons text-sm">arrow_forward</span>
                </prime-button>
            </div>
        </div>
    </prime-step-panel>
</template>

<i18n lang="yaml">
de:
    fileUpload:
        empty: Lade ein Profilbild.
    button:
        back: Zurück
        next: Weiter
en:
    fileUpload:
        empty: Drag and drop a profile image here.
    button:
        back: Back
        next: Next
</i18n>
