<script setup lang="ts">
import { computed, ref } from 'vue';
import { type ContactForm } from '../types/contact-form';
import { type LoginForm } from '../types/login-form';
import { type RegisterForm } from '../types/register-form';

import RegisterStepPanelContactComponent from './register-step-panel-contact-component.vue';
import RegisterStepPanelDoneComponent from './register-step-panel-done-component.vue';
import RegisterStepPanelImageComponent from './register-step-panel-image-component.vue';
import RegisterStepPanelLoginComponent from './register-step-panel-login-component.vue';

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

const profileImage = ref();

const registerFormData = computed<RegisterForm>(() => ({
    ...loginForm.value,
    ...contactForm.value,
}));
</script>

<template>
    <prime-step-panels>
        <register-step-panel-login-component v-model:login="loginForm" />
        <register-step-panel-contact-component v-model:contact="contactForm" />
        <register-step-panel-image-component v:model:file="file" />
        <register-step-panel-done-component />
    </prime-step-panels>
</template>
