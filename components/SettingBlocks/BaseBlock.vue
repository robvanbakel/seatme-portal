<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <div class="grid gap-x-6 gap-y-2 xl:grid-cols-[320px_auto]">
    <h4 class="col-span-full text-lg font-bold">{{ title }}</h4>
    <p class="text-sm text-slate-400">
      <slot name="description">{{ description }}</slot>
    </p>
    <div class="max-xl:mt-6">
      <slot></slot>
    </div>
  </div>
</template>
