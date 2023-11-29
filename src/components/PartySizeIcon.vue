<script setup lang="ts">
import { computed } from "vue";
import { UserIcon, UsersIcon, UserGroupIcon } from "@heroicons/vue/20/solid";

const props = defineProps<{
  partySize: number;
}>();

const partySizeIconComponent = computed(() => {
  if (props.partySize === 1) return UserIcon;
  if (props.partySize === 2) return UsersIcon;
  return UserGroupIcon;
});
</script>

<template>
  <Component :is="partySizeIconComponent" />
</template>
