// tests/unit.setup.ts
import { config } from '@vue/test-utils';
import { PrimeComponents, PrimeDirectives } from './primevue-stubs';
import PrimeVue from 'primevue/config';

config.global.mocks = {
    $t: (tKey: any) => tKey, // just return translation key
};

config.global.stubs = PrimeComponents;
config.global.directives = PrimeDirectives;

config.global.plugins = [PrimeVue];
