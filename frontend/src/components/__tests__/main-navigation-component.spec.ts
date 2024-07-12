import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import MainNavigationComponent from '@/components/main-navigation-component.vue';
import { mockUser } from './__mocks__/userMock';
import router from '@/router';

const mockRouter = {
    push: vi.fn(),
};

describe('MainNavigationComponent', () => {
    let wrapper: VueWrapper;

    const createComponent = (props: any) => {
        return mount(MainNavigationComponent, {
            shallow: true,
            props,
            global: {
                stubs: ['router-link', 'font-awesome-icon'],
                mocks: {
                    router: mockRouter,
                },
                plugins: [router],
            },
            router: mockRouter,
        });
    };

    it('should render the component', () => {
        wrapper = createComponent({
            userLoggedIn: false,
            currentUser: undefined,
        });
        expect(wrapper.exists()).toBe(true);
    });

    describe('when user is not authenticated', () => {
        beforeEach(() => {
            wrapper = createComponent({
                userLoggedIn: false,
                currentUser: undefined,
            });
        });

        it('should display the register button', () => {
            const registerButton = wrapper.find(
                '[data-testid=register-button]'
            );
            expect(registerButton.exists()).toBe(true);
        });

        it('should display the login button', () => {
            const loginButton = wrapper.find('[data-testid=login-button]');
            expect(loginButton.exists()).toBe(true);
        });

        it('should not display the profile element', () => {
            const profileElement = wrapper.find(
                '[data-testid=profile-element]'
            );
            expect(profileElement.exists()).toBe(false);
        });
    });

    describe('when user is authenticated', () => {
        beforeEach(() => {
            wrapper = createComponent({
                userLoggedIn: true,
                currentUser: mockUser,
            });
        });
        it('should NOT display the register button', () => {
            const registerButton = wrapper.find(
                '[data-testid=register-button]'
            );
            expect(registerButton.exists()).toBe(false);
        });

        it('should NOT display the login button', () => {
            const loginButton = wrapper.find('[data-testid=login-button]');
            expect(loginButton.exists()).toBe(false);
        });

        describe('profile element', () => {
            it('should display the profile element', () => {
                const profileElement = wrapper.find(
                    '[data-testid=profile-element]'
                );
                expect(profileElement.exists()).toBe(true);
            });

            it('should display the user avatar', () => {
                const userAvatar = wrapper.find('[data-testid=avatar-element]');
                expect(userAvatar.exists()).toBe(true);
            });

            it.skip('should display the user image as avatar', () => {
                const userAvatar = wrapper.find(
                    '[data-testid="avatar-element"]'
                );
                const avatarImage = userAvatar.attributes('image');
                expect(avatarImage).toBe('http://localhost:3000/avatar.jpg');
            });
        });
    });
});
