<script setup lang="ts">
import RegisterStepPanelLoginComponent from '@/components/register-step-panel-login-component.vue';
import RegisterStepPanelContactComponent from '@/components/register-step-panel-contact-component.vue';
import RegisterStepPanelImageComponent from '@/components/register-step-panel-image-component.vue';
import RegisterStepPanelDoneComponent from '@/components/register-step-panel-done-component.vue';
import { reactive, ref, shallowReactive, toRefs, watch } from 'vue';

type LoginForm = {
    username: string;
    password: string;
    passwordRepeat: string;
};

type ContactForm = {
    firstname: string;
    lastname: string;
    email: string;
    location: string;
    job: string;
    description: string;
};

const loginForm = reactive<LoginForm>({
    username: '',
    password: '',
    passwordRepeat: '',
});

const contactForm = reactive<ContactForm>({
    firstname: '',
    lastname: '',
    email: '',
    location: '',
    job: '',
    description: '',
});

const profileImage = ref<File>();

const registerFormData = shallowReactive({
    ...toRefs(loginForm),
    ...toRefs(contactForm),
    profileImage,
});
</script>

<template>
    <prime-step-panels>
        <register-step-panel-login-component v-model:login="loginForm" />
        <register-step-panel-contact-component v-model:contact="contactForm" />
        <register-step-panel-image-component v:model:file="profileImage" />
        <register-step-panel-done-component
            @submit="console.log(registerFormData)"
        />
    </prime-step-panels>
</template>
