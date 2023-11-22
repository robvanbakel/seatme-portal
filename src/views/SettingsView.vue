<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import { useAuthStore } from "@/stores/auth";
import MainButton from "@/components/MainButton.vue";
import { ArrowRightOnRectangleIcon } from "@heroicons/vue/24/outline";

const authStore = useAuthStore();
</script>

<template>
  <main-layout title="Settings">
    <MainButton
      :icon="ArrowRightOnRectangleIcon"
      label="Logout"
      @click="authStore.logout"
    />
  </main-layout>
</template>
