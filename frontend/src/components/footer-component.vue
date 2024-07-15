<script setup lang="ts">
import LogoComponent from '@/components/logo-component.vue';
</script>

<template>
    <div class="mx-auto w-full p-4 md:px-8 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <logo-component />
            <ul
                class="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400"
            >
                <li>
                    <a href="#" class="me-4 hover:underline md:me-6">About</a>
                </li>
                <li>
                    <a href="#" class="me-4 hover:underline md:me-6"
                        >Privacy Policy</a
                    >
                </li>
                <li>
                    <a href="#" class="me-4 hover:underline md:me-6"
                        >Licensing</a
                    >
                </li>
                <li>
                    <a href="#" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr
            class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700"
        />
        <span
            class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
            >© 2024 <a href="#" class="hover:underline">Sharefolio™</a>. All
            Rights Reserved.</span
        >
    </div>
</template>
