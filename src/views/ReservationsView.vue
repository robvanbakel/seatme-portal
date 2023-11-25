<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import { PlusIcon } from "@heroicons/vue/20/solid";
import MainButton from "@/components/MainButton.vue";
import type { ReservationIndex } from "@/types/reservations";
import { fetchReservations } from "@/api/reservations";
import ReservationIndexBlock from "@/components/reservations/ReservationIndexBlock.vue";

const reservations = ref<ReservationIndex[]>([]);

const upcomingReservations = computed(() => {
  return reservations.value
    .filter(({ checked_in_at }) => !checked_in_at)
    .reverse();
});

const checkedInReservations = computed(() => {
  return reservations.value.filter(({ checked_in_at }) => !!checked_in_at);
});

onMounted(async () => {
  const data = await fetchReservations();
  reservations.value = data;
});
</script>

<template>
  <main-layout title="Reservations">
    <template #headerActions>
      <MainButton label="New reservation" :icon="PlusIcon" />
    </template>

    <div class="space-y-9">
      <div>
        <div class="mb-4 flex items-baseline">
          <h3 class="text-2xl font-semibold text-slate-400">Upcoming</h3>
          <span class="ml-2 text-sm text-slate-400">
            {{ upcomingReservations.length }} reservations
          </span>
        </div>
        <div class="grid grid-cols-auto-fill-80 gap-6">
          <ReservationIndexBlock
            v-for="reservation in upcomingReservations"
            :key="reservation.id"
            v-bind="{ reservation }"
          />
        </div>
      </div>
      <div>
        <div class="mb-4 flex items-baseline">
          <h3 class="text-2xl font-semibold text-slate-400">Checked in</h3>
          <span class="ml-2 text-sm text-slate-400">
            {{ checkedInReservations.length }} reservations
          </span>
        </div>
        <div class="grid grid-cols-auto-fill-80 gap-6">
          <ReservationIndexBlock
            v-for="reservation in checkedInReservations"
            :key="reservation.id"
            v-bind="{ reservation }"
          />
        </div>
      </div>
    </div>
  </main-layout>
</template>
