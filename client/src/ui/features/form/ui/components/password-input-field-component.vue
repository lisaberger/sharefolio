<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { useI18n } from 'vue-i18n';

interface Props {
    addon?: boolean;
    addonPos?: 'left' | 'right';
    icon?: string;
    id: string;
    field: string;
    label: string;
    feedback?: boolean;
    validators?: object;
}

const props = withDefaults(defineProps<Props>(), {
    addon: true,
    addonPos: 'left',
    icon: 'person',
    default: false,
    feedback: true,
});

const { t } = useI18n();

const modelValue = defineModel<string>();
const rules = {
    [props.field]: props.validators || {},
};

const $v = useVuelidate(
    rules,
    {
        [props.field]: modelValue,
    },
    {
        $lazy: true,
        $autoDirty: true,
    }
);

const validatorKeys = Object.keys(props.validators ? props.validators : {});
</script>

<template>
    <div class="mb-3 flex flex-col gap-2 text-sm">
        <label :for="props.id">{{ props.label }}</label>
        <prime-input-group>
            <prime-input-group-addon
                v-if="props.addon && props.addonPos === 'left'"
            >
                <slot name="icon-left">
                    <span class="material-icons">{{ props.icon }}</span>
                </slot>
            </prime-input-group-addon>
            <prime-password
                id="props.id"
                v-model="modelValue"
                fluid
                toggle-mask
                :feedback
                :prompt-label="t('label.prompt')"
                :weak-label="t('label.weak')"
                :medium-label="t('label.medium')"
                :strong-label="t('label.strong')"
                :invalid="$v[props.field].$error"
                @blur="$v[props.field].$touch"
            >
                <template #footer>
                    <prime-divider />
                    <ul class="my-0 text-sm leading-normal">
                        <li v-for="validator in validatorKeys" :key="validator">
                            <span
                                v-if="!$v[props.field][validator].$invalid"
                                class="material-icons text-sm"
                            >
                                check
                            </span>
                            {{ $v[props.field][validator].$message }}
                        </li>
                    </ul>
                </template>
            </prime-password>
            <prime-input-group-addon
                v-if="props.addon && props.addonPos === 'right'"
            >
                <slot name="icon-right">
                    <span class="material-icons">{{ props.icon }}</span>
                </slot>
            </prime-input-group-addon>
        </prime-input-group>
        <template v-if="!feedback && $v[props.field].$error">
            <small
                v-for="error in $v[props.field].$errors"
                :id="`${props.id}-help`"
                :key="error.$uid"
                class="text-red-500"
            >
                {{ error.$message }}
            </small>
        </template>
        <template v-if="feedback && $v[props.field].$error">
            <small :id="`${props.id}-help`" class="text-red-500">
                {{ t('passwordHint') }}
            </small>
        </template>
    </div>
</template>

<i18n lang="yaml">
de:
    label:
        prompt: Wähle ein Passwort
        weak: Zu einfach
        medium: Durchschnittlich komplex
        strong: Sehr komplex
    passwordHint: Passwort erfüllt nicht die Voraussetzungen
en:
    label:
        prompt: Choose a password
        weak: Too simple
        medium: Average complexity
        strong: Complex password
    passwordHint: Password does not fulfill the requirements
</i18n>
