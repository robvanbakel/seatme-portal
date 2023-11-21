<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="mb-6 flex h-12 items-center justify-between">
    <h1 class="text-4xl font-bold">{{ title }}</h1>
    <slot name="headerActions"></slot>
  </div>
  <div class="rounded-2xl bg-white p-8">
    <slot></slot>
  </div>
</template>
