<script setup lang="ts">
import { computed, type Component } from "vue";

const props = withDefaults(
  defineProps<{
    label: string;
    icon?: Component;
    priority?: "primary" | "secondary";
    variant?: "default" | "block";
  }>(),
  {
    priority: "primary",
    variant: "default",
  }
);

const priorityClasses = computed(() => {
  switch (props.priority) {
    case "primary":
      return "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800";
    case "secondary":
      return "bg-slate-200 text-slate-800 hover:bg-slate-300 active:bg-slate-400";
    default:
      throw new Error("Invalid priority provided");
  }
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case "default":
      return "rounded-2xl";
    case "block":
      return "rounded-md";
    default:
      throw new Error("Invalid variant provided");
  }
});
</script>

<template>
  <button
    class="flex h-12 items-center justify-center whitespace-nowrap px-5 text-sm tracking-wide"
    :class="[priorityClasses, variantClasses]"
  >
    <component :is="icon" v-if="!!icon" class="-ml-1 mr-2 w-5" /> {{ label }}
  </button>
</template>
