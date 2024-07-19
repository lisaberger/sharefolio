<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import useVuelidate from '@vuelidate/core';
import { required, minLength, sameAs } from '@/i18n/validators/i18n-validators';
import TextInputFieldComponent from '@/components/shared/text-input-field-component.vue';

const { t } = useI18n();

const username = ref('');
const password = ref('');
const passwordRepeat = ref('');

const rules = computed(() => ({
    password: {
        required,
    },
    passwordRepeat: {
        required,
        sameAs: sameAs(password),
    },
}));

const $v = useVuelidate(
    rules,
    { passwordRepeat, password },
    { $lazy: true, $autoDirty: true }
);
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
                v-model:model-value="username"
                :validators="{ required, minLength: minLength(3) }"
                :label="t('label.username')"
            />
            <div class="mb-4 flex flex-col gap-2 text-sm">
                <label for="password">{{ t('label.password') }}</label>
                <prime-input-group>
                    <prime-input-group-addon>
                        <span class="material-icons">lock</span>
                    </prime-input-group-addon>
                    <prime-password
                        id="password"
                        v-model="password"
                        fluid
                        toggleMask
                        :invalid="$v.password.$error"
                    />
                </prime-input-group>
                <small
                    v-for="error in $v.password.$errors"
                    :key="error.$uid"
                    id="username-help"
                    class="text-red-500"
                >
                    {{ error.$message }}
                </small>
            </div>
            <div class="mb-4 flex flex-col gap-2 text-sm">
                <label for="passwordRepeat">{{
                    t('label.passwordRepeat')
                }}</label>
                <prime-input-group>
                    <prime-input-group-addon>
                        <span class="material-icons">lock</span>
                    </prime-input-group-addon>
                    <prime-password
                        id="passwordRepeat"
                        v-model="passwordRepeat"
                        fluid
                        toggleMask
                        :feedback="false"
                        :invalid="$v.passwordRepeat.$error"
                    />
                </prime-input-group>
                <small
                    v-for="error in $v.passwordRepeat.$errors"
                    :key="error.$uid"
                    id="username-help"
                    class="text-red-500"
                >
                    {{ error.$message }}
                </small>
            </div>
        </form>
        <div class="flex justify-end pt-6">
            <prime-button label="Next" @click="activateCallback('2')" />
        </div>
    </prime-step-panel>
</template>

<i18n lang="yaml">
de:
    label:
        username: Benutzername
        password: Passwort
        passwordRepeat: Passwort wiederholen
en:
    label:
        username: Username
        password: Password
        passwordRepeat: Repeat password
</i18n>
