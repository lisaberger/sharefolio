import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { createI18n } from 'vue-i18n';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

/**
 * Icons
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faMagnifyingGlass,
    faPlus,
    faRightFromBracket,
    faRightToBracket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import 'material-icons/iconfont/material-icons.css';

import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputText from 'primevue/inputtext';
import InputIcon from 'primevue/inputicon';
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Panel from 'primevue/panel';
import Password from 'primevue/password';
import Message from 'primevue/message';
import FileUpload from 'primevue/fileupload';
import Textarea from 'primevue/textarea';
import Menu from 'primevue/menu';
import AutoComplete from 'primevue/autocomplete';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import MegaMenu from 'primevue/megamenu';

import messages from '@intlify/unplugin-vue-i18n/messages';

import '@/assets/css/style.css';

const app = createApp(App);
const pinia = createPinia();
const i18n = createI18n({
    locale: 'de',
    fallbackLocale: 'en',
    legacy: false,
    messages,
});

app.use(router);
app.use(pinia);

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{indigo.50}',
            100: '{indigo.100}',
            200: '{indigo.200}',
            300: '{indigo.300}',
            400: '{indigo.400}',
            500: '{indigo.500}',
            600: '{indigo.600}',
            700: '{indigo.700}',
            800: '{indigo.800}',
            900: '{indigo.900}',
            950: '{indigo.950}',
        },
    },
});

app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            prefix: 'prime',
            darkModeSelector: 'system',
        },
    },
    ptOptions: {
        // mergeSections defines whether the sections from the main configuration gets added
        mergeSections: true,
        // mergeProps controls whether to override or merge the defined props
        mergeProps: false,
    },
    ripple: true,
});

app.use(i18n);

library.add(
    faMagnifyingGlass,
    faPlus,
    faRightToBracket,
    faUser,
    faRightFromBracket
);
app.component('font-awesome-icon', FontAwesomeIcon);

app.component('PrimeButton', Button);
app.component('PrimeCard', Card);
app.component('PrimeIconField', IconField);
app.component('PrimeInputText', InputText);
app.component('PrimeInputIcon', InputIcon);
app.component('PrimeAvatar', Avatar);
app.component('PrimeAvatarGroup', AvatarGroup);
app.component('PrimePanel', Panel);
app.component('PrimePassword', Password);
app.component('PrimeMessage', Message);
app.component('PrimeFileUpload', FileUpload);
app.component('PrimeTextArea', Textarea);
app.component('PrimeMenu', Menu);
app.component('PrimeAutoComplete', AutoComplete);
app.component('PrimeInputGroup', InputGroup);
app.component('PrimeInputGroupAddon', InputGroupAddon);
app.component('PrimeMegaMenu', MegaMenu);

app.mount('#app');
