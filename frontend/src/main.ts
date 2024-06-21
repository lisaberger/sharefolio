import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { createI18n } from 'vue-i18n';

import Lara from '@/theme';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';

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

app.use(PrimeVue, {
    unstyled: true,
    pt: Lara,
});

app.use(i18n);

library.add(faMagnifyingGlass, faPlus);
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

app.mount('#app');
