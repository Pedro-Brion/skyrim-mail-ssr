<script setup lang="ts">
import { useMessagesStore } from "@/stores/messages";
import MessageItem from "~/layout/MessageItem.vue";
import SVGButton from "@/components/ui/button/SVGButton.vue";

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
  <div class="flex bg-background  place-items-center p-2 relative">
    <img class="w-10 mr-2 absolute right-0 top-1" src="/logo.webp" alt="" />

    <SVGButton label="New Message" />
  </div>
  <div class="flex flex-wrap flex-1 gap-1 w-full">
    <div
      class="shrink-0 w-48 h-full hover:w-48 transition-[width]"
    ></div>
    <div class="flex flex-1 gap-1 p-2">
      <div class="flex-6/24 rounded min-w-[260px] h-full bg-pink-500"></div>
      <div class="flex-12/24 rounded h-full bg-cyan-700"></div>
    </div>
  </div>
</template>

<style scoped></style>
