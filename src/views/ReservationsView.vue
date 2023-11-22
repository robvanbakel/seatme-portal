<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import { PlusIcon } from "@heroicons/vue/20/solid";
import MainButton from "@/components/MainButton.vue";
</script>

<template>
  <main-layout title="Reservations">
    <template #headerActions>
      <MainButton label="New reservation" :icon="PlusIcon" />
    </template>
  </main-layout>
</template>
