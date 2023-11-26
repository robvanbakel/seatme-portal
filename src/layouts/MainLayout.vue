<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseSidepanel from "@/components/BaseSidepanel.vue";

const route = useRoute();
const router = useRouter();

defineProps<{
  title: string;
}>();

const open = computed({
  get: () => !!route.matched.at(-1)?.props.sidepanel,
  set: () => router.push({ path: route.matched.at(-2)?.path ?? "/" }),
});
</script>

<template>
  <div class="mb-6 flex h-12 items-center justify-between">
    <h1 class="text-4xl font-bold">{{ title }}</h1>
    <slot name="headerActions"></slot>
  </div>
  <div class="rounded-2xl bg-white p-8">
    <slot></slot>
  </div>

  <base-sidepanel v-model="open">
    <RouterView name="sidepanel" />
  </base-sidepanel>
</template>
