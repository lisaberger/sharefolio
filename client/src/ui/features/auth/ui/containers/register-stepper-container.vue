<script setup lang="ts">
import RegisterStepperListComponent from '../components/register-stepper-list-component.vue';
import RegisterStepPanels from '../components/register-step-panels-component.vue';
import { ref } from 'vue';
import type { ContactForm } from '../types/contact-form.js';
import type { LoginForm } from '../types/login-form.js';

const activeStep = ref('1');

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
    <prime-stepper v-model:value="activeStep" class="md:mx-8">
        <register-stepper-list-component v-model:active-step="activeStep" />
        <register-step-panels
            v-model:login="loginForm"
            v-model:contact="contactForm"
            v-model:file="file"
            @submit="handleSubmit"
        />
    </prime-stepper>
</template>
