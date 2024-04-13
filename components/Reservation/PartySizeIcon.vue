<script setup lang="ts">
import { computed } from "vue";
import { IconUserFilled } from "@tabler/icons-vue";

const props = defineProps<{
  partySize: number;
}>();

const partySizeIconComponent = computed(() => {
  if (props.partySize === 1) return IconUserFilled;
  if (props.partySize === 2) return IconUserFilled;
  return IconUserFilled;
});
</script>

<template>
  <Component :is="partySizeIconComponent" />
</template>
