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
    <section class="flex flex-col items-center px-4 py-16 md:py-20">
        <div
            class="border-surface-200 w-full max-w-2xl rounded-3xl border bg-white p-8 shadow-sm md:p-10"
        >
            <div class="mb-8 flex flex-col items-center text-center">
                <logo-component :extended="false" class="mb-4" />
                <h1
                    class="text-surface-900 text-2xl font-extrabold tracking-tight"
                >
                    {{ t('panel.title') }}
                </h1>
                <p class="text-surface-500 mt-2 text-sm">
                    {{ t('panel.description') }}
                </p>
            </div>

            <register-stepper-container
                v-model:login="loginForm"
                v-model:contact="contactForm"
                v-model:file="profileImage"
                @submit="submit"
            />

            <div
                class="border-surface-100 mt-8 border-t pt-6 text-center text-sm"
            >
                <p class="text-surface-600">
                    {{ t('panel.loginHint') }}
                </p>
            </div>
        </div>
    </section>
</template>

<i18n lang="yaml">
de:
    panel:
        title: Konto erstellen
        description: Erstelle ein eigenes Profil und teile dein Portfolio.
        loginHint: Du hast bereits ein Profil bei Sharefolio? Dann logge dich hier ein!
en:
    panel:
        title: Create account
        description: Create your own profile and showcase your portfolio.
        loginHint: Already have a Sharefolio profile? Sign in here!
</i18n>
