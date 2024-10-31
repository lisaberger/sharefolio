import { ref } from 'vue';
import type { StepperListOption } from '../types/stepper-list-option';
import { useI18n } from 'vue-i18n';

interface useStepperOptionsReturn {
    options: Array<StepperListOption>;
}

export function useStepperOptions(): useStepperOptionsReturn {
    const { t } = useI18n({
        useScope: 'global',
        messages: {
            en: {
                options: {
                    login: 'Login information',
                    contact: 'Profile information',
                    profileImage: 'Profile image',
                    done: 'Done',
                },
            },
            de: {
                options: {
                    login: 'Anmeldedaten',
                    contact: 'Kontaktdaten',
                    profileImage: 'Profilbild',
                    done: 'Fertig',
                },
            },
        },
    });

    const stepperOptions = ref<Array<StepperListOption>>([
        {
            name: t('options.login'),
            value: '1',
            icon: 'lock',
        },
        {
            name: t('options.contact'),
            value: '2',
            icon: 'person',
        },
        {
            name: t('options.profileImage'),
            value: '3',
            icon: 'image',
        },
        {
            name: t('options.done'),
            value: '4',
            icon: 'check',
        },
    ]);

    return {
        options: stepperOptions.value,
    };
}
