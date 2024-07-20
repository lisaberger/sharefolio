import * as validators from '@vuelidate/validators';
import * as customValidators from '@/i18n/validators/custom-validators';
import { i18n } from '@/i18n/i18n';

const { createI18nMessage } = validators;
// Create your i18n message instance. Used for vue-i18n@9
const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) });

/**
 * EXtend build in validators with i18n messages
 */

// wrap each validator.
export const required = withI18nMessage(validators.required);

// validators that expect a parameter should have `{ withArguments: true }` passed as a second parameter, to annotate they should be wrapped
export const minLength = withI18nMessage(validators.minLength, {
    withArguments: true,
});

// or you can provide the param at definition, statically
export const maxLength = withI18nMessage(validators.maxLength, {
    withArguments: true,
});

export const sameAs = withI18nMessage(validators.sameAs, {
    withArguments: true,
});

/**
 * EXtend custom validators with i18n messages
 */
export const hasLowercase = withI18nMessage(customValidators.hasLowercase);
export const hasNumeric = withI18nMessage(customValidators.hasNumeric);
export const hasUppercase = withI18nMessage(customValidators.hasUppercase);
