<script setup lang="ts">
import RegisterStepperListComponent from '@/components/register-stepper-list-component.vue';
import RegisterStepPanels from '@/components/register-step-panels-component.vue';
import { ref } from 'vue';

const activeStep = ref('1');
</script>

<template>
    <prime-stepper v-model:value="activeStep" class="md:mx-8">
        <register-stepper-list-component v-model:activeStep="activeStep" />
        <register-step-panels />
    </prime-stepper>
</template>
