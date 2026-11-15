<script setup lang="ts">
interface NewButtonProps {
  label: string;
}
defineProps<NewButtonProps>();
</script>
<template>
  <button
    class="h-10 cursor-pointer transition-all hover:scale-105 flex w-fit stroke-on-foreground fill-foreground-muted text-on-foreground stroke-1"
  >
    <div class=" z-10 relative w-6 h-full">
      <svg class="w-full  absolute left-0 bottom-0 h-full">
        <path class="fill-transparent" d="M24 39 l-3 0L1 20 L21 1l3 0 "></path>
        <path d="M24 36.88 l-2 0L4.2 20 L22 3.12 l2 0"></path>
      </svg>
    </div>
     <div class="h-full flex justify-center relative ml-[-1px]">
      <svg class="w-full z-10 absolute bg-trasparent" height="3.68">
        <line x1="0" y1="1" x2="100%" y2="1"></line>
        <line x1="0" y1="3.12" x2="100%" y2="3.12"></line>
      </svg>
      <svg
        height="3.6"
        class="z-10 bg-transparent w-full absolute left-0 bottom-0"
      >
        <line x1="-1" y1="0.5" x2="100%" y2="0.5"></line>
        <line x1="0" y1="2.6" x2="100%" y2="2.6"></line>
      </svg>
      <span class="text-xl z-0 relative top-[3px] bg-foreground-muted h-[34px] flex px-10 items-center">
        {{ label }}
      </span>
    </div>
    <div class="ml-[-1px] z-10 relative w-7">
      <svg stroke-width="1" class="w-full absolute left-0 bottom-0 h-full">
        <path class="fill-transparent" d="M0 39 l3 0L23 20L3 1l-4 0" fill="none"></path>
        <path d="M0 36.88 l2 0L19.8 20L2 3.12 l-4 0"></path>
      </svg>
    </div>
    
  </button>
</template>

<style scoped>
button{
 filter: drop-shadow(0px 2px 1px #00000050);
}</style>
