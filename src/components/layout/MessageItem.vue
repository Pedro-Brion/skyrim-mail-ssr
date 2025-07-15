<script setup lang="ts">
import { type Message } from "@/model/Message";

interface MessageItemProps {
  message: Message | null;
}

defineProps<MessageItemProps>();
</script>
<template>
  <div class="bg-background-muted text-on-foreground w-full p-3 rounded-md hover:shadow-2xl">
    <p class="font-bold text-lg capitalize">{{ message?.title }}</p>
    <p class="text-justify mt-2 leading-normal">{{ message?.body }}</p>
  </div>
</template>

<style scoped></style>
