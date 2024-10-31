import { hasLowercase, hasNumeric, hasUppercase } from './custom-validators';

export const validationMessages = {
    de: {
        validations: {
            required: 'Dieses Feld ist erforderlich.',
            minLength: `Bitte geben Sie mindestens {min} Zeichen ein.`,
            sameAs: 'Passwörter stimmen nicht überein',
            hasLowercase: 'Mindestens ein Kleinbuchstabe',
            hasUppercase: 'Mindestens ein Großbuchstabe',
            hasNumeric: 'Mindestens eine Zahl',
        },
    },
    en: {
        validations: {
            required: 'This field is required.',
            minLength: `Please enter at least {min} characters.`,
            sameAs: 'Passwords do not match',
            hasLowercase: 'At least one lowercase',
            hasUppercase: 'At least one uppercase',
            hasNumeric: 'At least one numeric',
        },
    },
};
