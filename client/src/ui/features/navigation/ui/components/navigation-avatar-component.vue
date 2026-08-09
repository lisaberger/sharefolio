<script setup lang="ts">
import type { User } from '@core/user';
import { RouteName } from '@ui/router/enums/route';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

interface Props {
    user: User;
}

const props = defineProps<Props>();

const router = useRouter();
const { t } = useI18n();

const menu = ref();
const menuVisible = ref(false);

const toggle = (event: Event): void => {
    menu.value.toggle(event);
};

const userMenuItems = computed(() => [
    {
        label: t('menu.profile'),
        icon: 'fa-solid fa-user',
        command: () => {
            router.push({ name: RouteName.Profile });
        },
    },
    {
        label: t('menu.logout'),
        icon: 'fa-solid fa-right-from-bracket',
        command: () => {
            emit('logout');
        },
    },
]);

const avatarImagePath = computed(() => props.user.image ?? undefined);

type Emits = {
    logout: [];
};
const emit = defineEmits<Emits>();
</script>

<template>
    <div
        class="hover:bg-primary-50 flex cursor-pointer items-center gap-2 rounded-full py-1 pl-2 pr-1 transition-colors"
        data-testid="profile-element"
        role="button"
        tabindex="0"
        aria-haspopup="true"
        aria-controls="options"
        :aria-expanded="menuVisible"
        @click="toggle"
        @keydown.enter="toggle"
        @keydown.space.prevent="toggle"
    >
        <div class="hidden text-right text-sm lg:block">
            <p class="text-surface-800 font-semibold leading-tight">
                {{ props.user.fullname }}
            </p>
            <p class="text-surface-400 text-xs leading-tight">
                @{{ props.user.username }}
            </p>
        </div>

        <prime-avatar
            v-if="props.user.image"
            data-testid="avatar-element"
            :image="avatarImagePath"
            shape="circle"
        />
        <prime-avatar
            v-else
            :label="props.user.initials || 'U'"
            shape="circle"
            style="background-color: #dee9fc; color: #1a2551"
        />
    </div>

    <prime-menu
        id="options"
        ref="menu"
        :model="userMenuItems"
        :popup="true"
        @show="menuVisible = true"
        @hide="menuVisible = false"
    >
        <template #start>
            <div class="border-surface-100 border-b px-5 py-3">
                <p class="text-surface-800 text-sm font-semibold">
                    {{ props.user.fullname }}
                </p>
                <p class="text-surface-400 text-xs">
                    {{ props.user.email }}
                </p>
            </div>
        </template>
        <template #itemicon="{ item }">
            <font-awesome-icon :icon="item.icon" class="mr-2" />
        </template>
    </prime-menu>
</template>

<i18n lang="yaml">
de:
    menu:
        profile: Profil
        logout: Abmelden
en:
    menu:
        profile: Profile
        logout: Sign out
</i18n>
