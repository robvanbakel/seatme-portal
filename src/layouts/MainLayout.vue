<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="mb-6">
    <h1 class="text-4xl font-bold">{{ title }}</h1>
  </div>
  <slot></slot>
</template>
