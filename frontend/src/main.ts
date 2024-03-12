import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Panel from 'primevue/panel';
import Lara from '@/presets/lara';

const app = createApp(App);
const pinia = createPinia();

import '@/assets/css/style.css';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputText from 'primevue/inputtext';
import InputIcon from 'primevue/inputicon';

app.use(router);
app.use(pinia);

app.use(PrimeVue, {
    unstyled: true,
    pt: Lara,
});

app.component('PrimeButton', Button);
app.component('PrimeIconField', IconField);
app.component('PrimeInputText', InputText);
app.component('PrimeInputIcon', InputIcon);

app.mount('#app');
