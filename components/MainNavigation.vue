<script setup lang="ts">
import {
  IconCalendarMonth,
  IconListDetails,
  IconSettings,
} from "@tabler/icons-vue";
import type { Component } from "vue";
import type { RouteLocationRaw } from "vue-router";

const menuItems: {
  label: string;
  icon: Component;
  route: RouteLocationRaw;
}[] = [
  {
    label: "Today",
    icon: IconCalendarMonth,
    route: "/today",
  },
  {
    label: "Reservations",
    icon: IconListDetails,
    route: "/reservations",
  },
  {
    label: "Settings",
    icon: IconSettings,
    route: "/settings",
  },
];
</script>

<template>
  <div class="space-y-2">
    <nuxt-link
      v-for="item in menuItems"
      :key="item.label"
      role="button"
      :to="item.route"
      class="flex items-center rounded-2xl p-5 active:bg-slate-100 hover:[&:not(.bg-slate-100)]:bg-slate-50 [&:not(.text-primary)]:text-slate-400"
      active-class="bg-slate-100 text-primary"
    >
      <component :is="item.icon" :size="24" :stroke-width="1.5" class="mr-4" />
      {{ item.label }}
    </nuxt-link>
  </div>
</template>
