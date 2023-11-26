<script setup lang="ts">
defineProps<{
  reservationId: string;
}>();
</script>

<template>
  <pre>{{ reservationId }}</pre>
</template>
