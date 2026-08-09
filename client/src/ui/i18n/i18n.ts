import messages from '@intlify/unplugin-vue-i18n/messages';
import { createI18n } from 'vue-i18n';
import { validationMessages } from './validators/validation-messages';

const localeMessages = (locale: 'de' | 'en') => ({
    ...((messages ?? {})[locale] ?? {}),
    ...(validationMessages[locale] ?? {}),
});

export const i18n = createI18n({
    locale: 'de',
    fallbackLocale: 'en',
    legacy: false,
    messages: {
        de: localeMessages('de'),
        en: localeMessages('en'),
    },
});
