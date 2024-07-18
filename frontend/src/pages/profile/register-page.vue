<script setup lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import logoComponent from '@/components/logo-component.vue';
import { useI18n } from 'vue-i18n';
import { minLength, required } from '@/i18n/validators/i18n-validators';
import useVuelidate from '@vuelidate/core';

/* Define props */
const router = useRouter();

/* submit */
const submit = () => {
    /* append file and set name */
    const fd = new FormData();
    let tempFileName = '';
    if (file.value) {
        tempFileName =
            new Date().toISOString().replace(/:/g, '-') + file.value.name;
        fd.append('profilePic', file.value, tempFileName);
    } else {
        tempFileName = 'avatar_placeholder.png';
    }

    axios.post('http://localhost:4000/users/create', fd).then(async (res) => {
        /* redirect to login */
        await router.push({ path: '/login' });
    });
};

const activeStep = ref('1');

const { t } = useI18n();

const username = ref('');
const password = ref('');
const passwordRepeat = ref('');

const firstname = ref('');
const lastname = ref('');
const email = ref('');
const location = ref('');
const job = ref('');
const description = ref('');
const profileImage = ref('');

const rules = computed(() => ({
    username: {
        required,
        minLength: minLength(3),
    },
    password: {
        required,
    },
    passwordRepeat: {
        required,
    },
}));

const $v = useVuelidate(rules, { password, passwordRepeat, username });
</script>

<template>
    <section class="mt-8">
        <prime-panel>
            <template #header>
                <div class="flex w-full flex-col items-center">
                    <logo-component :extended="false" class="my-2" />
                    <p class="mb-2 text-center text-sm">
                        {{ t('panel.description') }}
                    </p>
                </div>
            </template>
            <prime-stepper v-model:value="activeStep" class="md:mx-8">
                <prime-step-list>
                    <prime-step
                        v-slot="{ activateCallback, value, a11yAttrs }"
                        asChild
                        value="1"
                    >
                        <div
                            class="mr-2 flex flex-auto flex-row items-center gap-2"
                            v-bind="a11yAttrs.root"
                        >
                            <button
                                class="inline-flex flex-col gap-2 border-0 bg-transparent"
                                @click="activateCallback('2')"
                                v-bind="a11yAttrs.header"
                            >
                                <span
                                    :class="[
                                        'inline-flex h-8 w-8 items-center justify-center rounded border-2',
                                        {
                                            'bg-primary text-primary border-primary':
                                                value <= activeStep,
                                            'border-surface-200 dark:border-surface-700':
                                                value > activeStep,
                                        },
                                    ]"
                                >
                                    <span class="material-icons">lock</span>
                                </span>
                            </button>
                            <span class="hidden text-sm font-medium md:block">
                                Anmeldedaten
                            </span>
                            <prime-divider />
                        </div>
                    </prime-step>
                    <prime-step
                        v-slot="{ activateCallback, value, a11yAttrs }"
                        asChild
                        value="2"
                    >
                        <div
                            class="mr-2 flex flex-auto flex-row items-center gap-2"
                            v-bind="a11yAttrs.root"
                        >
                            <button
                                class="inline-flex flex-col gap-2 border-0 bg-transparent"
                                @click="activateCallback('3')"
                                v-bind="a11yAttrs.header"
                            >
                                <span
                                    :class="[
                                        'inline-flex h-8 w-8 items-center justify-center rounded border-2',
                                        {
                                            'bg-primary text-primary border-primary':
                                                value <= activeStep,
                                            'border-surface-200 dark:border-surface-700':
                                                value > activeStep,
                                        },
                                    ]"
                                >
                                    <span class="material-icons">person</span>
                                </span>
                            </button>
                            <span class="hidden text-sm font-medium md:block">
                                Kontaktdaten
                            </span>
                            <prime-divider class="mr-2" />
                        </div>
                    </prime-step>
                    <prime-step
                        v-slot="{ activateCallback, value, a11yAttrs }"
                        asChild
                        value="3"
                    >
                        <div
                            class="mr-2 flex flex-auto flex-row items-center gap-2"
                            v-bind="a11yAttrs.root"
                        >
                            <button
                                class="inline-flex flex-col gap-2 border-0 bg-transparent"
                                @click="activateCallback"
                                v-bind="a11yAttrs.header"
                            >
                                <span
                                    :class="[
                                        'inline-flex h-8 w-8 items-center justify-center rounded border-2',
                                        {
                                            'bg-primary text-primary border-primary':
                                                value <= activeStep,
                                            'border-surface-200 dark:border-surface-700':
                                                value > activeStep,
                                        },
                                    ]"
                                >
                                    <span class="material-icons">image</span>
                                </span>
                            </button>
                            <span class="hidden text-sm font-medium md:block"
                                >Profilbild</span
                            >
                            <prime-divider class="mr-2" />
                        </div>
                    </prime-step>
                    <prime-step
                        v-slot="{ activateCallback, value, a11yAttrs }"
                        asChild
                        value="4"
                    >
                        <div
                            class="flex flex-row items-center gap-2"
                            v-bind="a11yAttrs.root"
                        >
                            <button
                                class="inline-flex flex-col gap-2 border-0 bg-transparent"
                                @click="activateCallback"
                                v-bind="a11yAttrs.header"
                            >
                                <span
                                    :class="[
                                        'inline-flex h-8 w-8 items-center justify-center rounded border-2',
                                        {
                                            'bg-primary text-primary border-primary':
                                                value <= activeStep,
                                            'border-surface-200 dark:border-surface-700':
                                                value > activeStep,
                                        },
                                    ]"
                                >
                                    <span class="material-icons">check</span>
                                </span>
                            </button>
                            <span class="hidden text-sm font-medium md:block"
                                >Fertig</span
                            >
                        </div>
                    </prime-step>
                </prime-step-list>
                <prime-step-panels>
                    <prime-step-panel
                        v-slot="{ activateCallback, value }"
                        value="1"
                        class="flex w-full flex-col items-center"
                    >
                        <form class="mt-8 w-full max-w-md">
                            <div class="mb-3 flex flex-col gap-2 text-sm">
                                <label for="username">{{
                                    t('form.label.username')
                                }}</label>
                                <prime-input-group>
                                    <prime-input-group-addon>
                                        <span class="material-icons"
                                            >person</span
                                        >
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
                                <label for="password">{{
                                    t('form.label.password')
                                }}</label>
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
                                    t('form.label.passwordRepeat')
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
                            <prime-button
                                label="Next"
                                @click="activateCallback('2')"
                            />
                        </div>
                    </prime-step-panel>
                    <prime-step-panel
                        v-slot="{ activateCallback }"
                        value="2"
                        class="flex w-full flex-col items-center"
                    >
                        <form class="w-full max-w-md">
                            <div class="mb-3 mt-8 flex flex-col gap-2 text-sm">
                                <label for="firstname">{{
                                    t('form.label.firstname')
                                }}</label>
                                <prime-input-group>
                                    <prime-input-group-addon>
                                        <span class="material-icons"
                                            >person</span
                                        >
                                    </prime-input-group-addon>
                                    <prime-input-text
                                        id="firstname"
                                        v-model="firstname"
                                        aria-describedby="firstname-help"
                                    />
                                </prime-input-group>
                            </div>
                            <div class="mb-3 flex flex-col gap-2 text-sm">
                                <label for="lastname">{{
                                    t('form.label.lastname')
                                }}</label>
                                <prime-input-group>
                                    <prime-input-group-addon>
                                        <span class="material-icons"
                                            >person</span
                                        >
                                    </prime-input-group-addon>
                                    <prime-input-text
                                        id="lastname"
                                        v-model="lastname"
                                        aria-describedby="lastname-help"
                                    />
                                </prime-input-group>
                            </div>

                            <div class="mb-3 flex flex-col gap-2 text-sm">
                                <label for="email">{{
                                    t('form.label.email')
                                }}</label>
                                <prime-input-group>
                                    <prime-input-group-addon>
                                        <span class="material-icons"
                                            >email</span
                                        >
                                    </prime-input-group-addon>
                                    <prime-input-text
                                        id="email"
                                        v-model="email"
                                        aria-describedby="email-help"
                                    />
                                </prime-input-group>
                            </div>
                            <div class="mb-3 flex flex-col gap-2 text-sm">
                                <label for="job">{{
                                    t('form.label.job')
                                }}</label>
                                <prime-input-group>
                                    <prime-input-group-addon>
                                        <span class="material-icons">work</span>
                                    </prime-input-group-addon>
                                    <prime-input-text
                                        id="job"
                                        v-model="job"
                                        aria-describedby="job-help"
                                    />
                                </prime-input-group>
                            </div>
                            <div class="mb-3 flex flex-col gap-2 text-sm">
                                <label for="location">{{
                                    t('form.label.location')
                                }}</label>
                                <prime-input-group>
                                    <prime-input-group-addon>
                                        <span class="material-icons"
                                            >location_on</span
                                        >
                                    </prime-input-group-addon>
                                    <prime-input-text
                                        id="location"
                                        v-model="location"
                                        aria-describedby="location-help"
                                    />
                                </prime-input-group>
                            </div>
                            <div class="mb-3 flex flex-col gap-2 text-sm">
                                <label for="description">{{
                                    t('form.label.description')
                                }}</label>
                                <prime-input-group>
                                    <prime-input-group-addon>
                                        <span class="material-icons"
                                            >description</span
                                        >
                                    </prime-input-group-addon>
                                    <prime-textarea
                                        id="description"
                                        fluid
                                        :row="3"
                                        v-model="description"
                                        aria-describedby="description-help"
                                    />
                                </prime-input-group>
                            </div>
                            <div class="flex justify-between pt-6">
                                <prime-button
                                    label="Back"
                                    severity="secondary"
                                    @click="activateCallback('1')"
                                />
                                <prime-button
                                    label="Next"
                                    @click="activateCallback('3')"
                                />
                            </div>
                        </form>
                    </prime-step-panel>
                    <prime-step-panel
                        v-slot="{ activateCallback }"
                        value="3"
                        class="flex w-full flex-col items-center"
                    >
                        <div class="mt-8 w-full max-w-md">
                            <prime-file-upload
                                name="avatar"
                                :show-upload-button="false"
                                :show-cancel-button="false"
                                @select="console.log('select', $event)"
                                :multiple="false"
                                accept="image/*"
                                :maxFileSize="1000000"
                            >
                                <template #empty>
                                    <div
                                        class="flex flex-col items-center justify-center"
                                    >
                                        <span
                                            class="material-icons text-4xl font-light"
                                            >face</span
                                        >
                                        <p class="text-sm">
                                            {{ t('form.fileUpload.empty') }}
                                        </p>
                                    </div>
                                </template>
                            </prime-file-upload>
                            <div class="flex w-full justify-between pt-6">
                                <prime-button
                                    label="Back"
                                    severity="secondary"
                                    @click="activateCallback('2')"
                                />
                                <prime-button
                                    label="Next"
                                    @click="activateCallback('4')"
                                />
                            </div>
                        </div>
                    </prime-step-panel>
                    <prime-step-panel
                        v-slot="{ activateCallback }"
                        value="4"
                        class="flex w-full flex-col items-center"
                    >
                        <div class="mt-8 w-full md:w-2/3"></div>
                        <div class="flex justify-between pt-6">
                            <prime-button
                                label="cancel"
                                severity="secondary"
                                icon="pi pi-arrow-left"
                                @click="activateCallback('2')"
                            />
                            <prime-button
                                :label="t('button.submit')"
                                severity="primary"
                                icon-pos="right"
                                @click="submit"
                            >
                                <template #icon>
                                    <span class="material-icons">
                                        arrow_right
                                    </span>
                                </template>
                            </prime-button>
                        </div>
                    </prime-step-panel>
                </prime-step-panels>
            </prime-stepper>

            <p class="mb-2 mt-4 text-sm">
                {{ t('panel.loginHint') }}
            </p>
        </prime-panel>
    </section>
</template>

<i18n lang="yaml">
de:
    panel:
        description: Erstelle ein eigenes Profil und teile dein Portfolio.
        loginHint: Du hast bereits ein Profil bei Sharefolio? Dann logge dich hier ein!
    stepper:
        authInformation: Anmeldedaten
        profileInformation: Profilangaben
        profileImage: Profilbild
    button:
        submit: Profil hinzufügen
    form:
        label:
            username: Benutzername
            password: Passwort
            passwordRepeat: Passwort wiederholen
            firstname: Vorname
            lastname: Nachname
            email: Email
            job: Jobbeschreibung
            location: Ort
            description: Beschreibung
        fileUpload:
            empty: Lade ein Profilbild.
en:
    panel:
        description: Create your own profile and showcase your portfolio.
        loginHint: Already have a Sharefolio profile? Sign in here!
    stepper:
        authInformation: Login information
        profileInformation: Profile information
        profileImage: Profile image
    button:
        submit: Submit profile
    form:
        label:
            username: Username
            password: Password
            passwordRepeat: Repeat password
            firstname: Firstname
            lastname: Lastname
            email: Email
            job: Job description
            location: Location
            description: Description
        fileUpload:
            empty: Drag and drop a profile image here.
</i18n>
