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
    <nav
      class="flex min-h-screen shrink-0 flex-col bg-white px-4 pt-4 lg:w-72 lg:px-6 lg:pt-0"
    >
      <div class="hidden py-12 lg:block">
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
          class="max-lg:hidden"
          priority="tertiary"
          size="small"
          :icon="IconLogout"
          label="Log out"
          @click="client.auth.signOut()"
        />
        <MainButton
          class="lg:hidden"
          priority="tertiary"
          :icon="IconLogout"
          @click="client.auth.signOut()"
        />
      </div>
    </nav>

    <main class="grow px-4 pt-6 lg:px-6 lg:pt-12">
      <slot />
    </main>
  </div>
</template>
