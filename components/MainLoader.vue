<script setup lang="ts">
import { IconLoader2 } from "@tabler/icons-vue";

defineProps<{
  selfCenter?: boolean;
  size?: number;
}>();
</script>

<template>
  <div :class="{ 'grid place-items-center': selfCenter }">
    <IconLoader2 :size="size || 36" :stroke-width="2" class="animate-spin" />
  </div>
</template>
