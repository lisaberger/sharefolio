<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import logoComponent from '@ui/features/common/ui/component/logo-component.vue';
import { useI18n } from 'vue-i18n';
import RegisterStepperContainer from '@ui/features/auth/ui/containers/register-stepper-container.vue';
import { userRepository } from '@config';
import type { ContactForm } from '@ui/features/auth/ui/types/contact-form';
import type { LoginForm } from '@ui/features/auth/ui/types/login-form';

const router = useRouter();

const loginForm = ref<LoginForm>({
    username: '',
    password: '',
    passwordRepeat: '',
});

const contactForm = ref<ContactForm>({
    firstname: '',
    lastname: '',
    email: '',
    location: '',
    job: '',
    description: '',
});

const profileImage = ref<File>();

const submit = async (): Promise<void> => {
    const result = await userRepository.create({
        username: loginForm.value.username,
        password: loginForm.value.password,
        email: contactForm.value.email,
        firstname: contactForm.value.firstname,
        lastname: contactForm.value.lastname,
        job: contactForm.value.job,
        location: contactForm.value.location,
        description: contactForm.value.description,
    });

    if (result.data) {
        await router.push({ path: '/login' });
    }
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
            <register-stepper-container
                v-model:login="loginForm"
                v-model:contact="contactForm"
                v-model:file="profileImage"
                @submit="submit"
            />
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
