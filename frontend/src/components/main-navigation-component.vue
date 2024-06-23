<script setup lang="ts">
import LogoComponent from '@/components/logo-component.vue';
import User from '@/models/user';

interface Props {
    userLoggedIn: boolean;
    currentUser?: User;
}

const props = defineProps<Props>();

type Emits = {
    logout: [];
};

const emit = defineEmits<Emits>();
</script>

<template>
    <nav class="border-b-2 border-gray-100 bg-white px-4 py-2">
        <ul class="flex items-center justify-between">
            <li>
                <router-link :to="{ name: 'Home' }">
                    <logo-component />
                </router-link>
            </li>
            <li>
                <prime-icon-field icon-position="left">
                    <prime-input-icon>
                        <font-awesome-icon
                            :icon="['fas', 'magnifying-glass']"
                        />
                    </prime-input-icon>
                    <prime-input-text placeholder="Search" />
                </prime-icon-field>
            </li>
            <li>
                <div v-if="!props.userLoggedIn">
                    <router-link :to="{ name: 'Login' }">
                        <prime-button label="Login" rounded text size="small" />
                    </router-link>
                </div>
                <div v-if="props.userLoggedIn && props.currentUser">
                    <prime-button
                        label="Abmelden"
                        rounded
                        text
                        @click="emit('logout')"
                    />
                    <router-link
                        class="link"
                        :to="{
                            name: 'Profile',
                            params: { username: currentUser?.username },
                        }"
                    >
                        {{ currentUser?.username }}
                    </router-link>
                    <img
                        class="login__picture"
                        :src="'http://localhost:3000/' + currentUser?.image"
                        alt="Profile Picture"
                    />
                </div>
            </li>
        </ul>
    </nav>
</template>
