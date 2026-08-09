import { beforeEach, describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import NavigationSearchbarComponent from '@ui/features/navigation/ui/components/navigation-searchbar-component.vue';
import { nextTick } from 'vue';
import projectMock from '@ui/test-utils/mocks/projectMock';
import type { Project } from '@core/project';
import type { AutoCompleteCompleteEvent } from 'primevue/autocomplete';

describe('NavigationSearchbarComponent', () => {
    type SearchbarInstance = InstanceType<
        typeof NavigationSearchbarComponent
    > & {
        suggestions?: Array<Project>;
        handleComplete: (event: AutoCompleteCompleteEvent) => void;
    };
    let wrapper: VueWrapper;

    type SearchbarProps = InstanceType<
        typeof NavigationSearchbarComponent
    >['$props'];

    const createComponent = (props: SearchbarProps) => {
        return mount(NavigationSearchbarComponent, {
            props,
            global: {
                stubs: ['font-awesome-icon'],
            },
        });
    };

    const getVm = (): SearchbarInstance =>
        wrapper.vm as unknown as SearchbarInstance;

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
        expect(getVm().suggestions).toEqual(suggestions);
    });

    it('emits complete event correctly', async () => {
        const input = wrapper.find('input');
        await input.setValue('Pro');
        await input.trigger('input');

        const completeEvent = {
            originalEvent: new Event('input'),
            query: 'Pro',
        };
        await getVm().handleComplete(completeEvent);

        await nextTick();

        expect(wrapper.emitted().complete).toBeTruthy();
        expect(wrapper.emitted().complete[0]).toEqual([completeEvent]);
    });
});
