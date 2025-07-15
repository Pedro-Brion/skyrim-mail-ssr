<script setup lang="ts">
interface MainButtonProps {
  variant?: "primary" | "outlined" | "flat";
}

withDefaults(defineProps<MainButtonProps>(), {
  variant: "primary",
});

const variants: Record<NonNullable<MainButtonProps["variant"]>, string> = {
  primary: "bg-foreground text-on-foreground px-4 py-2 rounded-sm hover:bg-foreground-muted",
  flat: "",
  outlined: "",
};
</script>
<template>
  <button class="cursor-pointer transition delay-50 duration-300 ease-in-out" :class="variants[variant]">
    <slot />
  </button>
</template>

<style scoped></style>
