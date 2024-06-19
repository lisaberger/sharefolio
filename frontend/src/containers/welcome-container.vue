<template>
    <section class="flex justify-center py-10 text-center">
        <div v-if="userLoggedIn">
            <h1 class="text-3xl">Willkommen, {{ user.username }}</h1>
            <p>Teile deine schönsten Projekte</p>
            <p>
                Oder lass dich von den kreativen Arbeiten anderer Designer
                inspirieren.
            </p>
        </div>

        <div else>
            <h1 class="text-4xl font-extrabold">Willkommen bei Sharefolio</h1>
            <p class="mb-4 text-lg">Teile deine schönsten Projekte</p>
            <p class="mb-2 text-sm">
                Melde dich an und teile dein Portfolio. Oder lass dich<br />
                von den kreativen Arbeiten anderer Designer inspirieren.
            </p>
            <router-link to="Login">
                <prime-button label="Anmelden" rounded class="mb-4" />
            </router-link>
            <router-link to="Register">
                <div class="text-sm">Noch kein Profil?</div>
            </router-link>
        </div>
    </section>
</template>

<script setup lang="ts">
defineProps({
    userLoggedIn: {
        type: Boolean,
        required: true,
    },
});
</script>
