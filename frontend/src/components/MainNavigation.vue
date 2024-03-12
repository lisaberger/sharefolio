<template>
    <nav class="border-b-2 border-gray-100 bg-white px-4 py-2">
        <ul class="flex items-center justify-between">
            <li>
                <router-link to="/">
                    <the-logo />
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
                    <router-link to="/login">
                        <prime-button label="Login" rounded text />
                    </router-link>
                </div>
                <div v-if="userLoggedIn && user">
                    <prime-button label="Abmelden" @click="$emit('logout')" />
                    <router-link class="link" :to="'/profile/' + user.username">
                        {{ user.username }}
                    </router-link>
                    <img
                        class="login__picture"
                        :src="'http://localhost:3000/' + user.profilbild"
                        alt="Profile Picture"
                    />
                </div>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import TheLogo from '@/components/TheLogo.vue';
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
