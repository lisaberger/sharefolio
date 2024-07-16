import messages from '@intlify/unplugin-vue-i18n/messages';
import { createI18n } from 'vue-i18n';
import { validationMessages } from './validators/validation-messages';

export const i18n = createI18n({
    locale: 'de',
    fallbackLocale: 'en',
    legacy: false,
    messages: validationMessages,
});
