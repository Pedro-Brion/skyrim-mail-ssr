<script setup lang="ts">
import HelloWorld from "~/HelloWorld.vue";
</script>

<template>
  <main class="bg-background text-foreground min-h-[100dvh] overflow-x-hidden w-[100vw] max-w-[100vw] px-2">
    <HelloWorld />
  </main>
</template>

<style scoped>
.binito {
  transition: filter 400ms ease-in;
  &:hover {
    filter: drop-shadow(0em 0em 5em var(--color-lime-500));
  }
}
</style>
