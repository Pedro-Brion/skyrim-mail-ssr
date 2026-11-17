<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>
<template>
    <main class="dark bg-background h-screen flex-col w-screen flex justify-center items-center">
        <h1 class="text-2xl">404</h1>
        <p class="uppercase text-sm ">Not Found</p>
        <p class="text-xs text-foreground-muted">Not all those who wander are lost</p>
        <RouterLink class="mt-4" to="/">Get back</RouterLink>
    </main>
</template>


<style scoped></style>