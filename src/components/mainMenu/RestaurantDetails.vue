<script setup lang="ts">
const restaurantName = "Restaurant #1";
const restaurantEmail = "info@restaurant.com";
</script>

<template>
  <div>
    <h2 class="text-xl font-bold">{{ restaurantName }}</h2>
    <p class="text-sm text-slate-400">{{ restaurantEmail }}</p>
  </div>
</template>
