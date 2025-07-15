<script setup lang="ts">
import { useMessagesStore } from "@/stores/messages";
import MainButton from "~/ui/button/MainButton.vue";
import MessageItem from "~/layout/MessageItem.vue";

const { messages } = storeToRefs(useMessagesStore());
const { fetchMessages } = useMessagesStore();

const loading = ref<boolean>(false);
async function refetch() {
  loading.value = true;
  try {
    await fetchMessages(10);
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col place-items-center mb-20">
    <img class="w-28" src="/logo.webp" alt="" />
    <h1 class="text-3xl">Skyrim Mail Index Page</h1>
    <MainButton @click="refetch"> Refetch </MainButton>
  </div>
  <h2 class="text-center" v-if="loading">Loading.....</h2>
  <div class="flex flex-col gap-2 w-[75vw] mx-auto mt-4">
    <MessageItem
      v-for="message of messages"
      :key="message.id"
      :message
    ></MessageItem>
  </div>
</template>

<style scoped></style>
