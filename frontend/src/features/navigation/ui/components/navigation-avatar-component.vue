<script setup lang="ts">
import type User from '@/models/user';
import { RouteName } from '@/router/enums/route';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

interface Props {
    user: User;
}

const props = defineProps<Props>();

const router = useRouter();
const { t } = useI18n();

const menu = ref();

const toggle = (event: MouseEvent): void => {
    menu.value.toggle(event);
};

const userMenuItems = ref([
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

const avatarImagePath = computed(() => {
    if (props.user.image) {
        return 'http://localhost:3000/' + props.user.image;
    }

    return undefined;
});

type Emits = {
    logout: [];
};
const emit = defineEmits<Emits>();
</script>

<template>
    <div
        class="flex items-center hover:cursor-pointer"
        data-testid="profile-element"
        aria-haspopup="true"
        aria-controls="options"
        @click="toggle"
    >
        <div class="mr-3 hidden text-right text-sm md:block">
            <p>{{ props.user?.fullname }}</p>
            <p class="text-xs">{{ props.user?.username }}</p>
        </div>
        <prime-avatar
            v-if="user.image"
            data-testid="avatar-element"
            :image="avatarImagePath"
            shape="circle"
        />
        <prime-avatar
            v-else
            :label="user.initials || 'U'"
            shape="circle"
            style="background-color: #dee9fc; color: #1a2551"
        />

        <prime-menu
            ref="menu"
            id="options"
            :model="userMenuItems"
            :popup="true"
        >
            <template #itemicon="{ item }">
                <font-awesome-icon :icon="item.icon" class="mr-2" />
            </template>
        </prime-menu>
    </div>
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
