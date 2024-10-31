<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

type ContactForm = {
    firstname: string;
    lastname: string;
    email: string;
    location: string;
    job: string;
    description: string;
};

const contactForm = defineModel<ContactForm>('contact', { required: true });
</script>

<template>
    <prime-step-panel
        v-slot="{ activateCallback }"
        value="2"
        class="flex w-full flex-col items-center"
    >
        <form class="w-full max-w-md">
            <div class="mb-3 mt-8 flex flex-col gap-2 text-sm">
                <label for="firstname">{{ t('label.firstname') }}</label>
                <prime-input-group>
                    <prime-input-group-addon>
                        <span class="material-icons">person</span>
                    </prime-input-group-addon>
                    <prime-input-text
                        id="firstname"
                        v-model="contactForm.firstname"
                        aria-describedby="firstname-help"
                    />
                </prime-input-group>
            </div>
            <div class="mb-3 flex flex-col gap-2 text-sm">
                <label for="lastname">{{ t('label.lastname') }}</label>
                <prime-input-group>
                    <prime-input-group-addon>
                        <span class="material-icons">person</span>
                    </prime-input-group-addon>
                    <prime-input-text
                        id="lastname"
                        v-model="contactForm.lastname"
                        aria-describedby="lastname-help"
                    />
                </prime-input-group>
            </div>

            <div class="mb-3 flex flex-col gap-2 text-sm">
                <label for="email">{{ t('label.email') }}</label>
                <prime-input-group>
                    <prime-input-group-addon>
                        <span class="material-icons">email</span>
                    </prime-input-group-addon>
                    <prime-input-text
                        id="email"
                        v-model="contactForm.email"
                        aria-describedby="email-help"
                    />
                </prime-input-group>
            </div>
            <div class="mb-3 flex flex-col gap-2 text-sm">
                <label for="job">{{ t('label.job') }}</label>
                <prime-input-group>
                    <prime-input-group-addon>
                        <span class="material-icons">work</span>
                    </prime-input-group-addon>
                    <prime-input-text
                        id="job"
                        v-model="contactForm.job"
                        aria-describedby="job-help"
                    />
                </prime-input-group>
            </div>
            <div class="mb-3 flex flex-col gap-2 text-sm">
                <label for="location">{{ t('label.location') }}</label>
                <prime-input-group>
                    <prime-input-group-addon>
                        <span class="material-icons">location_on</span>
                    </prime-input-group-addon>
                    <prime-input-text
                        id="location"
                        v-model="contactForm.location"
                        aria-describedby="location-help"
                    />
                </prime-input-group>
            </div>
            <div class="mb-3 flex flex-col gap-2 text-sm">
                <label for="description">{{ t('label.description') }}</label>
                <prime-input-group>
                    <prime-input-group-addon>
                        <span class="material-icons">description</span>
                    </prime-input-group-addon>
                    <prime-textarea
                        id="description"
                        fluid
                        :row="3"
                        v-model="contactForm.description"
                        aria-describedby="description-help"
                    />
                </prime-input-group>
            </div>
            <div class="flex justify-between pt-6">
                <prime-button
                    severity="secondary"
                    @click="activateCallback('1')"
                >
                    <span class="material-icons text-sm">arrow_back</span>
                    {{ t('button.back') }}
                </prime-button>
                <prime-button @click="activateCallback('3')">
                    {{ t('button.next') }}
                    <span class="material-icons text-sm">arrow_forward</span>
                </prime-button>
            </div>
        </form>
    </prime-step-panel>
</template>

<i18n lang="yaml">
de:
    label:
        firstname: Vorname
        lastname: Nachname
        email: Email
        job: Jobbeschreibung
        location: Ort
        description: Beschreibung
    button:
        back: Zurück
        next: Weiter
en:
    label:
        firstname: Firstname
        lastname: Lastname
        email: Email
        job: Job description
        location: Location
        description: Description
    button:
        back: Back
        next: Next
</i18n>
