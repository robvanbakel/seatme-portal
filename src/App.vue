<script setup lang="ts">
import MainNavigationVue from "@/components/mainMenu/MainNavigation.vue";
import RestaurantDetails from "@/components/mainMenu/RestaurantDetails.vue";
</script>

<template>
  <div class="flex">
    <nav class="min-h-screen w-72 shrink-0 bg-white px-6">
      <RestaurantDetails class="py-12" />
      <MainNavigationVue />
    </nav>
    <main class="grow px-6 pt-12">
      <RouterView />
    </main>
  </div>
</template>
