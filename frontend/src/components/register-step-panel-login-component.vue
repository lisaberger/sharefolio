<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {
    required,
    minLength,
    sameAs,
    hasLowercase,
    hasNumeric,
    hasUppercase,
} from '@/i18n/validators/i18n-validators';
import TextInputFieldComponent from '@/components/shared/text-input-field-component.vue';
import PasswordInputFieldComponent from '@/components/shared/password-input-field-component.vue';

const { t } = useI18n();

type LoginForm = {
    username: string;
    password: string;
    passwordRepeat: string;
};

const loginForm = defineModel<LoginForm>('login', { required: true });
</script>

<template>
    <prime-step-panel
        v-slot="{ activateCallback }"
        value="1"
        class="flex w-full flex-col items-center"
    >
        <form class="mt-8 w-full max-w-md">
            <text-input-field-component
                id="username"
                field="username"
                icon="person"
                v-model:model-value="loginForm.username"
                :validators="{ required, minLength: minLength(3) }"
                :label="t('label.username')"
            />
            <password-input-field-component
                id="password"
                field="password"
                icon="lock"
                v-model:model-value="loginForm.password"
                :validators="{
                    required,
                    hasLowercase,
                    hasUppercase,
                    hasNumeric,
                    minLength: minLength(8),
                }"
                :label="t('label.password')"
            />
            <password-input-field-component
                id="passwordRepeat"
                field="passwordRepeat"
                icon="lock"
                :feedback="false"
                v-model:model-value="loginForm.passwordRepeat"
                :validators="{
                    required,
                    sameAs: sameAs(loginForm.password),
                }"
                :label="t('label.passwordRepeat')"
            />
        </form>
        <div class="flex justify-end pt-6">
            <prime-button label="Next" @click="activateCallback('2')">
                {{ t('button.next') }}
                <span class="material-icons text-sm">arrow_forward</span>
            </prime-button>
        </div>
    </prime-step-panel>
</template>

<i18n lang="yaml">
de:
    label:
        username: Benutzername
        password: Passwort
        passwordRepeat: Passwort wiederholen
    button:
        next: Weiter
en:
    label:
        username: Username
        password: Password
        passwordRepeat: Repeat password
    button:
        next: Next
</i18n>
