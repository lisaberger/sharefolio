<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    activeStep: string | number;
}

const props = defineProps<Props>();

interface StepperListOption {
    name: string;
    value: string | number;
    icon: string;
}

const stepperOptions = ref<StepperListOption[]>([
    {
        name: 'Anmeldedaten',
        value: '1',
        icon: 'lock',
    },
    {
        name: 'Kontaktdaten',
        value: '2',
        icon: 'person',
    },
    {
        name: 'Profilbild',
        value: '3',
        icon: 'image',
    },
    {
        name: 'Fertig',
        value: '4',
        icon: 'check',
    },
]);
</script>

<template>
    <prime-step-list>
        <prime-step
            v-for="(step, index) in stepperOptions"
            v-slot="{ activateCallback, a11yAttrs }"
            asChild
            :value="step.value"
        >
            <div
                class="mr-2 flex flex-auto flex-row items-center gap-2"
                v-bind="a11yAttrs.root"
            >
                <button
                    class="inline-flex flex-col gap-2 border-0 bg-transparent"
                    @click="activateCallback(`${step.value}`)"
                    v-bind="a11yAttrs.header"
                >
                    <span
                        class="material-icons inline-flex h-8 w-8 items-center justify-center rounded border-2"
                        :class="{
                            'text-primary-500': step.value <= props.activeStep,
                        }"
                        >{{ step.icon }}</span
                    >
                </button>
                <span class="hidden text-sm font-medium md:block">
                    {{ step.name }}
                </span>
                <prime-divider v-if="index + 1 !== stepperOptions.length" />
            </div>
        </prime-step>
    </prime-step-list>
</template>

<i18n lang="yaml">
de:
    loginInformation: Anmeldedaten
    userInformation: Kontaktdaten
    userProfile: Profilbild
    completed: Fertig
en:
    loginInformation: Login information
    userInformation: Profile information
    userProfile: Profile image
    completed: Done
</i18n>
