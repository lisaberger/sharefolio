<template>
    <section class="flex h-full flex-col items-center justify-center">
        <img
            src="@/assets/links/sadlogo.png"
            alt="Error Logo"
            class="mb-4 w-16"
        />
        <h1 class="text-3xl font-bold">Oops!</h1>
        <h2>We can't seem to find the page you're looking for.</h2>
        <p class="mb-2">Error Code: 404</p>

        <router-link :to="{ name: 'Home' }">
            <prime-button label="Zur Startseite" link size="small" />
        </router-link>
    </section>
</template>
