<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { RouteName } from '@ui/router/enums/route';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@ui/i18n/validators/i18n-validators';
import logoComponent from '@ui/features/common/ui/component/logo-component.vue';
import { useI18n } from 'vue-i18n';
import Cookies from 'js-cookie';
import { authRepository } from '@config';

const { t } = useI18n();
const router = useRouter();

const username = ref('');
const password = ref('');
const errorMessage = ref('');

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

const login = async (): Promise<void> => {
    const valid = await $v.value.$validate();

    if (!valid) {
        return;
    }

    const result = await authRepository.login({
        username: username.value,
        password: password.value,
    });

    if (result.data) {
        Cookies.set('isLoggedIn', result.data.id);
        await router.push({ name: RouteName.Home });
        return;
    }

    errorMessage.value = result.error.message;
};
</script>

<template>
    <section class="flex flex-col items-center px-4 py-16 md:py-24">
        <div
            class="border-surface-200 w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm md:p-10"
        >
            <div class="mb-8 flex flex-col items-center text-center">
                <logo-component :extended="false" class="mb-4" />
                <h1
                    class="text-surface-900 text-2xl font-extrabold tracking-tight"
                >
                    {{ t('panel.title') }}
                </h1>
                <p class="text-surface-500 mt-2 text-sm">
                    {{ t('panel.description') }}
                </p>
            </div>

            <form class="space-y-5" @submit.prevent="login">
                <div class="flex flex-col gap-2 text-sm">
                    <label for="username" class="text-surface-700 font-medium">
                        {{ t('form.label.username') }}
                    </label>
                    <prime-input-group>
                        <prime-input-group-addon>
                            <span class="material-icons text-surface-400">
                                person
                            </span>
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
                        id="username-help"
                        :key="String(error.$uid)"
                        class="text-red-500"
                    >
                        {{ error.$message }}
                    </small>
                </div>

                <div class="flex flex-col gap-2 text-sm">
                    <label for="password" class="text-surface-700 font-medium">
                        {{ t('form.label.password') }}
                    </label>
                    <prime-input-group>
                        <prime-input-group-addon>
                            <span class="material-icons text-surface-400">
                                lock
                            </span>
                        </prime-input-group-addon>
                        <prime-password
                            id="password"
                            v-model="password"
                            fluid
                            toggle-mask
                            :feedback="false"
                            :invalid="$v.password.$error"
                        />
                    </prime-input-group>
                    <small
                        v-for="error in $v.password.$errors"
                        id="password-help"
                        :key="error.$uid"
                        class="text-red-500"
                    >
                        {{ error.$message }}
                    </small>
                </div>

                <div class="flex items-center justify-between text-sm">
                    <p class="text-surface-500">
                        {{ t('panel.forgotPassword') }}
                    </p>
                </div>

                <prime-message
                    v-if="errorMessage"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="w-full"
                >
                    {{ errorMessage }}
                </prime-message>

                <prime-button
                    type="submit"
                    :label="t('panel.submit')"
                    icon-pos="right"
                    class="w-full"
                >
                    <template #icon>
                        <span class="material-icons text-base"
                            >arrow_forward</span
                        >
                    </template>
                </prime-button>
            </form>

            <div
                class="border-surface-100 mt-8 border-t pt-6 text-center text-sm"
            >
                <p class="text-surface-600">
                    {{ t('panel.noProfile') }}
                    <router-link
                        :to="{ name: RouteName.Register }"
                        class="text-primary-600 font-semibold hover:underline"
                    >
                        {{ t('panel.doRegister') }}
                    </router-link>
                </p>
            </div>
        </div>
    </section>
</template>

<i18n lang="yaml">
de:
    panel:
        title: Willkommen zurück
        description: Logge dich ein, um dein Sharefolio zu verwalten.
        forgotPassword: Passwort vergessen?
        noProfile: Noch kein Profil?
        doRegister: Jetzt kostenlos registrieren.
        submit: Anmelden
    form:
        label:
            username: Benutzername
            password: Passwort
en:
    panel:
        title: Welcome back
        description: Login to manage your Sharefolio.
        forgotPassword: Forgot your password?
        noProfile: No profile yet?
        doRegister: Register for free.
        submit: Sign in
    form:
        label:
            username: Username
            password: Password
</i18n>
