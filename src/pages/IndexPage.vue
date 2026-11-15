<script setup lang="ts">
import { useMessagesStore } from "@/stores/messages";
import MessageItem from "~/layout/MessageItem.vue";
import NewButton from "@/components/ui/button/NewButton.vue";

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

const isResizing = ref<boolean>(false);
const size = ref<number>(210);
const resizableColumn = ref<HTMLElement | null>(null);
function onResizeStart(e: MouseEvent) {
  isResizing.value = true;
  e.preventDefault();
  document.addEventListener("mousemove", onResize);
  document.addEventListener("mouseup", onResizeStop);
}
function onResize(e: MouseEvent) {
  e.preventDefault();
  if (!isResizing.value || !resizableColumn.value) return;
  size.value =
    e.clientX - resizableColumn.value.getBoundingClientRect().left - 4;
}
function onResizeStop() {
  isResizing.value = false;
  document.removeEventListener("mousemove", onResize);
  document.removeEventListener("mouseup", onResizeStop);
}

onMounted(() => {});
</script>

<template>
  <div
    class="navbar flex items-center bg-red-400 align-center justify-between p-2"
  >
    <NewButton label="New Message" @click="refetch"/>
    <img class="w-8 mr-2" src="/logo.webp" alt="" />
  </div>
  <div class="content flex bg-emerald-100 flex-1 gap-1 pt-1 overflow-hidden">
    <div
      class="shrink-0 bg-foreground w-20 hover:w-48 transition-[width]"
    ></div>
    <div class="flex flex-1">
      <div
        class="flex flex-col rounded h-full min-w-[250px]"
        :style="{ width: `${size}px` }"
        ref="resizableColumn"
      >
        <div class="bg-indigo-300 w-full h-20">Caixa de entrada </div>
        <div class="overflow-y-scroll flex flex-col gap-1 pb-8">
          <MessageItem v-for="message of messages" :key="message.id" :message />
        </div>
      </div>
      <div
        class="h-full w-1 flex place-items-center text-foreground hover:bg-gradient-to-b from-transparent via-black/30 to-transparent cursor-col-resize"
        ref="resize"
        @mousedown="onResizeStart"
      />
      <div class="flex-1 rounded h-full bg-foreground-muted"></div>
    </div>
  </div>
</template>

<style scoped></style>
