import { mount, VueWrapper } from '@vue/test-utils';
import NavigationSearchbarComponent from '@/features/navigation/ui/components/navigation-searchbar-component.vue'; // Adjust the path as needed
import { nextTick } from 'vue';
import projectMock from '../../utils/test-utils/mocks/projectMock';
import type Project from '@/models/project';

describe('NavigationSearchbarComponent', () => {
    let wrapper: VueWrapper<any>;

    const createComponent = (props: any) => {
        return mount(NavigationSearchbarComponent, {
            shallow: true,
            props,
            global: {
                stubs: ['font-awesome-icon'],
            },
        });
    };

    let suggestions: Project[];

    beforeEach(() => {
        suggestions = [
            { ...projectMock, name: 'Project One' },
            { ...projectMock, name: 'Project Two' },
        ];
        wrapper = createComponent({ suggestions });
    });

    it('renders the component correctly with props', () => {
        expect(wrapper.find('input').exists()).toBe(true);
        expect(wrapper.vm.suggestions).toEqual(suggestions);
    });

    it('emits complete event correctly', async () => {
        const input = wrapper.find('input');
        await input.setValue('Pro');
        await input.trigger('input');

        const completeEvent = { query: 'Pro' };
        await wrapper.vm.handleComplete(completeEvent);

        await nextTick();

        expect(wrapper.emitted().complete).toBeTruthy();
        expect(wrapper.emitted().complete[0]).toEqual([completeEvent]);
    });
});
