<script setup lang="ts">
import {
  HomeIcon,
  CalendarIcon,
  Cog6ToothIcon,
} from "@heroicons/vue/24/outline";
import type { Component } from "vue";
import type { RouteLocationRaw } from "vue-router";

const menuItems: {
  label: string;
  icon: Component;
  route: RouteLocationRaw;
}[] = [
  {
    label: "Dashboard",
    icon: HomeIcon,
    route: { name: "dashboard" },
  },
  {
    label: "Reservations",
    icon: CalendarIcon,
    route: { name: "reservations" },
  },
  {
    label: "Settings",
    icon: Cog6ToothIcon,
    route: { name: "settings" },
  },
];
</script>

<template>
  <div class="space-y-2">
    <router-link
      v-for="item in menuItems"
      :key="item.label"
      :to="item.route"
      role="button"
      class="flex items-center rounded-2xl p-5 active:bg-slate-100 hover:[&:not(.bg-slate-100)]:bg-slate-50 [&:not(.text-indigo-600)]:text-slate-400"
      active-class="bg-slate-100 text-indigo-600"
    >
      <component :is="item.icon" class="mr-5 w-6" />
      {{ item.label }}
    </router-link>
  </div>
</template>
