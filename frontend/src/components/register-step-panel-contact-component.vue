<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const firstname = ref('');
const lastname = ref('');
const email = ref('');
const location = ref('');
const job = ref('');
const description = ref('');
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
                        v-model="firstname"
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
                        v-model="lastname"
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
                        v-model="email"
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
                        v-model="job"
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
                        v-model="location"
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
                <prime-button label="Next" @click="activateCallback('3')" />
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
en:
    label:
        firstname: Firstname
        lastname: Lastname
        email: Email
        job: Job description
        location: Location
        description: Description
</i18n>
