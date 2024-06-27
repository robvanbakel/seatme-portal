<script setup lang="ts">
import { IconLogout } from "@tabler/icons-vue";

const client = useSupabaseClient();
const profileStore = useProfileStore();

onMounted(async () => {
  await profileStore.fetchProfile();
});
</script>

<template>
  <div class="flex">
    <nav class="flex min-h-screen w-72 shrink-0 flex-col bg-white px-6">
      <div class="py-12">
        <h2 class="text-xl font-bold">
          {{ profileStore.profile?.restaurant.name ?? "Loading…" }}
        </h2>
        <p class="text-sm text-slate-400">
          {{ profileStore.profile?.email ?? "Loading…" }}
        </p>
      </div>
      <MainNavigation />
      <div class="mt-auto py-2">
        <MainButton
          priority="tertiary"
          size="small"
          :icon="IconLogout"
          label="Log out"
          @click="client.auth.signOut()"
        />
      </div>
    </nav>

    <main class="grow px-6 pt-12">
      <slot />
    </main>
  </div>
</template>
