<script setup lang="ts">
import { ref } from 'vue';
import { type StepperListOption } from '../types/stepper-list-option';
import { useStepperOptions } from '../composables/use-stepper-options';

interface Props {
    activeStep: string | number;
}

const props = defineProps<Props>();

const { options } = useStepperOptions();
</script>

<template>
    <prime-step-list>
        <prime-step
            v-for="(step, index) in options"
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
                <prime-divider v-if="index + 1 !== options.length" />
            </div>
        </prime-step>
    </prime-step-list>
</template>
