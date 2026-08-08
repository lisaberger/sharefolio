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
                        id="username-help"
                        :key="String(error.$uid)"
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
                            v-model="password"
                            fluid
                            toggle-mask
                            :feedback="false"
                            :invalid="$v.password.$error"
                        />
                    </prime-input-group>
                    <small
                        v-for="error in $v.password.$errors"
                        id="username-help"
                        :key="error.$uid"
                        class="text-red-500"
                    >
                        {{ error.$message }}
                    </small>
                </div>
                <p class="my-2 text-sm">{{ t('panel.forgotPassword') }}</p>
                <prime-message
                    v-if="errorMessage"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="w-full"
                >
                    {{ errorMessage }}
                </prime-message>
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
