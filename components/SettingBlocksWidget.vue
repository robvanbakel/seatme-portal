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
  <div class="grid grid-cols-[320px_auto] gap-x-6 gap-y-2">
    <h4 class="col-span-full text-lg font-bold">Widget</h4>
    <p class="text-sm text-slate-400">
      Configure your widget, copy the code and paste it at the end of the
      <span class="rounded bg-slate-100 p-1 font-mono text-xs"
        >&lt;body&gt;</span
      >
      tag on your website on your website.
    </p>
    <div
      class="break-all rounded-xl bg-slate-800 p-6 font-mono text-xs"
      :class="widgetLink ? 'text-emerald-400' : 'text-slate-400'"
    >
      {{ widgetLink ?? "// Loading widget link…" }}
    </div>
  </div>
</template>
