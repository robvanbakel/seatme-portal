<script setup lang="ts">
import { IconLogout } from "@tabler/icons-vue";

const client = useSupabaseClient();
const user = useSupabaseUser();

const { data } = await useAsyncData("profile", async () => {
  const { data } = await client
    .from("profile")
    .select("restaurant(name)")
    .single<{
      restaurant: { name: string };
    }>();

  return data;
});
</script>

<template>
  <div class="flex">
    <nav class="flex min-h-screen w-72 shrink-0 flex-col bg-white px-6">
      <div v-if="data" class="py-12">
        <h2 class="text-xl font-bold">{{ data.restaurant.name }}</h2>
        <p class="text-sm text-slate-400">{{ user?.email }}</p>
      </div>
      <MainNavigation />
      <div class="mt-auto py-2">
        <MainButton
          priority="tertiary"
          size="small"
          :icon="IconLogout"
          label="Log out"
          @click="logOut"
        />
      </div>
    </nav>

    <main class="grow px-6 pt-12">
      <slot />
    </main>
  </div>
</template>
