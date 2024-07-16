<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { RouteName } from '@/router/enum/route';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@/i18n/validators/i18n-validators';
import logoComponent from '@/components/logo-component.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const username = ref('');
const password = ref('');

const rules = computed(() => ({
    username: {
        required,
        minLength: minLength(3),
    },
    password: {
        required,
    },
}));

const $v = useVuelidate(rules, { username, password });
console.log($v.value);

const login = async () => {
    try {
        const valid = await $v.value.$validate();

        if (valid) {
            alert('Form submitted');
        }
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <section>
        <prime-panel class="mt-10">
            <template #header>
                <div class="flex w-full flex-col items-center">
                    <logo-component :extended="false" class="my-2" />
                    <p class="mb-2 text-center text-sm">
                        {{ t('panel.description') }}
                    </p>
                </div>
            </template>
            <form @submit.prevent="login">
                <div class="mb-3 flex flex-col gap-2 text-sm">
                    <label for="username">{{ t('form.label.username') }}</label>
                    <prime-input-group>
                        <prime-input-group-addon>
                            <span class="material-icons">person</span>
                        </prime-input-group-addon>
                        <prime-input-text
                            id="username"
                            v-model="username"
                            aria-describedby="username-help"
                            :invalid="$v.username.$error"
                        />
                    </prime-input-group>
                    <small
                        v-for="error in $v.username.$errors"
                        :key="String(error.$uid)"
                        id="username-help"
                        class="text-red-500"
                    >
                        {{ error.$message }}
                    </small>
                </div>
                <div class="mb-4 flex flex-col gap-2 text-sm">
                    <label for="password">{{ t('form.label.password') }}</label>
                    <prime-input-group>
                        <prime-input-group-addon>
                            <span class="material-icons">lock</span>
                        </prime-input-group-addon>
                        <prime-password
                            id="password"
                            fluid
                            v-model="password"
                            toggleMask
                            :feedback="false"
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
                <p class="my-2 text-sm">{{ t('panel.forgotPassword') }}</p>
                <prime-button type="submit" label="Login" class="mt-2 w-full" />
            </form>
            <div class="mb-2 flex w-full flex-col items-center text-sm">
                <p class="mt-8">{{ t('panel.noProfile') }}</p>
                <p>
                    Dann
                    <router-link
                        :to="{ name: RouteName.Register }"
                        class="text-primary-500 underline"
                    >
                        registriere
                    </router-link>
                    dich kostenlos!
                </p>
            </div>
        </prime-panel>
    </section>
</template>

<i18n lang="yaml">
de:
    panel:
        description: Logge dich ein, um dein Sharefolio zu verwalten.
        forgotPassword: Passwort vergessen?
        noProfile: Noch kein Profil?
        doRegister: Dann registriere dich jetzt kostenlos.
    form:
        label:
            username: Benutzername
            password: Passwort
en:
    panel:
        description: Login to manage your Sharefolio.
        forgotPassword: Forgot your password?
        noProfile: No profile yet?
        doRegister: Register here.
    form:
        label:
            username: Username
            password: Password
</i18n>
