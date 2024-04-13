<script setup lang="ts">
import { IconPlus } from "@tabler/icons-vue";
import type { Reservation } from "~/types";

const reservationsStore = useReservationsStore();

const upcomingReservations = computed((): Reservation[] => {
  if (!reservationsStore.reservations) return [];

  return reservationsStore.reservations
    .filter(({ checked_in_at }) => !checked_in_at)
    .sort(
      (a, b) =>
        new Date(a.arrival_time).valueOf() - new Date(b.arrival_time).valueOf(),
    );
});

const checkedInReservations = computed((): Reservation[] => {
  if (!reservationsStore.reservations) return [];

  return reservationsStore.reservations
    .filter(({ checked_in_at }) => !!checked_in_at)
    .sort(
      (a, b) =>
        new Date(b.arrival_time).valueOf() - new Date(a.arrival_time).valueOf(),
    );
});
</script>

<template>
  <NuxtLayout name="main" title="Today">
    <template #headerActions>
      <MainButton label="New reservation" :icon="IconPlus" />
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

      <div v-if="checkedInReservations.length">
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
  </NuxtLayout>
</template>
