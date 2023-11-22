<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  label: string;
  icon?: Component;
}>();
</script>

<template>
  <button
    class="flex h-12 items-center whitespace-nowrap rounded-2xl bg-indigo-600 px-5 text-sm tracking-wide text-white hover:bg-indigo-700 active:bg-indigo-800"
  >
    <component :is="icon" v-if="!!icon" class="-ml-1 mr-2 w-5" /> {{ label }}
  </button>
</template>
