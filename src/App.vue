<script setup lang="ts">
import MainNavigationVue from "@/components/mainMenu/MainNavigation.vue";
import RestaurantDetails from "@/components/mainMenu/RestaurantDetails.vue";
import { useAuthStore } from "@/stores/auth";
import { useReservationsStore } from "@/stores/reservations";
import AuthLayout from "@/layouts/AuthLayout.vue";
import supabase from "@/lib/supabase";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const reservationsStore = useReservationsStore();
const router = useRouter();

supabase.auth.onAuthStateChange(async (event, session) => {
  const authStore = useAuthStore();

  authStore.user = session?.user ?? null;

  if (event === "SIGNED_IN") {
    reservationsStore.init();
    return;
  }

  if (session) return;

  reservationsStore.exit();
  router.push({ name: "login" });
});
</script>

<template>
  <auth-layout v-if="!authStore.isLoggedIn">
    <RouterView />
  </auth-layout>

  <div v-else class="flex">
    <nav class="flex min-h-screen w-72 shrink-0 flex-col bg-white px-6">
      <RestaurantDetails class="py-12" />
      <MainNavigationVue />
    </nav>

    <main class="grow px-6 pt-12">
      <RouterView />
    </main>
  </div>
</template>
