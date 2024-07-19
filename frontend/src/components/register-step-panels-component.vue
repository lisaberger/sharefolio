<script setup lang="ts">
import RegisterStepPanelLoginComponent from '@/components/register-step-panel-login-component.vue';
import RegisterStepPanelContactComponent from '@/components/register-step-panel-contact-component.vue';
import RegisterStepPanelImageComponent from '@/components/register-step-panel-image-component.vue';
import RegisterStepPanelDoneComponent from '@/components/register-step-panel-done-component.vue';
</script>

<template>
    <prime-step-panels>
        <register-step-panel-login-component />
        <register-step-panel-contact-component />
        <register-step-panel-image-component />
        <register-step-panel-done-component />
    </prime-step-panels>
</template>
