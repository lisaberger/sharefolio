<script setup lang="ts">
import { type ContactForm } from '../types/contact-form';
import { type LoginForm } from '../types/login-form';

import RegisterStepPanelContactComponent from './register-step-panel-contact-component.vue';
import RegisterStepPanelDoneComponent from './register-step-panel-done-component.vue';
import RegisterStepPanelImageComponent from './register-step-panel-image-component.vue';
import RegisterStepPanelLoginComponent from './register-step-panel-login-component.vue';

const loginForm = defineModel<LoginForm>('login', { required: true });
const contactForm = defineModel<ContactForm>('contact', { required: true });
const file = defineModel<File>('file');

const emit = defineEmits<{
    submit: [];
}>();

const handleSubmit = (): void => {
    emit('submit');
};
</script>

<template>
    <prime-step-panels>
        <register-step-panel-login-component v-model:login="loginForm" />
        <register-step-panel-contact-component v-model:contact="contactForm" />
        <register-step-panel-image-component v-model:file="file" />
        <register-step-panel-done-component @done="handleSubmit" />
    </prime-step-panels>
</template>
