import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MainNavigationComponent from '@/components/main-navigation-component.vue';
import PrimeVue from 'primevue/config';

describe('MainNavigationComponent', () => {
    it('renders the component', () => {
        const wrapper = mount(MainNavigationComponent, {
            shallow: true,
            props: {
                userLoggedIn: false,
                currentUser: undefined,
            },
            global: {
                plugins: [PrimeVue],
                stubs: ['router-link', 'font-awesome-icon'],
            },
        });
        expect(wrapper).toBeTruthy();
    });
});