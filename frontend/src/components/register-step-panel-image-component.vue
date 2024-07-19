<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
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
                @select="console.log('select', $event)"
                :multiple="false"
                accept="image/*"
                :maxFileSize="1000000"
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

            <div class="flex w-full justify-between pt-6">
                <prime-button
                    label="Back"
                    severity="secondary"
                    @click="activateCallback('2')"
                />
                <prime-button label="Next" @click="activateCallback('4')" />
            </div>
        </div>
    </prime-step-panel>
</template>

<i18n lang="yaml">
de:
    fileUpload:
        empty: Lade ein Profilbild.
en:
    fileUpload:
        empty: Drag and drop a profile image here.
</i18n>
