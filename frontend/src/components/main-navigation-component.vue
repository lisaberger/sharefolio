<script setup lang="ts">
import LogoComponent from '@/components/logo-component.vue';
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';

defineProps({
    userLoggedIn: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Object,
        required: false,
    },
});

const projects = ref([]);

onBeforeMount(() => {
    /* API Request */
    axios.get('http://localhost:4000/projects').then((response) => {
        projects.value = response.data;
    });
});

defineEmits(['logout']);
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
                <div v-if="!userLoggedIn">
                    <router-link :to="{ name: 'Login' }">
                        <prime-button label="Login" rounded text size="small" />
                    </router-link>
                </div>
                <div v-if="userLoggedIn && user">
                    <prime-button
                        label="Abmelden"
                        rounded
                        text
                        @click="$emit('logout')"
                    />
                    <router-link
                        class="link"
                        :to="{
                            name: 'Profile',
                            params: { username: user.username },
                        }"
                    >
                        {{ user.username }}
                    </router-link>
                    <img
                        class="login__picture"
                        :src="'http://localhost:3000/' + user.image"
                        alt="Profile Picture"
                    />
                </div>
            </li>
        </ul>
    </nav>
</template>
