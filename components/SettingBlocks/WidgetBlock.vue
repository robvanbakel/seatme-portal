<script setup lang="ts">
import { ref, computed } from "vue";

const client = useSupabaseClient();

const restaurantId = ref<string>();

const widgetLink = computed(() => {
  if (!restaurantId.value) return;

  const src = "https://reservation.getseatme.com/initializer.js";

  return `<script src="${src}" restaurant-id="${restaurantId.value}">${"<"}/script>`;
});

onMounted(async () => {
  const { data, error } = await client
    .from("restaurant")
    .select("id")
    .single<{ id: string }>();

  if (error) {
    throw createError({
      statusCode: 404,
      message: "Restaurant not not found",
    });
  }

  restaurantId.value = data.id;
});
</script>

<template>
  <setting-blocks-base-block title="Widget">
    <template #description>
      Copy the code and paste it at the end of the
      <span class="rounded bg-slate-100 p-1 font-mono text-xs"
        >&lt;body&gt;</span
      >
      tag on your website on your website.
    </template>

    <div
      class="break-all rounded-xl bg-slate-800 p-6 font-mono text-xs"
      :class="widgetLink ? 'text-emerald-400' : 'text-slate-400'"
    >
      {{ widgetLink ?? "// Loading widget link…" }}
    </div>
  </setting-blocks-base-block>
</template>
