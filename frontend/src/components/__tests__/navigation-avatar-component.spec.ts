import router from '@/router';
import { VueWrapper, mount } from '@vue/test-utils';
import NavigationAvatarComponent from '@/components/navigation-avatar-component.vue';
import mockUser from '@/utils/test-utils/mocks/userMock';

const mockRouter = {
    push: vi.fn(),
};

describe('NavigationAvatarComponent', () => {
    let wrapper: VueWrapper;

    const createComponent = (props: any) => {
        return mount(NavigationAvatarComponent, {
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

    beforeEach(() => {
        wrapper = createComponent({
            user: mockUser,
        });
    });

    it('should render the component', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should display the user avatar', () => {
        const userAvatar = wrapper.find('[data-testid=avatar-element]');
        expect(userAvatar.exists()).toBe(true);
    });

    describe('user has a profile picture', () => {
        it.skip('should render the user image as avatar', () => {
            const userAvatar = wrapper.find('[data-testid="avatar-element"]');
            const avatarImage = userAvatar.attributes('image');
            expect(avatarImage).toBe('http://localhost:3000/avatar.jpg');
        });
    });

    describe('user has no profile picture', () => {
        it.skip('should render the fallback avatar with user initials', () => {
            const userAvatar = wrapper.find('[data-testid="avatar-element"]');
            const avatarLabel = userAvatar.attributes('label');
            expect(avatarLabel).toBe('JD');
        });
    });
});
