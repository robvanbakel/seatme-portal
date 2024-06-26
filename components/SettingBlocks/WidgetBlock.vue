<script setup lang="ts">
import { computed } from "vue";

const profileStore = useProfileStore();

const widgetLink = computed(() => {
  const restaurantId = profileStore.profile?.restaurant.id;

  if (!restaurantId) return;

  const src = "https://reservation.getseatme.com/initializer.js";

  return `<script src="${src}" restaurant-id="${restaurantId}">${"<"}/script>`;
});
</script>

<template>
  <setting-blocks-base-block title="Widget">
    <template #description>
      Copy the code and paste it at the end of the
      <span class="rounded bg-slate-100 p-1 font-mono text-xs"
        >&lt;body&gt;</span
      >
      tag on your website.
    </template>

    <div
      class="break-all rounded-xl bg-slate-800 p-6 font-mono text-xs"
      :class="widgetLink ? 'text-emerald-400' : 'text-slate-400'"
    >
      {{ widgetLink ?? "// Loading widget link…" }}
    </div>
  </setting-blocks-base-block>
</template>
