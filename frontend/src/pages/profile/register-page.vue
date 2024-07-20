<script setup lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import logoComponent from '@/components/logo-component.vue';
import { useI18n } from 'vue-i18n';
import { minLength, required } from '@/i18n/validators/i18n-validators';
import useVuelidate from '@vuelidate/core';
import RegisterStepperContainer from '@/containers/register-stepper-container.vue';

const router = useRouter();

const submit = () => {
    /* append file and set name */
    // const fd = new FormData();
    // let tempFileName = '';
    // if (file.value) {
    //     tempFileName =
    //         new Date().toISOString().replace(/:/g, '-') + file.value.name;
    //     fd.append('profilePic', file.value, tempFileName);
    // } else {
    //     tempFileName = 'avatar_placeholder.png';
    // }
    // axios.post('http://localhost:4000/users/create', fd).then(async (res) => {
    //     /* redirect to login */
    //     await router.push({ path: '/login' });
    // });
};

const { t } = useI18n();
</script>

<template>
    <section class="mt-8">
        <prime-panel>
            <template #header>
                <div class="flex w-full flex-col items-center">
                    <logo-component :extended="false" class="my-2" />
                    <p class="mb-2 text-center text-sm">
                        {{ t('panel.description') }}
                    </p>
                </div>
            </template>
            <register-stepper-container />
            <div class="mb-8 mt-4 flex justify-center">
                <p class="text-sm">
                    {{ t('panel.loginHint') }}
                </p>
            </div>
        </prime-panel>
    </section>
</template>

<i18n lang="yaml">
de:
    panel:
        description: Erstelle ein eigenes Profil und teile dein Portfolio.
        loginHint: Du hast bereits ein Profil bei Sharefolio? Dann logge dich hier ein!
en:
    panel:
        description: Create your own profile and showcase your portfolio.
        loginHint: Already have a Sharefolio profile? Sign in here!
</i18n>
